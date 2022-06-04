import { SettingService } from './../../setting/service/setting.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { UserService } from 'src/user/service/user.service';
import { EventEntity } from '../entities/event.entity';
import { ICreateEvent, IUpdateEvent } from '../repository/event.interface';
import { EventRepository } from '../repository/event.repository';
import { сoncatTimeToNumber } from 'src/utils/time';
import { MailService } from '../../user/service/mail.service';
import { TaskService } from 'src/task/service/task.service';
import { SettingEntity } from 'src/setting/entity/setting.entity';
@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly userService: UserService,
    private readonly settingService: SettingService,
    private readonly mailService: MailService,
    private readonly taskService: TaskService,
  ) {}

  async update(id: ObjectId, dto: IUpdateEvent, settingId: ObjectId) {
    const updatedEvent = await this.eventRepository.update(id, dto);
    if (dto.day || dto.month || dto.year || dto.time) {
      const setting = await this.settingService.getOne(settingId);
      const difference = this.calcDiffer(updatedEvent, setting);
      if (difference < 0) return;
      this.taskService.update(
        `${updatedEvent._id}-${updatedEvent.year}-${updatedEvent.month}-${updatedEvent.day}`,
        difference,
        async () => {
          const user = await this.userService.getOne(setting.user);
          const event = await this.eventRepository.getOne(id);
          await this.mailService.sendNotifyAboutEvent(user.email, event);
        },
      );
    }
  }

  calcDiffer(dto: EventEntity, setting: SettingEntity) {
    return (
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes(),
        new Date().getUTCSeconds(),
      ).getTime() -
      new Date(
        dto.year,
        new Date().getMonth(),
        dto.day + setting.timezone,
        (сoncatTimeToNumber(dto.time, [0, 1], true) as number) - 1,
        сoncatTimeToNumber(dto.time, [3, 4], true) as number,
        new Date().getUTCSeconds(),
      ).getTime()
    );
  }

  async create(userId: ObjectId, dto: ICreateEvent) {
    const newEvent = await this.eventRepository.create(dto);
    await this.notify(userId, newEvent);
    await this.userService.addEvent(userId, newEvent._id);
    return newEvent;
  }

  async notify(userId: ObjectId, dto: EventEntity) {
    const setting = await this.settingService.findByUser(userId);
    const difference = this.calcDiffer(dto, setting);
    if (difference < 0) return;
    this.taskService.create(
      `${dto._id}-${dto.year}-${dto.month}-${dto.day}`,
      difference,
      async () => {
        const user = await this.userService.getOne(userId);
        const event = await this.eventRepository.getOne(dto._id);
        await this.mailService.sendNotifyAboutEvent(user.email, event);
      },
    );
  }

  async getEvents(id: ObjectId) {
    const user = await this.userService.getOne(id);
    if (!user) throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    const events = await this.eventRepository.getMany(user.events);
    return events;
  }

  async getMany(ids: ObjectId[]) {
    return await this.eventRepository.getMany(ids);
  }

  async deleteEvent(id: ObjectId | ObjectId[]): Promise<EventEntity[]> {
    if (Array.isArray(id)) {
      const removedEvents = await this.eventRepository.deleteMany(id);
      this.taskService.deleteMany(
        removedEvents.map(
          (event) => `${event._id}-${event.year}-${event.month}-${event.day}`,
        ),
      );
      return removedEvents;
    }
    const removed = await this.eventRepository.deleteOne(id);
    return [removed];
  }
}
