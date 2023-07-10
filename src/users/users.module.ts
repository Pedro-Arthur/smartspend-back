import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.provider';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CodesModule } from 'src/codes/codes.module';

@Module({
  imports: [DatabaseModule, CodesModule],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
  exports: [],
})
export class UsersModule {}
