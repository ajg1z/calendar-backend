import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from 'src/user/model/user.model';
import { IColorsIconsEvent, themeEnum, theme } from './setting.interface';

export type SettingDocument = Setting & Document;
@Schema()
export class Setting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: ObjectId;

  @Prop({ required: true, default: 'night' })
  theme: theme;

  @Prop({
    type: { weekend: String, holiday: String, myEvent: String, _id: false },
    required: true,
    default: {
      holiday: '#ecb11c',
      myEvent: '#16d346',
      weekend: '#e11111',
    },
  })
  colorIconsEvent: IColorsIconsEvent;

  @Prop({ required: true })
  timezone: number;

  @Prop({ required: true, default: true })
  isNotify: boolean;

  @Prop({ required: true, default: false })
  notEventReceive: boolean;

  @Prop({ required: true, default: false })
  includeAlignHolydaysEvent: boolean;

  @Prop({ required: true, default: true })
  includeAlignEvent: boolean;
}
export const SettingModel = SchemaFactory.createForClass(Setting);
