import { ObjectId } from 'mongoose';
import {
  IsString,
  IsEmail,
  IsHash,
  MaxLength,
  MinLength,
  IsArray,
  Validate,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MaxLength(55)
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MaxLength(55)
  @MinLength(6)
  password: string;
}

export class GetOneUserDto {
  @IsMongoId({ each: true })
  ids: ObjectId[];
}

export class DeleteOneUserDto {
  @IsMongoId()
  id: ObjectId;
}

export class DeleteManyUserDto {
  @IsMongoId({ each: true })
  ids: ObjectId[];
}

export class GetManyUserDto {
  @IsMongoId({ each: true })
  ids: ObjectId[];
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  name: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(55)
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  events: ObjectId[];
}

export class UpdateUser {
  @IsMongoId()
  id: ObjectId;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  payload: UpdateUserDto;
}
