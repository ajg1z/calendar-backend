import { IFindOneSetting, IUpdateSetting } from './setting.interface';
import { ICreateSetting } from './../repository/setting.interface';
import { SettingRepository } from './../repository/setting.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { SettingEntity } from '../entity/setting.entity';

@Injectable()
export class SettingService {
  constructor(private settingRepository: SettingRepository) {}

  async create(dto: ICreateSetting): Promise<SettingEntity> {
    return await this.settingRepository.create(dto);
  }

  async delete(id: ObjectId): Promise<SettingEntity> {
    return await this.settingRepository.delete(id);
  }

  async getOne(id: ObjectId): Promise<SettingEntity> {
    return await this.settingRepository.getOne(id);
  }

  async update(dto: IUpdateSetting, setting: ObjectId): Promise<SettingEntity> {
    return await this.settingRepository.update(setting, dto);
  }

  async findByUser(id: ObjectId) {
    return await this.settingRepository.findOneByUser(id);
  }
}
