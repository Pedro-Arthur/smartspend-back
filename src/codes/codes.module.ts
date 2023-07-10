import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { codesProviders } from './codes.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...codesProviders],
  exports: [...codesProviders],
})
export class CodesModule {}
