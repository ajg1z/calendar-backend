import {
  CreateSharedEventDto,
  DeleteSharedEventDto,
} from './../dto/shared-event.dto';
import { SharedEventService } from './../service/shared-event.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseValidation } from 'src/validation/base-validation';

@UseGuards(AuthGuard)
@UseFilters(BaseExceptionFilter)
@Controller('shared-event')
export class SharedEventController {
  constructor(private readonly sharedEventService: SharedEventService) {}

  @UsePipes(BaseValidation)
  @Post()
  async create(@Body() dto: CreateSharedEventDto, @Req() req: Request) {
    return await this.sharedEventService.create(dto, req.user.email);
  }

  @UsePipes(BaseValidation)
  @Put()
  async delete(@Body() dto: DeleteSharedEventDto) {
    return await this.sharedEventService.removeEvent(dto.id, dto.events);
  }

  @Get('sent')
  async getSentEvent(@Req() req: Request) {
    return await this.sharedEventService.getSentEvent(req.user.email);
  }

  @Get('receive')
  async getReceiveEvent(@Req() req: Request) {
    return await this.sharedEventService.getReceiveEvent(req.user.email);
  }
}
