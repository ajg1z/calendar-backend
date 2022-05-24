import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        enterData: request.body,
        errors: exception.errors,
        message: exception.message,
        instanceof: exception.name,
        statusCode: status,
        timestamp: `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}(${new Date().getHours()}:${new Date().getMinutes()})`,
        path: request.url,
        method: request.method,
      })
      .end();
  }
}
