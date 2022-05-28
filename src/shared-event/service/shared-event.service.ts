import { typeUpdate } from './shared-event.interface';
import { SharedEventRepository } from './../repository/shared-event.repository';
import { Injectable } from '@nestjs/common';
import { ICreateSharedEvent } from '../repository/shared-event.interface';
import { ObjectId } from 'mongoose';

@Injectable()
export class SharedEventService {
  constructor(private readonly sharedEventRepository: SharedEventRepository) {}
  async create(dto: ICreateSharedEvent) {
    return await this.sharedEventRepository.create(dto);
  }
  async delete(id: ObjectId) {
    return await this.sharedEventRepository.delete(id);
  }
  async update(id: ObjectId, event: ObjectId, type: typeUpdate) {
    if (type === 'add') return await this.sharedEventRepository.add(id, event);
    return await this.sharedEventRepository.remove(id, event);
  }
}
