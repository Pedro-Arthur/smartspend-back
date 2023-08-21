import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { Spend } from './spends.entity';
import { SpendCreateDto, SpendUpdateDto } from './spends.dto';

@Injectable()
export class SpendsService {
  constructor(
    @Inject('SPEND_REPOSITORY')
    private spendsRepository: Repository<Spend>,
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

  async create(user: JwtUserDto, data: SpendCreateDto) {}

  async update(user: JwtUserDto, data: SpendUpdateDto, id: number) {}

  async remove(user: JwtUserDto, id: number) {
    await this.spendsRepository.delete({ id, user });
  }
}
