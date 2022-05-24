import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { typeEvent } from './user.interface';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true, maxlength: 255, minlength: 4 })
  name: string;

  @Prop({ required: true, maxlength: 255, unique: true })
  email: string;

  @Prop({ required: true, default: false })
  isActivated: boolean;

  @Prop()
  activationLink: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: '///' })
  avatar: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] })
  events: ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Setting',
    immutable: true,
  })
  settingId: ObjectId;
}

export const UserModel = SchemaFactory.createForClass(User);
