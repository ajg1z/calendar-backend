import { ObjectId } from 'mongoose';
import { UserEntity } from '../entity/user.entity';

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  activationLink: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  events?: ObjectId[];
  activationLink?: string;
  isActivated?: boolean;
}

export type IFindUser = IUpdateUser;

export interface UserRepositorySignature {
  create(dto: ICreateUser): Promise<UserEntity>;
  update(id: ObjectId, dto: IUpdateUser): Promise<UserEntity | undefined>;
  getOne(id: ObjectId): Promise<UserEntity | undefined>;
  getMany(ids: ObjectId[]): Promise<UserEntity[]>;
  deleteOne(id: ObjectId): Promise<UserEntity | undefined>;
  deleteMany(ids: ObjectId[]): Promise<any>;
}
