import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Event } from 'src/event/model/event.model';
import { User } from 'src/user/model/user.model';

export type SharedEventDocument = SharedEvent & Document;

@Schema()
export class SharedEvent {
  @Prop({ required: true })
  recipient: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Event.name }] })
  events: ObjectId[];

  @Prop({ required: true })
  sender: string;
}

export const SharedEventModel = SchemaFactory.createForClass(SharedEvent);
