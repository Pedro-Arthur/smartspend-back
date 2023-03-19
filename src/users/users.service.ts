import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { User } from './users.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(data: UserCreateDto) {
    this.usersRepository.save(data);
  }

  async findById(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async update(id: number, data: UserUpdateDto) {
    this.usersRepository.update(id, data);
  }

  async delete(id: number) {
    this.usersRepository.delete(id);
  }
}
