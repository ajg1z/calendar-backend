import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { typeEvent } from './event.interface';

export type EventDocument = Event & Document;
@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  time: string;

  @Prop({ max: 31, min: 1, required: true })
  day: number;

  @Prop({ max: 11, min: 0, required: true })
  month: number;

  @Prop({ min: 1, required: true })
  year: number;

  @Prop()
  description: string;

  @Prop({ type: String, required: true })
  typeEvent: typeEvent;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: '' }] })
  events: ObjectId[];
}

export const EventModel = SchemaFactory.createForClass(Event);
