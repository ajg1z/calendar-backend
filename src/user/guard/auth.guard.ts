import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from 'src/token/service/token.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken =
      typeof request.headers.authtorization === 'object'
        ? request.headers.authtorization[0]
        : request.headers.authtorization.split(' ')[1];
    if (!accessToken)
      throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);
    const userData = this.tokenService.validateAccessToken(accessToken);
    if (!userData)
      throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);
    request.user = userData;
    return true;
  }
}
