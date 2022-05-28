import { ObjectId } from 'mongoose';
export interface ICreateSharedEvent {
  sender: ObjectId;
  recipient: ObjectId;
  events: ObjectId[];
}

export interface IAddSharedEvent {
  event: ObjectId;
}
