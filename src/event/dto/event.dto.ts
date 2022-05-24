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
} from 'class-validator';

export enum TypeEvent {
  holiday = 'holiday',
  weekend = 'weekend',
  myEvent = 'myEvent',
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
