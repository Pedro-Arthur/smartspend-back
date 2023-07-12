import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Code } from 'src/codes/codes.entity';
import { ResetPasswordSendCode } from './auth.dto';
import { User } from 'src/users/users.entity';
import { generateRandomCode, getTemplateString } from 'src/utils/functions';
import { CodeTypeEnum } from 'src/codes/codes.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject('CODE_REPOSITORY')
    private codesRepository: Repository<Code>,
    private readonly sendGrid: SendGridService,
  ) {}

  async sendCodeByEmail(data: ResetPasswordSendCode) {
    const foundUser = await this.usersRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('Nenhum usuário encontrado com este e-mail!');
    }

    if (foundUser.withGoogle) {
      throw new ForbiddenException(
        'Não é possível alterar senha de usuários cadastrados pelo Google.',
      );
    }

    const code = generateRandomCode(8);

    await this.codesRepository.save({
      value: code,
      user: foundUser,
      type: CodeTypeEnum.RECOVER_PASSWORD,
    });

    const html = await getTemplateString('src/templates/resetPassword.ejs', {
      name: foundUser.name,
      code,
    });

    await this.sendGrid.send({
      to: data.email,
      from: process.env.SEND_GRID_SENDER,
      subject: 'Instruções para redefinir a senha.',
      html,
    });
  }

  async checkCode(code: string) {
    const foundCode = await this.codesRepository.findOne({
      where: {
        value: code,
        type: CodeTypeEnum.RECOVER_PASSWORD,
      },
    });

    if (!foundCode) {
      throw new ForbiddenException('Código inválido!');
    }
  }
}
