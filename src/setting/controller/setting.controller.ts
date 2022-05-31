import { DeleteSettingDto } from './../dto/setting.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateSettingDto } from '../dto/setting.dto';
import { SettingService } from '../service/setting.service';
import { BaseExceptionFilter } from 'src/filter/base-exception-filter';
import { BaseValidation } from 'src/validation/base-validation';
import { Request } from 'express';
import { AuthGuard } from 'src/user/guard/auth.guard';

@UseFilters(BaseExceptionFilter)
@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @UseGuards(AuthGuard)
  @UsePipes(BaseValidation)
  @Post()
  async create(@Body() dto: CreateSettingDto) {
    return await this.settingService.create(dto);
  }

  @Get()
  async getOne(@Req() req: Request) {
    return await this.settingService.getOne(req.user.id);
  }

  @UsePipes(BaseValidation)
  @Delete()
  async delete(@Body() dto: DeleteSettingDto) {
    return await this.settingService.delete(dto.id);
  }
}
