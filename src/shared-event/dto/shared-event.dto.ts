import { IsArray, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateSharedEventDto {
  @IsMongoId()
  sender: ObjectId;

  @IsMongoId()
  recipient: ObjectId;

  @IsMongoId({ each: true })
  @IsArray()
  events: ObjectId[];
}

export class UpdateSharedEventDto {
    
}
