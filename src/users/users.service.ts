import { UserCreateDto, UserUpdateDto } from './users.dto';
import { User } from './users.entity';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(data: UserCreateDto) {
    const alreadyExistsUserWithEmail = await this.usersRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (alreadyExistsUserWithEmail) {
      throw new ConflictException('E-mail já utilizado por outro usuário!');
    }

    const user = await this.usersRepository.save(data);
    delete user.password;
    return user;
  }

  async update(id: number, data: UserUpdateDto) {
    this.usersRepository.update(id, data);
  }
}
