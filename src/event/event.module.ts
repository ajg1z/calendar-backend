import { EventService } from './service/event.service';
import { Module } from '@nestjs/common';
import { EventController } from './controller/event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventModel } from './model/event.model';
import { EventRepository } from './repository/event.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventModel }]),
    UserModule,
  ],
  exports: [MongooseModule, EventService],
})
export class EventModule {}
