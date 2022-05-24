import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type TokenDocument = Token & Document;
@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: ObjectId;

  @Prop({ required: true })
  refreshToken: string;
}

export const TokenModel = SchemaFactory.createForClass(Token);
