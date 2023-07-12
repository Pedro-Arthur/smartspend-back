import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CodesModule } from 'src/codes/codes.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule, CodesModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
