import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { JwtUserDto } from 'src/auth/auth.dto';
import { Goal } from './goals.entity';
import { GoalCreateDto } from './goals.dto';
import { Spend } from 'src/spends/spends.entity';

@Injectable()
export class GoalsService {
  constructor(
    @Inject('GOAL_REPOSITORY')
    private goalsRepository: Repository<Goal>,
    @Inject('SPEND_REPOSITORY')
    private spendsRepository: Repository<Spend>,
  ) {}

  async find(user: JwtUserDto) {
    const goals = await this.goalsRepository.find({
      where: [{ user: { id: user.id } }],
      select: {
        id: true,
        startDate: true,
        endDate: true,
        maxValue: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return Promise.all(
      goals.map(async (goal: Goal) => {
        const spends = await this.spendsRepository.find({
          where: {
            user: {
              id: user.id,
            },
            date: Between(goal.startDate, goal.endDate),
          },
          select: {
            value: true,
          },
        });

        const totalSpent = spends.reduce((total, obj) => {
          const numberValue = parseFloat(`${obj.value}`);
          return total + numberValue;
        }, 0);

        const percent = parseFloat(
          Math.min(
            (totalSpent / parseFloat(`${goal.maxValue}`)) * 100,
            100,
          ).toFixed(2),
        );

        return {
          ...goal,
          totalSpent,
          percent,
        };
      }),
    );
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

    const goal = await this.goalsRepository.save({
      user,
      ...data,
    });

    const spends = await this.spendsRepository.find({
      where: {
        user: {
          id: user.id,
        },
        date: Between(goal.startDate, goal.endDate),
      },
      select: {
        value: true,
      },
    });

    const totalSpent = spends.reduce((total, obj) => {
      const numberValue = parseFloat(`${obj.value}`);
      return total + numberValue;
    }, 0);

    const percent = parseFloat(
      Math.min(
        (totalSpent / parseFloat(`${goal.maxValue}`)) * 100,
        100,
      ).toFixed(2),
    );

    return {
      ...goal,
      totalSpent,
      percent,
    };
  }

  async remove(user: JwtUserDto, id: number) {
    await this.goalsRepository.delete({ id, user });
  }
}
