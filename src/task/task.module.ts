import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './service/task.service';

@Module({
  controllers: [],
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
