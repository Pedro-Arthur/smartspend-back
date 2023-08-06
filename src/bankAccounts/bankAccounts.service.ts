import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { BankAccount } from './bankAccounts.entity';
import { BankAccountCreateDto, BankAccountUpdateDto } from './bankAccounts.dto';
import { Bank } from 'src/banks/banks.entity';

@Injectable()
export class BankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private bankAccountsRepository: Repository<BankAccount>,
    @Inject('BANK_REPOSITORY')
    private banksRepository: Repository<Bank>,
  ) {}

  async find(user: JwtUserDto) {
    return this.bankAccountsRepository.find({
      where: { user: { id: user.id } },
      select: {
        id: true,
        agency: true,
        digit: true,
        number: true,
        bank: {
          name: true,
          id: true,
        },
      },
      relations: {
        bank: true,
      },
    });
  }

  async create(user: JwtUserDto, data: BankAccountCreateDto) {
    const { bankId, ...rest } = data;

    const bank = await this.banksRepository.findOne({
      where: { id: bankId },
    });

    if (!bank) {
      throw new NotFoundException('Banco não encontrado!');
    }

    return this.bankAccountsRepository.save({
      user,
      bank,
      ...rest,
    });
  }

  async update(user: JwtUserDto, data: BankAccountUpdateDto, id: number) {
    const { bankId, ...rest } = data;

    const bankAccount = await this.bankAccountsRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!bankAccount) {
      throw new NotFoundException('Conta não encontrada!');
    }

    if (bankId) {
      const bank = await this.banksRepository.findOne({
        where: { id: bankId },
      });

      if (!bank) {
        throw new NotFoundException('Banco não encontrado!');
      }

      return this.bankAccountsRepository.save({
        bank,
        ...bankAccount,
        ...rest,
      });
    } else {
      return this.bankAccountsRepository.save({
        ...bankAccount,
        ...rest,
      });
    }
  }

  async remove(user: JwtUserDto, id: number) {
    return this.bankAccountsRepository.delete({ id, user });
  }
}
