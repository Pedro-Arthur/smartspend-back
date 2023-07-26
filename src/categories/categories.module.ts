import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { categoriesProviders } from './categories.provider';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [...categoriesProviders, CategoriesService],
  exports: [...categoriesProviders],
})
export class CategoriesModule {}
