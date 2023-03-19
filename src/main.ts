import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/./../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const SERVER_PORT = process.env.PORT || 3000;

  await app.listen(SERVER_PORT);
}
bootstrap();
