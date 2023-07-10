import {
  UserCreateDto,
  UserCreateWithGoogleDto,
  UserUpdateDto,
} from './users.dto';
import { User } from './users.entity';
import {
  Injectable,
  Inject,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { generateRandomCode, getTemplateString } from 'src/utils/functions';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    private readonly sendGrid: SendGridService,
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

    const user = await this.usersRepository.save({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
    delete user.password;

    const code = generateRandomCode(8);

    const html = await getTemplateString('../templates/confirmAccount.ejs', {
      name: user.name,
      url: `${process.env.URL_CONFIRM_ACCOUNT}${code}`,
    });

    await this.sendGrid.send({
      to: data.email,
      from: process.env.SEND_GRID_SENDER,
      subject: 'Instruções para confirmar a conta.',
      html,
    });

    return user;
  }

  async update(id: number, data: UserUpdateDto) {
    this.usersRepository.update(id, data);
  }

  async createWithGoogle(data: UserCreateWithGoogleDto) {
    const googleUser: any = await (
      await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
    ).json();

    if (!googleUser.verified_email) {
      throw new ForbiddenException(
        'Não é possível se cadastrar com um e-mail que não foi verificado.',
      );
    }

    const alreadyExistsUserWithEmail = await this.usersRepository.findOne({
      where: {
        email: googleUser.email,
      },
    });

    if (alreadyExistsUserWithEmail) {
      throw new ConflictException('E-mail já utilizado por outro usuário!');
    }

    const user = await this.usersRepository.save({
      name: googleUser.name,
      email: googleUser.email,
      withGoogle: true,
    });

    return user;
  }
}
