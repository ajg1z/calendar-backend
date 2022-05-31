import { SettingService } from './service/setting.service';
import { SettingRepository } from './repository/setting.repository';
import { SettingController } from './controller/setting.controller';
import { Setting, SettingModel } from './model/setting.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [SettingRepository, SettingService],
  controllers: [SettingController],
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingModel }]),
    TokenModule,
  ],
  exports: [SettingService],
})
export class SettingModule {}
