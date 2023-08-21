import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { Spend } from './spends.entity';

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
}
