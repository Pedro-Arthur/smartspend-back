import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { BankCard } from './bankCards.entity';
import { BankCardCreateDto, BankCardUpdateDto } from './bankCards.dto';
import { BankAccount } from 'src/bankAccounts/bankAccounts.entity';

@Injectable()
export class BankCardsService {
  constructor(
    @Inject('BANK_CARD_REPOSITORY')
    private bankCardsRepository: Repository<BankCard>,
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private bankAccountsRepository: Repository<BankAccount>,
  ) {}

  async find(user: JwtUserDto) {
    return this.bankCardsRepository.find({
      where: { user: { id: user.id } },
      select: {
        id: true,
        lastFourNumbers: true,
        type: true,
        bankAccount: {
          id: true,
          agency: true,
          digit: true,
          number: true,
          bank: {
            name: true,
            id: true,
            code: true,
          },
        },
      },
      relations: {
        bankAccount: {
          bank: true,
        },
      },
    });
  }

  async create(user: JwtUserDto, data: BankCardCreateDto) {
    const { bankAccountId, ...rest } = data;

    const bankAccount = await this.bankAccountsRepository.findOne({
      where: {
        id: bankAccountId,
        user: {
          id: user.id,
        },
      },
      relations: {
        bank: true,
      },
    });

    if (!bankAccount) {
      throw new NotFoundException('Conta não encontrada!');
    }

    return this.bankCardsRepository.save({
      user,
      bankAccount,
      ...rest,
    });
  }

  async update(user: JwtUserDto, data: BankCardUpdateDto, id: number) {
    const { bankAccountId, ...rest } = data;

    const bankCard = await this.bankCardsRepository.findOne({
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

    if (!bankCard) {
      throw new NotFoundException('Cartão não encontrado!');
    }

    if (bankAccountId) {
      const bankAccount = await this.bankAccountsRepository.findOne({
        where: {
          id: bankAccountId,
          user: {
            id: user.id,
          },
        },
        relations: {
          bank: true,
        },
      });

      if (!bankAccount) {
        throw new NotFoundException('Conta não encontrada!');
      }

      return this.bankCardsRepository.save({
        bankAccount,
        ...bankCard,
        ...rest,
      });
    } else {
      return this.bankCardsRepository.save({
        ...bankCard,
        ...rest,
      });
    }
  }

  async remove(user: JwtUserDto, id: number) {
    await this.bankCardsRepository.delete({ id, user });
  }
}
