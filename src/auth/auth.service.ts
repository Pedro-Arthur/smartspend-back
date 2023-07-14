import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Code } from 'src/codes/codes.entity';
import { ResetPasswordSendCodeDto, ResetPasswordUpdateDto } from './auth.dto';
import { User } from 'src/users/users.entity';
import { generateRandomCode, getTemplateString } from 'src/utils/functions';
import { CodeTypeEnum } from 'src/codes/codes.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject('CODE_REPOSITORY')
    private codesRepository: Repository<Code>,
    private readonly sendGrid: SendGridService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email, withGoogle: false },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.hasConfirmedEmail) {
        throw new ForbiddenException('Confirme sua conta para se autenticar!');
      }
      return user;
    }
    return null;
  }

  async generateAuthToken(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      pictureUrl: user.pictureUrl,
      withGoogle: user.withGoogle,
      hasAcceptedTerms: user.hasAcceptedTerms,
    };

    const token = this.jwtService.sign(payload);

    const foundToken = await this.codesRepository.findOne({
      where: {
        user: { id: user.id },
        type: CodeTypeEnum.JWT,
      },
    });

    if (foundToken) {
      await this.codesRepository.update(
        { id: foundToken.id },
        {
          value: token,
        },
      );
    } else {
      await this.codesRepository.save({
        value: token,
        user: user,
        type: CodeTypeEnum.JWT,
      });
    }

    return {
      token,
    };
  }

  async loginByToken(token: string) {
    const foundToken = await this.codesRepository.findOne({
      where: {
        value: token,
        type: CodeTypeEnum.JWT,
      },
      relations: {
        user: true,
      },
    });

    if (!foundToken) {
      throw new NotFoundException('Token inválido!');
    }

    return this.generateAuthToken(foundToken.user);
  }

  async loginWithGoogle(token: string) {
    const googleUser: any = await (
      await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    if (!googleUser.email) {
      throw new NotFoundException('Não foi possível pegar usuário do Google.');
    }

    const foundUser = await this.usersRepository.findOne({
      where: {
        email: googleUser.email,
        withGoogle: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.generateAuthToken(foundUser);
  }

  async sendCodeByEmail(data: ResetPasswordSendCodeDto) {
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
      value: crypto.createHash('md5').update(code).digest('hex'),
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
        value: crypto.createHash('md5').update(code).digest('hex'),
        type: CodeTypeEnum.RECOVER_PASSWORD,
      },
    });

    if (!foundCode) {
      throw new NotFoundException('Código inválido!');
    }
  }

  async updatePassword(code: string, data: ResetPasswordUpdateDto) {
    const foundCode = await this.codesRepository.findOne({
      where: {
        value: crypto.createHash('md5').update(code).digest('hex'),
        type: CodeTypeEnum.RECOVER_PASSWORD,
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

    if (!foundCode) {
      throw new NotFoundException('Código inválido!');
    }

    await this.usersRepository.update(
      { id: foundCode.user.id },
      { password: await bcrypt.hash(data.newPassword, 10) },
    );

    await this.codesRepository.delete({ id: foundCode.id });
  }
}
