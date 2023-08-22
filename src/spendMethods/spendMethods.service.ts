import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SpendMethod } from './spendMethods.entity';

@Injectable()
export class SpendMethodsService {
  constructor(
    @Inject('SPEND_METHOD_REPOSITORY')
    private spendMethodsRepository: Repository<SpendMethod>,
  ) {}

  async find() {
    return this.spendMethodsRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
