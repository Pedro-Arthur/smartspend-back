import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { banksProviders } from './banks.provider';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BanksController],
  providers: [...banksProviders, BanksService],
  exports: [...banksProviders],
})
export class BanksModule {}
