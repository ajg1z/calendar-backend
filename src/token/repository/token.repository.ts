import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TokenEntity } from '../entity/token.entity';
import { Token, TokenDocument } from '../model/token.model';
import { IToken } from '../service/token.interface';
import { ICreateToken } from './token.interface';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) {}

  async create(dto: ICreateToken): Promise<TokenEntity> {
    return await this.tokenModel.create(dto);
  }

  async getOne(id: ObjectId): Promise<TokenEntity> {
    return await this.tokenModel.findById(id);
  }

  async findOne(dto: IToken): Promise<TokenEntity > {
    return await this.tokenModel.findOne(dto);
  }

  async update(id: ObjectId, refreshToken: string): Promise<TokenEntity> {
    return await this.tokenModel.findByIdAndUpdate(
      id,
      { refreshToken },
      { new: true },
    );
  }

  async deleteOne(token: string): Promise<TokenEntity> {
    return await this.tokenModel.findOneAndRemove({ refreshToken: token });
  }
}
