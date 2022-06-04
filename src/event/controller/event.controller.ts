import { DeleteEventDto, UpdateEventDto } from './../dto/event.dto';
import { AuthGuard } from './../../user/guard/auth.guard';
import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  UseFilters,
  UsePipes,
  UseGuards,
  Req,
  Delete,
  Put,
} from '@nestjs/common';
import { BaseValidation } from 'src/validation/base-validation';
import { BaseExceptionFilter } from '../../filter/base-exception-filter';
import { CreateEventDto, GetEventsDto } from '../dto/event.dto';
import { EventService } from '../service/event.service';
import { Request } from 'express';

@UseGuards(AuthGuard)
@UseFilters(BaseExceptionFilter)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UsePipes(BaseValidation)
  @Post()
  async create(@Body() dto: CreateEventDto, @Req() req: Request) {
    return await this.eventService.create(req.user.id, dto);
  }

  @Get()
  async getEvents(@Req() req: Request) {
    return await this.eventService.getEvents(req.user.id);
  }

  @UsePipes(BaseValidation)
  @Delete()
  async deleteEvent(@Body() dto: DeleteEventDto) {
    return await this.eventService.deleteEvent(dto.id);
  }

  @UsePipes(BaseValidation)
  @Put()
  async updateEvent(@Body() dto: UpdateEventDto, @Req() req: Request) {
    return await this.eventService.update(
      dto.id,
      dto.payload,
      req.user.setting,
    );
  }
}
