import { HttpException, ValidationError } from '@nestjs/common';
export class BadRequest extends HttpException {
  errors: ValidationError[];
  constructor(errors: ValidationError[], status: number, message: string) {
    super(message, status);
    this.errors = errors;
  }
}
