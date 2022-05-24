import {
  Controller,
  Post,
  Body,
  HttpException,
  BadRequestException,
  HttpStatus,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { BaseValidation } from 'src/validation/base-validation';
import { BaseExceptionFilter } from '../../filter/base-exception-filter';
import { CreateEventDto } from '../dto/event.dto';
import { EventService } from '../service/event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseFilters(BaseExceptionFilter)
  @UsePipes(BaseValidation)
  @Post('create')
  async create(@Body() dto: CreateEventDto) {
    return await this.eventService.create(dto);
  }
}
