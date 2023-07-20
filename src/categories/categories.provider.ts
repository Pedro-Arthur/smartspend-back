import { DataSource } from 'typeorm';
import { Category } from './categories.entity';

export const categoriesProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
