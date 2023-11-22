import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

dotenv.config({ path: __dirname + '/./../../.env' });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'smartspend';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || '';
const DB_PORT = Number(process.env.DB_PORT) || 5432;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  factories: ['dist/**/database/factories/**/*.js'],
  seeds: ['dist/**/database/seeds/**/*.js'],
  ssl: !process.env.DEVELOPMENT
    ? {
        rejectUnauthorized: false,
      }
    : null,
};

export const AppDataSource = new DataSource(options);
