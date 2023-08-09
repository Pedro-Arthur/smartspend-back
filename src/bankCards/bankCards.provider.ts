import { DataSource } from 'typeorm';
import { BankCard } from './bankCards.entity';

export const bankCardsProviders = [
  {
    provide: 'BANK_CARD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BankCard),
    inject: ['DATA_SOURCE'],
  },
];
