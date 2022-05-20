import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';

const launch = async () => {
  const app = await NestFactory.create(AppModule);
  console.log(app);
  await app.listen(3001);
};
launch();
