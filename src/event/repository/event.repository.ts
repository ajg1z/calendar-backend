import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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

  async create(dto: ICreateEvent) {
    return await this.eventModel.create(dto);
  }

  async update(id: ObjectId, dto: IUpdateEvent) {
    return await this.eventModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteOne(id: ObjectId) {
    return await this.eventModel.findByIdAndRemove(id);
  }

  async deleteMany(ids: ObjectId[]) {
    await this.eventModel.deleteMany({ _id: { $in: ids } });
  }

  async getOne(id: ObjectId) {
    return await this.eventModel.findById(id);
  }

  async getMany(ids: ObjectId[]) {
    return await this.eventModel.find({
      _id: { $in: ids },
    });
  }
}
