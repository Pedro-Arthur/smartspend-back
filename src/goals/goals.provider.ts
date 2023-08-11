import { DataSource } from 'typeorm';
import { Goal } from './goals.entity';

export const goalsProviders = [
  {
    provide: 'GOAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Goal),
    inject: ['DATA_SOURCE'],
  },
];
