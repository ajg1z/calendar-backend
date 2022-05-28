import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { UserService } from 'src/user/service/user.service';
import { EventEntity } from '../entities/event.entity';
import { ICreateEvent, IUpdateEvent } from '../repository/event.interface';
import { EventRepository } from '../repository/event.repository';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly userService: UserService,
  ) {}

  async update(id: ObjectId, dto: IUpdateEvent) {
    return await this.eventRepository.update(id, dto);
  }

  async create(userId: ObjectId, dto: ICreateEvent) {
    const newEvent = await this.eventRepository.create(dto);
    await this.userService.addEvent(userId, newEvent._id);
    return newEvent;
  }

  async getEvents(id: ObjectId) {
    const user = await this.userService.getOne(id);
    if (!user) throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    const events = await this.eventRepository.getMany(user.events);
    return events;
  }

  async deleteEvent(id: ObjectId | ObjectId[]): Promise<EventEntity[]> {
    if (Array.isArray(id)) {
      return await this.eventRepository.deleteMany(id);
    }
    const removed = await this.eventRepository.deleteOne(id);
    return [removed];
  }
}
