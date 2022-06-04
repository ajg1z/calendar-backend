import { ObjectId } from 'mongoose';
import { IColorsIconsEvent, theme } from '../model/setting.interface';

export interface ICreateSettingService {
  user: ObjectId;
  timezone: number;
}

export interface IUpdateSetting {
  timezone?: number;
  theme?: theme;
  colorIconsEvent?: IColorsIconsEvent;
  isNotify?: boolean;
  notEventReceive?: boolean;
  includeAlignHolydaysEvent?: boolean;
  includeAlignEvent?: boolean;
}

export interface IFindOneSetting extends IUpdateSetting {
  user?: ObjectId;
  _id?: ObjectId;
}
