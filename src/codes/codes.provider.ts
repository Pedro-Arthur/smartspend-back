import { DataSource } from 'typeorm';
import { Code } from './codes.entity';

export const codesProviders = [
  {
    provide: 'CODE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Code),
    inject: ['DATA_SOURCE'],
  },
];
