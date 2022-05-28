import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './model/user.model';
import { MailService } from './service/mail.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, MailService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    TokenModule,
  ],
  exports: [MongooseModule, UserService, TokenModule],
})
export class UserModule {}
