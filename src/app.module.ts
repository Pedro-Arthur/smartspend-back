import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    SendGridModule.forRoot({
      apikey: process.env.SEND_GRID_API_KEY,
    }),
    UsersModule,
  ],
})
export class AppModule {}
