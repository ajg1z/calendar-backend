import { ObjectId } from 'mongoose';
import { EventEntity } from '../entities/event.entity';
import { typeEvent } from '../model/event.interface';

export interface EventRepositorySignature {
  create(dto: ICreateEvent): Promise<EventEntity>;
  update(id: ObjectId, dto: IUpdateEvent): Promise<EventEntity | undefined>;
  getOne(id: ObjectId): Promise<EventEntity | undefined>;
  getMany(ids: ObjectId[]): Promise<EventEntity[]>;
  deleteMany(ids: ObjectId[]): Promise<void>;
  deleteOne(ids: ObjectId): Promise<EventEntity | undefined>;
}

export interface ICreateEvent {
  time: string;
  day: number;
  month: number;
  year: number;
  description: string;
  typeEvent: typeEvent;
}

export interface IUpdateEvent {
  time?: string;
  day?: number;
  month?: number;
  year?: number;
  description?: string;
  typeEvent?: typeEvent;
}
