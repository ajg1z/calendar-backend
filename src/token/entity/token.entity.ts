import { ObjectId } from 'mongoose';

export interface TokenEntity {
  refreshToken: string;
  user: ObjectId;
  _id: ObjectId;
}
