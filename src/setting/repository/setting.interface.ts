import { ObjectId } from 'mongoose';
import { IColorsIconsEvent, theme } from '../model/setting.interface';

export interface ICreateSetting {
  user: ObjectId;
  timezone: number;
}

export interface IUpdateColorsIconsEvent {
  weekend?: string;
  holiday?: string;
  myEvent?: string;
}

export interface IUpdateSetting {
  timezone?: number;
  theme?: theme;
  colorIconsEvent?: IUpdateColorsIconsEvent;
  isNotify?: boolean;
  notEventReceive?: boolean;
  includeAlignHolydaysEvent?: boolean;
  includeAlignEvent?: boolean;
}
