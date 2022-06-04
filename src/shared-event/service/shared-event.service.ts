import {
  ICreateSharedEvent,
  IGetReceiveSharedEvents,
  IGetSentSharedEvents,
  IRemoveEvent,
  typeUpdate,
} from './shared-event.interface';
import { SharedEventRepository } from './../repository/shared-event.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { SharedEventEntity } from '../entity/shared-event';
import { EventService } from 'src/event/service/event.service';

@Injectable()
export class SharedEventService {
  constructor(
    private readonly sharedEventRepository: SharedEventRepository,
    private readonly eventService: EventService,
  ) {}

  async create(
    dto: ICreateSharedEvent,
    email: string,
  ): Promise<SharedEventEntity | SharedEventEntity[]> {
    const isExist = await this.sharedEventRepository.findOne({
      sender: email,
      recipient: dto.email,
    });
    if (isExist) {
      return await this.sharedEventRepository.add(isExist._id, dto.events);
    }
    return await this.sharedEventRepository.create({
      events: dto.events,
      recipient: dto.email,
      sender: email,
    });
  }

  async delete(id: ObjectId) {
    return await this.sharedEventRepository.delete(id);
  }

  async getReceiveEvent(email: string): Promise<IGetReceiveSharedEvents[]> {
    const sharedEvents = await this.sharedEventRepository.findMany({
      recipient: email,
    });
    console.log(sharedEvents);
    const result: IGetReceiveSharedEvents[] = [];

    for await (const e of sharedEvents) {
      const events = await this.eventService.getMany(e.events);
      result.push({
        sender: e.sender,
        events,
      });
    }
    return result;
  }

  async removeEvent(dto: IRemoveEvent) {
    const sharedEvent = await this.sharedEventRepository.findOne({
      sender: dto.sender,
      recipient: dto.recipient,
    });
    if (sharedEvent.events.length === 1) {
      return await this.delete(sharedEvent._id);
    }
    return await this.sharedEventRepository.remove(sharedEvent._id, dto.event);
  }

  async getSentEvent(email: string) {
    console.log(email);
    const sharedEvents = await this.sharedEventRepository.findMany({
      sender: email,
    });
    const result: IGetSentSharedEvents[] = [];
    for await (const e of sharedEvents) {
      const events = await this.eventService.getMany(e.events);
      result.push({ receiver: e.recipient, events });
    }
    return result;
  }
}
