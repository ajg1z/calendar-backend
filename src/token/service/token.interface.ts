import { ObjectId } from 'mongoose';

export interface ICreateToken {
  email: string;
  id: ObjectId;
  isActivated: boolean;
  setting: ObjectId;
}

export interface CreateTokenSignature {
  accessToken: string;
  refreshToken: string;
}

export interface IToken {
  refreshToken?: string;
  user?: ObjectId;
}
