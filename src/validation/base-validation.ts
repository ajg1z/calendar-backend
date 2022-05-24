import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequest } from 'src/errors/bad-request';

@Injectable()
export class BaseValidation implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      //если нету dto вернуть входные значения или если тип входных значений нету в js
      return value;
    }   
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object, {
      validationError: { target: false },
    });
  
    if (errors.length > 0) {
      throw new BadRequest(errors, HttpStatus.BAD_REQUEST, 'bad request');
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
