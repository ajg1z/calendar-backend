import { CreateSharedEventDto } from './../dto/shared-event.dto';
import { SharedEventService } from './../service/shared-event.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('shared-event')
export class SharedEventController {
  constructor(private readonly sharedEventService: SharedEventService) {}
  @Post()
  async create(@Body() dto: CreateSharedEventDto) {
    return await this.sharedEventService.create(dto);
  }

  @Put()
  async update() {
      
  }
}
