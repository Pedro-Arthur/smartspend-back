import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsBoolean,
  ValidateIf,
  MaxLength,
  Matches,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido!' })
  @MaxLength(200)
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

  @IsOptional()
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
  withGoogle?: boolean | null;
}

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name?: string;
}
