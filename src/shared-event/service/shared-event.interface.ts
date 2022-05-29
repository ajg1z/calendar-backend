import { ObjectId } from 'mongoose';
import { EventEntity } from 'src/event/entities/event.entity';
export type typeUpdate = 'add' | 'remove';

export interface ICreateSharedEvent {
  email: string;
  events: ObjectId[];
}

export interface IGetSentSharedEvents {
  receiver: string;
  events: EventEntity[];
}

export interface IGetReceiveSharedEvents {
  sender: string;
  events: EventEntity[];
}
