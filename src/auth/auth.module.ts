import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CodesModule } from 'src/codes/codes.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, CodesModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
