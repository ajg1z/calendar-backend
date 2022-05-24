import { ObjectId } from 'mongoose';

export interface UserEntity {
  name: string;
  email: string;
  password: string;
  avatar: string;
  events: ObjectId[];
  settingId: ObjectId;
  activationLink: string;
  isActivated: boolean;
  _id: ObjectId;
}
