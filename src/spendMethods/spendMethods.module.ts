import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { spendMethodsProviders } from './spendMethods.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...spendMethodsProviders],
  exports: [...spendMethodsProviders],
})
export class SpendMethodsModule {}
