import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { bankCardsProviders } from './bankCards.provider';
import { BankCardsService } from './bankCards.service';
import { BankCardsController } from './bankCards.controller';
import { BankAccountsModule } from 'src/bankAccounts/bankAccounts.module';

@Module({
  imports: [DatabaseModule, BankAccountsModule],
  controllers: [BankCardsController],
  providers: [...bankCardsProviders, BankCardsService],
  exports: [...bankCardsProviders],
})
export class BankCardsModule {}
