import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SpendsController } from './spends.controller';
import { spendsProviders } from './spends.provider';
import { SpendsService } from './spends.service';
import { BankAccountsModule } from 'src/bankAccounts/bankAccounts.module';
import { BankCardsModule } from 'src/bankCards/bankCards.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { SpendMethodsModule } from 'src/spendMethods/spendMethods.module';

@Module({
  imports: [
    DatabaseModule,
    BankAccountsModule,
    BankCardsModule,
    CategoriesModule,
    SpendMethodsModule,
  ],
  controllers: [SpendsController],
  providers: [...spendsProviders, SpendsService],
  exports: [...spendsProviders],
})
export class SpendsModule {}
