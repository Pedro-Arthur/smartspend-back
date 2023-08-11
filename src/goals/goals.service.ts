import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { Goal } from './goals.entity';

@Injectable()
export class GoalsService {
  constructor(
    @Inject('GOAL_REPOSITORY')
    private goalsRepository: Repository<Goal>,
  ) {}

  async find(user: JwtUserDto) {
    return this.goalsRepository.find({
      where: [{ user: { id: user.id } }],
      select: {
        id: true,
        startDate: true,
        endDate: true,
        maxValue: true,
      },
    });
  }
}
