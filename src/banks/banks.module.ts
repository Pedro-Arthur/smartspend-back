import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { banksProviders } from './banks.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...banksProviders],
  exports: [...banksProviders],
})
export class BanksModule {}
