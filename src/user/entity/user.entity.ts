import { ObjectId } from 'mongoose';
import { Event } from 'src/event/model/event.model';

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
