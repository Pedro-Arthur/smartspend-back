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
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async create(user: JwtUserDto, data: SpendCreateDto) {}

  async update(user: JwtUserDto, data: SpendUpdateDto, id: number) {}

  async remove(user: JwtUserDto, id: number) {}
}
