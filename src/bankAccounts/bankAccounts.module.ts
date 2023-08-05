import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BankAccountsController } from './bankAccounts.controller';
import { bankAccountsProviders } from './bankAccounts.provider';
import { BankAccountsService } from './bankAccounts.service';
import { BanksModule } from 'src/banks/banks.module';

@Module({
  imports: [DatabaseModule, BanksModule],
  controllers: [BankAccountsController],
  providers: [...bankAccountsProviders, BankAccountsService],
  exports: [...bankAccountsProviders],
})
export class BankAccountsModule {}
