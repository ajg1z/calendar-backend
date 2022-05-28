import { ObjectId } from 'mongoose';

export interface ICreateToken {
  user: ObjectId;
  refreshToken: string;
}
