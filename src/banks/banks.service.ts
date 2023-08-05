import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bank } from './banks.entity';

@Injectable()
export class BanksService {
  constructor(
    @Inject('BANK_REPOSITORY')
    private banksRepository: Repository<Bank>,
  ) {}

  async find() {
    return this.banksRepository.find({
      select: {
        id: true,
        code: true,
        name: true,
      },
    });
  }
}
