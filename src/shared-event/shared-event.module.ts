import { SharedEventRepository } from './repository/shared-event.repository';
import { SharedEventController } from './controller/shared-event.controller';
import { SharedEvent, SharedEventModel } from './model/shared-event.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SharedEventController],
  providers: [SharedEventRepository],
  imports: [
    MongooseModule.forFeature([
      { name: SharedEvent.name, schema: SharedEventModel },
    ]),
  ],
})
export class SharedEventsModule {}
