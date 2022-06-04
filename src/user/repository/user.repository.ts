import { HttpException } from '@nestjs/common';
import { User, UserDocument } from './../model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  ICreateUser,
  IFindUser,
  IUpdateUser,
  UserRepositorySignature,
} from './user.interface';
import { UserEntity } from '../entity/user.entity';

export class UserRepository implements UserRepositorySignature {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async update(
    id: ObjectId,
    dto: IUpdateUser,
  ): Promise<UserEntity | undefined> {
    const updatedItem = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updatedItem || undefined;
  }

  async findOne(dto: IFindUser): Promise<UserEntity | undefined> {
    const item = await this.userModel.findOne(dto);
    return item || undefined;
  }

  async deleteOne(id: ObjectId): Promise<UserEntity | undefined> {
    const deletedItem = await this.userModel.findByIdAndRemove(id);
    return deletedItem || undefined;
  }

  async deleteMany(ids: ObjectId[]): Promise<UserEntity[]> {
    return await this.userModel.remove({
      _id: { $pullAll: ids },
    });
  }

  async getOne(id: ObjectId): Promise<UserEntity> {
    const gettedItem = await this.userModel.findById(id);
    return gettedItem || undefined;
  }

  async getMany(ids: ObjectId[]): Promise<UserEntity[]> {
    return await this.userModel.find({
      _id: { $in: ids },
    });
  }
  async create(dto: ICreateUser): Promise<UserEntity> {
    return await this.userModel.create(dto);
  }

  async addEvent(id: ObjectId, eventId: ObjectId): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { $push: { events: eventId } });
  }
}
