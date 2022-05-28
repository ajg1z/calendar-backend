import { typeEvent } from '../model/event.interface';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Max,
  Min,
  IsMongoId,
  IsArray,
  IsOptional,
  IsNotEmptyObject,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Type } from 'class-transformer';

export enum TypeEvent {
  holiday = 'holiday',
  weekend = 'weekend',
  myEvent = 'myEvent',
}

export class DeleteEventDto {
  @IsMongoId({ each: true })
  id: ObjectId | ObjectId[];
}

export class CreateEventDto {
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  title: string;

  @IsString()
  @MaxLength(5)
  @MinLength(5)
  time: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Max(31)
  @Min(1)
  day: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Max(11)
  @Min(0)
  month: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  year: number;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsEnum(TypeEvent)
  typeEvent: typeEvent;
}

export class GetEventsDto {
  @IsMongoId({ each: true })
  @IsArray()
  ids: ObjectId[];
}
export class UpdateEvent {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  @MinLength(5)
  time: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Max(31)
  @Min(1)
  day: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Max(11)
  @Min(0)
  month: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  year: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsEnum(TypeEvent)
  typeEvent: typeEvent;
}

export class UpdateEventDto {
  @IsMongoId()
  id: ObjectId;

  @Type(() => UpdateEvent)
  @IsNotEmptyObject()
  payload: UpdateEvent;
}
