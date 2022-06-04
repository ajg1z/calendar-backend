import { IsArray, IsEmail, IsEnum, IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateSharedEventDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsMongoId({ each: true })
  @IsArray()
  events: ObjectId[];
}

export class DeleteSharedEventDto {
  @IsMongoId()
  event: ObjectId;

  @IsString()
  @IsEmail()
  sender: string;

  @IsString()
  @IsEmail()
  recipient: string;
}
