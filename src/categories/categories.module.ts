import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { categoriesProviders } from './categories.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...categoriesProviders],
  exports: [...categoriesProviders],
})
export class CategoriesModule {}
