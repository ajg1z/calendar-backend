import { IsNumberOrUndefined } from './../custom-validator/is-number-or-undefined';
import { ObjectId } from 'mongoose';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import {
  IColorsIconsEvent,
  theme,
  themeEnum,
} from '../model/setting.interface';
import { Type } from 'class-transformer';

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

export class ColorsIconsEvent {
  @IsString()
  weekend: string;

  @IsString()
  holiday: string;

  @IsString()
  myEvent: string;
}

export class UpdateSettingDto {
  @IsOptional()
  @IsNumber()
  timezone: number;

  @IsOptional()
  @IsEnum(themeEnum)
  theme: theme;

  @IsOptional()
  @Type(() => ColorsIconsEvent)
  @ValidateNested()
  @IsNotEmptyObject()
  @IsDefined()
  colorIconsEvent: IColorsIconsEvent;

  @IsOptional()
  @IsBoolean()
  isNotify: boolean;

  @IsOptional()
  @IsBoolean()
  notEventReceive: boolean;

  @IsOptional()
  @IsBoolean()
  includeAlignHolydaysEvent: boolean;

  @IsOptional()
  @IsBoolean()
  includeAlignEvent: boolean;
}
