import { ObjectId } from 'mongoose';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegistrationUser {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface IRegistrationSignature {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  email: string;
  id: ObjectId;
  isActivated: boolean;
}
