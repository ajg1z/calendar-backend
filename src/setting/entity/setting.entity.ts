import { ObjectId } from 'mongoose';
import { IColorsIconsEvent, theme } from '../model/setting.interface';

export class SettingEntity {
  _id: ObjectId;
  user: ObjectId;
  timezone: number;
  theme: theme;
  colorIconsEvent: IColorsIconsEvent;
  isNotify: boolean;
  notEventReceive: boolean;
  includeAlignHolydaysEvent: boolean;
  includeAlignEvent: boolean;
}
