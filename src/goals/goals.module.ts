import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GoalsController } from './goals.controller';
import { goalsProviders } from './goals.provider';
import { GoalsService } from './goals.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GoalsController],
  providers: [...goalsProviders, GoalsService],
  exports: [...goalsProviders],
})
export class GoalsModule {}
