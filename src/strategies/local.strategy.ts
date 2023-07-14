import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) {
    const validationResult = await this.authService.validateUser(
      email,
      password,
    );

    if (!validationResult) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    } else {
      return validationResult;
    }
  }
}
