import { SettingModule } from './../setting/setting.module';
import { SharedEventsModule } from './../shared-event/shared-event.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from 'src/event/event.module';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from '../config/base-config';
import { TokenModule } from 'src/token/token.module';
@Module({
  imports: [
    EventModule,
    MongooseModule.forRoot('mongodb://localhost/calendar_DB'),
    UserModule,
    ConfigModule.forRoot({ load: [config] }),
    TokenModule,
    SharedEventsModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
