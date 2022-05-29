import { ObjectId } from 'mongoose';

export interface ICreateSharedEvent {
  sender: string;
  recipient: string;
  events: ObjectId[];
}

export interface IAddSharedEvent {
  event: ObjectId;
}

export interface IFindOneSharedEvent {
  sender?: string;
  recipient?: string;
  events?: ObjectId[] | ObjectId;
}
