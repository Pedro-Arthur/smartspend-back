import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { spendMethodsProviders } from './spendMethods.provider';
import { SpendMethodsController } from './spendMethods.controller';
import { SpendMethodsService } from './spendMethods.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SpendMethodsController],
  providers: [...spendMethodsProviders, SpendMethodsService],
  exports: [...spendMethodsProviders],
})
export class SpendMethodsModule {}
