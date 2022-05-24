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

export class UserRepository implements UserRepositorySignature {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async update(id: ObjectId, dto: IUpdateUser) {
    const updatedItem = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updatedItem || undefined;
  }

  async findOne(dto: IFindUser) {
    const item = await this.userModel.findOne(dto);
    return item || undefined;
  }

  async deleteOne(id: ObjectId) {
    const deletedItem = await this.userModel.findByIdAndRemove(id);
    return deletedItem || undefined;
  }

  async deleteMany(ids: ObjectId[]) {
    return await this.userModel.deleteMany({ _id: { $in: ids } });
  }

  async getOne(id: ObjectId) {
    const gettedItem = await this.userModel.findById(id);
    return gettedItem || undefined;
  }

  async getMany(ids: ObjectId[]) {
    return await this.userModel.find({
      _id: { $in: ids },
    });
  }
  async create(dto: ICreateUser) {
    return await this.userModel.create(dto);
  }
}
