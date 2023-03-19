import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
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
    try {
      return this.usersRepository.save(data);
    } catch (e) {
      throw new HttpException(
        `Ocorreu um erro! Erro: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number) {
    try {
      return this.usersRepository.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new HttpException(
        `Ocorreu um erro! Erro: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return this.usersRepository.find();
    } catch (e) {
      throw new HttpException(
        `Ocorreu um erro! Erro: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, data: UserUpdateDto) {
    try {
      return this.usersRepository.update(id, data);
    } catch (e) {
      throw new HttpException(
        `Ocorreu um erro! Erro: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    try {
      return this.usersRepository.delete(id);
    } catch (e) {
      throw new HttpException(
        `Ocorreu um erro! Erro: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
