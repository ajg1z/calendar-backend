import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EventEntity } from '../entities/event.entity';
import { EventDocument } from '../model/event.model';
import {
  ICreateEvent,
  IUpdateEvent,
  EventRepositorySignature,
} from './event.interface';

@Injectable()
export class EventRepository implements EventRepositorySignature {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(dto: ICreateEvent): Promise<EventEntity> {
    return await this.eventModel.create(dto);
  }

  async update(id: ObjectId, dto: IUpdateEvent): Promise<EventEntity> {
    return await this.eventModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteOne(id: ObjectId): Promise<EventEntity> {
    return await this.eventModel.findByIdAndRemove(id);
  }

  async deleteMany(ids: ObjectId[]): Promise<EventEntity[]> {
    return await this.eventModel.remove({ _id: { $pullAll: ids } });
  }

  async getOne(id: ObjectId): Promise<EventEntity> {
    return await this.eventModel.findById(id);
  }

  async getMany(ids: ObjectId[]): Promise<EventEntity[]> {
    return await this.eventModel.find({
      _id: { $in: ids },
    });
  }
}
