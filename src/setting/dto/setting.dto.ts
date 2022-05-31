import { IsNumberOrUndefined } from './../custom-validator/is-number-or-undefined';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString, Validate } from 'class-validator';

export class CreateSettingDto {
  @IsMongoId()
  user: ObjectId;

  @IsString()
  timezone: number;
}

export class DeleteSettingDto {
  @IsMongoId()
  id: ObjectId;
}
