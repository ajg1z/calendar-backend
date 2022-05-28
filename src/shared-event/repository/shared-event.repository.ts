import {
  SharedEvent,
  SharedEventDocument,
} from './../model/shared-event.model';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateSharedEvent, IAddSharedEvent } from './shared-event.interface';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
@Injectable()
export class SharedEventRepository {
  constructor(
    @InjectModel(SharedEvent.name)
    private sharedEventModel: Model<SharedEventDocument>,
  ) {}
  async create(dto: ICreateSharedEvent) {
    return await this.sharedEventModel.create(dto);
  }

  async add(id: ObjectId, event: ObjectId) {
    return await this.sharedEventModel.findByIdAndUpdate(id, {
      $push: { events: event },
    });
  }
  async remove(id: ObjectId, event: ObjectId) {
    return await this.sharedEventModel.findByIdAndUpdate(id, {
      $pull: { events: event },
    });
  }
  async delete(id: ObjectId) {
    return await this.sharedEventModel.findByIdAndRemove(id);
  }
}
