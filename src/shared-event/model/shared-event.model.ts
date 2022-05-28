import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type SharedEventDocument = SharedEvent & Document;

@Schema()
export class SharedEvent {
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  sender: ObjectId;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  recipient: ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] })
  events: ObjectId[];
}

export const SharedEventModel = SchemaFactory.createForClass(SharedEvent);
