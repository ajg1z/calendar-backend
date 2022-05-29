import { ObjectId } from 'mongoose';
export interface SharedEventEntity {
  _id: ObjectId;
  sender: string;
  recipient: string;
  events: ObjectId[];
}
