import { DataSource } from 'typeorm';
import { Bank } from './banks.entity';

export const banksProviders = [
  {
    provide: 'BANK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Bank),
    inject: ['DATA_SOURCE'],
  },
];
