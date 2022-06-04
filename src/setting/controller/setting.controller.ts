import { DeleteSettingDto, UpdateSettingDto } from './../dto/setting.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
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

@UseGuards(AuthGuard)
@UseFilters(BaseExceptionFilter)
@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @UsePipes(BaseValidation)
  @Post()
  async create(@Body() dto: CreateSettingDto) {
    return await this.settingService.create(dto);
  }

  @Get()
  async getOne(@Req() req: Request) {
    return await this.settingService.findByUser(req.user.id);
  }

  @UsePipes(BaseValidation)
  @Delete()
  async delete(@Body() dto: DeleteSettingDto) {
    return await this.settingService.delete(dto.id);
  }

  @Put()
  async update(@Body() dto: UpdateSettingDto, @Req() req: Request) {
    return await this.settingService.update(dto, req.user.setting);
  }
}
