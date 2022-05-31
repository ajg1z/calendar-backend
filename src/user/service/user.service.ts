import { SettingService } from './../../setting/service/setting.service';
import { Connection, ObjectId } from 'mongoose';
import {
  Injectable,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { TokenService } from '../../token/service/token.service';
import {
  ILoginUser,
  IRegistrationSignature,
  IRegistrationUser,
} from './user.interface';
import { UserRepository } from '../repository/user.repository';
import { MailService } from './mail.service';
import { IUpdateUser } from '../repository/user.interface';
import { UserEntity } from '../entity/user.entity';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
    private tokenService: TokenService,
    private settingService: SettingService,
  ) {}

  async registration(dto: IRegistrationUser): Promise<IRegistrationSignature> {
    const candidate = await this.userRepository.findOne({ email: dto.email });
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    const activationLink = uuid.v4();
    const user = await this.userRepository.create({
      ...dto,
      password: hash,
      activationLink,
    });
    console.log(dto);
    const setting = await this.settingService.create({
      timezone: dto.timezone - new Date().getUTCHours(),
      user: user._id,
    });
    // await this.mailService.sendActivationMail(   //проблемы с emailom
    //   user.email,
    //   `http://localhost:3001/user/activate/${activationLink}`,
    // );
    const tokens = this.tokenService.createTokens({
      email: user.email,
      id: user._id,
      isActivated: user.isActivated,
    });
    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return await this.generateToken(user);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken)
      throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const token = await this.tokenService.findOne({ refreshToken });
    if (!userData || !token) {
      throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userRepository.getOne(userData.id);
    return await this.generateToken(user);
  }

  async activateAccount(link: string) {
    const user = await this.userRepository.findOne({ activationLink: link });

    if (!user) throw new HttpException('not found user', HttpStatus.NOT_FOUND);
    await this.userRepository.update(user._id, {
      isActivated: true,
    });
  }

  async generateToken(user: UserEntity): Promise<IRegistrationSignature> {
    const tokens = this.tokenService.createTokens({
      email: user.email,
      id: user._id,
      isActivated: user.isActivated,
    });

    await this.tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        email: user.email,
        id: user._id,
        isActivated: user.isActivated,
      },
    };
  }

  async login(dto: ILoginUser) {
    const user = await this.userRepository.findOne({ email: dto.email });
    if (!user)
      throw new HttpException(
        'user with email not found',
        HttpStatus.BAD_REQUEST,
      );
    const isPassEqual = await bcrypt.compare(dto.password, user.password);
    if (!isPassEqual)
      throw new HttpException('password is wrong', HttpStatus.BAD_REQUEST);
    return await this.generateToken(user);
  }

  async logout(refreshToken: string) {
    return await this.tokenService.deleteToken(refreshToken);
  }

  async addEvent(id: ObjectId, eventId: ObjectId) {
    await this.userRepository.addEvent(id, eventId);
  }

  async getOne(id: ObjectId) {
    return this.userRepository.getOne(id);
  }

  async getMany(ids: ObjectId[]) {
    return await this.userRepository.getMany(ids);
  }

  async update(id: ObjectId, dto: IUpdateUser) {
    return await this.userRepository.update(id, dto);
  }

  async deleteMany(ids: ObjectId[]) {
    return await this.userRepository.deleteMany(ids);
  }

  async deleteOne(id: ObjectId) {
    return await this.userRepository.deleteOne(id);
  }
}
