import { UserCreateDto, UserUpdateDto } from './users.dto';
import { User } from './users.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(data: UserCreateDto) {
    const user = await this.usersRepository.save(data).catch((e) => {
      if (e.code === '23505') {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return this.usersRepository
      .findOne({
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findAll() {
    return this.usersRepository.find().catch((e) => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: number, data: UserUpdateDto) {
    return this.usersRepository.update(id, data).catch((e) => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async delete(id: number) {
    return this.usersRepository.delete(id).catch((e) => {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
