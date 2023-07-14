import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class ResetPasswordSendCodeDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido!' })
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;
}

export class ResetPasswordUpdateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Além disso, a senha deve ter no mínimo 8 caracteres de comprimento.',
  })
  newPassword: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido!' })
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export class LoginWithGoogleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}

export class JwtUserDto {
  id: number;
  name: string;
  email: string;
  pictureUrl?: string | null;
  withGoogle: boolean;
  hasAcceptedTerms: boolean;
}
