import { Module } from '@nestjs/common';
import { TokenService } from './service/token.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenRepository } from './repository/token.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenModel } from './model/token.model';
@Module({
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenModel }]),
  ],
})
export class TokenModule {}
