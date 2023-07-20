import { DataSource } from 'typeorm';
import { SpendMethod } from './spendMethods.entity';

export const spendMethodsProviders = [
  {
    provide: 'SPEND_METHOD_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SpendMethod),
    inject: ['DATA_SOURCE'],
  },
];
