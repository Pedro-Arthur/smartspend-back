import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { Spend } from './spends.entity';
import { SpendCreateDto, SpendUpdateDto } from './spends.dto';
import { BankCard } from 'src/bankCards/bankCards.entity';
import { BankAccount } from 'src/bankAccounts/bankAccounts.entity';
import { Category } from 'src/categories/categories.entity';
import { SpendMethod } from 'src/spendMethods/spendMethods.entity';

@Injectable()
export class SpendsService {
  constructor(
    @Inject('SPEND_REPOSITORY')
    private spendsRepository: Repository<Spend>,
    @Inject('BANK_CARD_REPOSITORY')
    private bankCardsRepository: Repository<BankCard>,
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private bankAccountsRepository: Repository<BankAccount>,
    @Inject('CATEGORY_REPOSITORY')
    private categoriesRepository: Repository<Category>,
    @Inject('SPEND_METHOD_REPOSITORY')
    private spendMethodsRepository: Repository<SpendMethod>,
  ) {}

  async find(user: JwtUserDto) {
    return this.spendsRepository.find({
      where: { user: { id: user.id } },
      select: {
        id: true,
        description: true,
        value: true,
        date: true,
        spendMethod: {
          id: true,
          name: true,
        },
        category: {
          id: true,
          name: true,
        },
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
        bankCard: {
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
      },
      relations: {
        bankAccount: {
          bank: true,
        },
        bankCard: {
          bankAccount: {
            bank: true,
          },
        },
        category: true,
        spendMethod: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async create(user: JwtUserDto, data: SpendCreateDto) {
    const { bankAccountId, bankCardId, spendMethodId, categoryId, ...rest } =
      data;

    let bankAccount = null;
    let bankCard = null;

    if (bankAccountId) {
      bankAccount = await this.bankAccountsRepository.findOne({
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
    }

    if (bankCardId) {
      bankCard = await this.bankCardsRepository.findOne({
        where: {
          id: bankCardId,
          user: {
            id: user.id,
          },
        },
        relations: {
          bankAccount: {
            bank: true,
          },
        },
      });

      if (!bankCard) {
        throw new NotFoundException('Cartão não encontrado!');
      }
    }

    const spendMethod = await this.spendMethodsRepository.findOne({
      where: {
        id: spendMethodId,
      },
    });

    if (!spendMethod) {
      throw new NotFoundException('Método não encontrado!');
    }

    const category = await this.categoriesRepository.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    return this.spendsRepository.save({
      user,
      bankAccount,
      bankCard,
      category,
      spendMethod,
      ...rest,
    });
  }

  async update(user: JwtUserDto, data: SpendUpdateDto, id: number) {
    const { bankAccountId, bankCardId, spendMethodId, categoryId, ...rest } =
      data;

    const spend = await this.spendsRepository.findOne({
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

    if (!spend) {
      throw new NotFoundException('Gasto não encontrado!');
    }

    const spendToSave: any = {
      user,
      ...rest,
      ...spend,
    };

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

      spendToSave.bankAccount = bankAccount;
    }

    if (bankCardId) {
      const bankCard = await this.bankCardsRepository.findOne({
        where: {
          id: bankCardId,
          user: {
            id: user.id,
          },
        },
        relations: {
          bankAccount: {
            bank: true,
          },
        },
      });

      if (!bankCard) {
        throw new NotFoundException('Cartão não encontrado!');
      }

      spendToSave.bankCard = bankCard;
    }

    if (spendMethodId) {
      const spendMethod = await this.spendMethodsRepository.findOne({
        where: {
          id: spendMethodId,
        },
      });

      if (!spendMethod) {
        throw new NotFoundException('Método não encontrado!');
      }

      spendToSave.spendMethod = spendMethod;
    }

    if (categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException('Categoria não encontrada!');
      }

      spendToSave.category = category;
    }

    return this.spendsRepository.save(spendToSave);
  }

  async remove(user: JwtUserDto, id: number) {
    await this.spendsRepository.delete({ id, user });
  }
}
