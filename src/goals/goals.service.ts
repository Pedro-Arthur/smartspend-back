import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { Goal } from './goals.entity';
import { GoalCreateDto, GoalUpdateDto } from './goals.dto';

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

  async create(user: JwtUserDto, data: GoalCreateDto) {
    if (data.startDate > data.endDate) {
      throw new BadRequestException(
        'Data final deve ser maior que a data inicial.',
      );
    }

    if (data.startDate === data.endDate) {
      throw new BadRequestException(
        'Data final e data inicial não podem ser iguais.',
      );
    }

    const todayDate = new Date()
      .toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      .split('/')
      .reverse()
      .join('-');

    if (data.startDate < todayDate) {
      throw new BadRequestException(
        'A data inicial deve ser a partir do dia atual.',
      );
    }

    return this.goalsRepository.save({
      user,
      ...data,
    });
  }

  async update(user: JwtUserDto, data: GoalUpdateDto, id: number) {
    const goal = await this.goalsRepository.findOne({
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

    if (!goal) {
      throw new NotFoundException('Meta não encontrada!');
    }

    return this.goalsRepository.save({
      ...goal,
      ...data,
    });
  }

  async remove(user: JwtUserDto, id: number) {
    await this.goalsRepository.delete({ id, user });
  }
}
