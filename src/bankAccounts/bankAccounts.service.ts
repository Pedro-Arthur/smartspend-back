import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { BankAccount } from './bankAccounts.entity';
import { BankAccountCreateDto, BankAccountUpdateDto } from './bankAccounts.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private bankAccountsRepository: Repository<BankAccount>,
  ) {}

  async find(user: JwtUserDto) {
    console.log(user);
  }

  async create(user: JwtUserDto, data: BankAccountCreateDto) {
    console.log(user);
    console.log(data);
  }

  async update(user: JwtUserDto, data: BankAccountUpdateDto, id: number) {
    console.log(user);
    console.log(data);
    console.log(id);
  }

  async remove(user: JwtUserDto, id: number) {
    console.log(user);
    console.log(id);
  }
}
