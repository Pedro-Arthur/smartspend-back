import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { BankCard } from './bankCards.entity';

@Injectable()
export class BankCardsService {
  constructor(
    @Inject('BANK_CARD_REPOSITORY')
    private bankCardsRepository: Repository<BankCard>,
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
}
