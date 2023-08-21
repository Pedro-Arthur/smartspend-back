import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SpendsController } from './spends.controller';
import { spendsProviders } from './spends.provider';
import { SpendsService } from './spends.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SpendsController],
  providers: [...spendsProviders, SpendsService],
  exports: [...spendsProviders],
})
export class SpendsModule {}
