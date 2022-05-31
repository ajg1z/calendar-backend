import { ICreateSetting } from './../repository/setting.interface';
import { SettingRepository } from './../repository/setting.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';

@Injectable()
export class SettingService {
  constructor(private settingRepository: SettingRepository) {}

  async create(dto: ICreateSetting) {
    return await this.settingRepository.create(dto);
  }

  async delete(id: ObjectId) {
    return await this.settingRepository.delete(id);
  }

  async getOne(id: ObjectId) {
    return await this.settingRepository.findOneByUser(id);
  }
}
