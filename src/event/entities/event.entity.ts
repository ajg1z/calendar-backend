import { ObjectId } from 'mongoose';
import { typeEvent } from '../model/event.interface';

export interface EventEntity {
  time: string;
  title: string;
  day: number;
  month: number;
  year: number;
  description: string;
  typeEvent: typeEvent;
  _id: ObjectId;
}
