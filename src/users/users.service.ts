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
import { Code } from 'src/codes/codes.entity';
import { CodeTypeEnum } from 'src/codes/codes.enum';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject('CODE_REPOSITORY')
    private codesRepository: Repository<Code>,
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

    await this.codesRepository.save({
      value: crypto.createHash('md5').update(code).digest('hex'),
      user: user,
      type: CodeTypeEnum.CONFIRM_ACCOUNT,
    });

    const html = await getTemplateString(
      'src/templates/confirmAccountEmail.ejs',
      {
        name: user.name,
        url: `${process.env.URL_CONFIRM_ACCOUNT}${code}`,
      },
    );

    await this.sendGrid.send({
      to: data.email,
      from: process.env.SEND_GRID_SENDER,
      subject: 'Instruções para confirmar a conta.',
      html,
    });

    return user;
  }

  async update(reqUserId: number, id: number, data: UserUpdateDto) {
    if (reqUserId != id) {
      throw new ForbiddenException('Não é possível editar outro usuário.');
    }

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
      pictureUrl: googleUser.picture || null,
    });

    const code = generateRandomCode(8);

    await this.codesRepository.save({
      value: crypto.createHash('md5').update(code).digest('hex'),
      user: user,
      type: CodeTypeEnum.CONFIRM_ACCOUNT,
    });

    const html = await getTemplateString(
      'src/templates/confirmAccountEmail.ejs',
      {
        name: googleUser.name,
        url: `${process.env.URL_CONFIRM_ACCOUNT}${code}`,
      },
    );

    await this.sendGrid.send({
      to: googleUser.email,
      from: process.env.SEND_GRID_SENDER,
      subject: 'Instruções para confirmar a conta.',
      html,
    });

    return user;
  }

  async confirmAccount(res, code: string) {
    const foundCode = await this.codesRepository.findOne({
      where: {
        value: crypto.createHash('md5').update(code).digest('hex'),
        type: CodeTypeEnum.CONFIRM_ACCOUNT,
      },
      select: {
        id: true,
        user: {
          id: true,
        },
      },
      relations: {
        user: true,
      },
    });

    let error = true;
    let message = 'error';

    if (!foundCode) {
      error = true;
      message = 'Código inválido!';
    } else {
      error = false;
      message = 'Conta confirmada com sucesso!';

      await this.usersRepository.update(
        { id: foundCode.user.id },
        { hasConfirmedEmail: true },
      );

      await this.codesRepository.delete({ id: foundCode.id });
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    const html = await getTemplateString(
      'src/templates/confirmAccountResponse.ejs',
      {
        error,
        message,
      },
    );
    res.end(html);
  }
}
