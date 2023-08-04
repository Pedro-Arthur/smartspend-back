import { DataSource } from 'typeorm';
import { BankAccount } from './bankAccounts.entity';

export const bankAccountsProviders = [
  {
    provide: 'BANK_ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BankAccount),
    inject: ['DATA_SOURCE'],
  },
];
