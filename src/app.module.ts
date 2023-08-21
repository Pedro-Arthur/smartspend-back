import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { CodesModule } from './codes/codes.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { BanksModule } from './banks/banks.module';
import { CategoriesModule } from './categories/categories.module';
import { SpendMethodsModule } from './spendMethods/spendMethods.module';
import { BankAccountsModule } from './bankAccounts/bankAccounts.module';
import { BankCardsModule } from './bankCards/bankCards.module';
import { GoalsModule } from './goals/goals.module';
import { SpendsModule } from './spends/spends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    SendGridModule.forRoot({
      apikey: process.env.SEND_GRID_API_KEY,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UsersModule,
    CodesModule,
    AuthModule,
    BanksModule,
    CategoriesModule,
    SpendMethodsModule,
    BankAccountsModule,
    BankCardsModule,
    GoalsModule,
    SpendsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
