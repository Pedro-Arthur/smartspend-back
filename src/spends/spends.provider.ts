import { DataSource } from 'typeorm';
import { Spend } from './spends.entity';

export const spendsProviders = [
  {
    provide: 'SPEND_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Spend),
    inject: ['DATA_SOURCE'],
  },
];
