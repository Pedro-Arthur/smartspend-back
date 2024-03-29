import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  ValidateIf,
  MaxLength,
  Matches,
  IsBoolean,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150, { message: 'O nome pode ter no máximo 150 caracteres.' })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido!' })
  @MaxLength(200, { message: 'O e-mail pode ter no máximo 200 caracteres.' })
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Além disso, a senha deve ter no mínimo 8 caracteres de comprimento.',
  })
  password?: string | null;
}

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'O nome pode ter no máximo 150 caracteres.' })
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  hasAcceptedTerms?: boolean;
}

export class UserCreateWithGoogleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}
