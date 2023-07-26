import { Injectable, Inject } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Category } from './categories.entity';
import { JwtUserDto } from 'src/auth/auth.dto';
import { CategoryCreateDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoriesRepository: Repository<Category>,
  ) {}

  async find(user: JwtUserDto) {
    return this.categoriesRepository.find({
      where: [{ user: IsNull() }, { user: { id: user.id } }],
      select: {
        id: true,
        name: true,
      },
    });
  }

  async create(user: JwtUserDto, data: CategoryCreateDto) {
    return this.categoriesRepository.save({
      user,
      name: data.name,
    });
  }
}
