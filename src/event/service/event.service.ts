import { Injectable } from '@nestjs/common';
import { ICreateEvent } from '../repository/event.interface';
import { EventRepository } from '../repository/event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(dto: ICreateEvent) {
    return await this.eventRepository.create(dto);
  }
}
