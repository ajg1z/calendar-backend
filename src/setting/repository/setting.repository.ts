import { ICreateSetting, IUpdateSetting } from './setting.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Setting, SettingDocument } from '../model/setting.model';
import { SettingEntity } from '../entity/setting.entity';

export class SettingRepository {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  async create(dto: ICreateSetting): Promise<SettingEntity> {
    console.log(dto);
    return await this.settingModel.create(dto);
  }

  async update(id: ObjectId, dto: IUpdateSetting): Promise<SettingEntity> {
    return await this.settingModel.findByIdAndUpdate(id, dto);
  }

  async delete(id: ObjectId) {
    return await this.settingModel.findByIdAndRemove(id);
  }

  async findOneByUser(id: ObjectId) {
    return await this.settingModel.findOne({ user: id });
  }

  async getOne(id: ObjectId): Promise<SettingEntity> {
    return await this.settingModel.findById(id);
  }

  async getMany(ids: ObjectId[]) {
    return await this.settingModel.find({ _id: { $in: ids } });
  }
}
