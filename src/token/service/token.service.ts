import { TokenRepository } from './../repository/token.repository';
import { Token, TokenDocument } from './../model/token.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ICreateToken, CreateTokenSignature, IToken } from './token.interface';
import { IUser } from 'src/user/service/user.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  createTokens(dto: ICreateToken): CreateTokenSignature {
    const accessToken = this.jwtService.sign(dto, {
      secret: 'example №1',
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(dto, {
      secret: 'example №2',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async findOne(dto: IToken) {
    return await this.tokenRepository.findOne(dto);
  }

  validateAccessToken(token: string): IUser | null {
    try {
      const validateResult = this.jwtService.verify(token, {
        secret: 'example №1',
      });
      return validateResult;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): IUser | null {
    try {
      const validateResult = this.jwtService.verify(token, {
        secret: 'example №2',
      });
      return validateResult;
    } catch (e) {
      return null;
    }
  }

  async deleteToken(refreshToken: string) {
    return await this.tokenRepository.deleteOne(refreshToken);
  }

  async saveToken(user: ObjectId, refreshToken: string) {
    const token = await this.tokenRepository.getOne(user);
    if (token) {
      await this.tokenRepository.update(token._id, refreshToken);
    } else {
      return await this.tokenRepository.create({ user, refreshToken });
    }
  }
}
