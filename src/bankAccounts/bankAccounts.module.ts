import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BankAccountsController } from './bankAccounts.controller';
import { bankAccountsProviders } from './bankAccounts.provider';
import { BankAccountsService } from './bankAccounts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountsController],
  providers: [...bankAccountsProviders, BankAccountsService],
  exports: [...bankAccountsProviders],
})
export class BankAccountsModule {}
