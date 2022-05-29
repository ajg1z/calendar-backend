import {
  SharedEvent,
  SharedEventDocument,
} from './../model/shared-event.model';
import { InjectModel } from '@nestjs/mongoose';
import {
  ICreateSharedEvent,
  IFindOneSharedEvent,
} from './shared-event.interface';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { SharedEventEntity } from '../entity/shared-event';

@Injectable()
export class SharedEventRepository {
  constructor(
    @InjectModel(SharedEvent.name)
    private sharedEventModel: Model<SharedEventDocument>,
  ) {}

  async create(dto: ICreateSharedEvent): Promise<SharedEventEntity> {
    return await this.sharedEventModel.create({
      recipient: dto.recipient,
      events: dto.events,
      sender: dto.sender,
    });
  }

  async add(id: ObjectId, events: ObjectId[]) {
    const result: SharedEventEntity[] = [];
    for await (const event of events) {
      const shared = await this.sharedEventModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { events: event },
        },
        { new: true },
      );

      result.push(shared);
    }
    return result;
  }
  async remove(id: ObjectId, events: ObjectId[]) {
    return await this.sharedEventModel.findByIdAndUpdate(
      id,
      {
        $pullAll: { events: events },
      },
      { new: true },
    );
  }

  async delete(id: ObjectId): Promise<SharedEventEntity> {
    return await this.sharedEventModel.findByIdAndRemove(id);
  }

  async getOne(id: ObjectId): Promise<SharedEventEntity> {
    return await this.sharedEventModel.findById(id);
  }

  async findOne(dto: IFindOneSharedEvent): Promise<SharedEventEntity> {
    return await this.sharedEventModel.findOne(dto);
  }

  async findMany(dto: IFindOneSharedEvent): Promise<SharedEventEntity[]> {
    return await this.sharedEventModel.find(dto);
  }
}
