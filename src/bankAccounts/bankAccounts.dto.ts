import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BankAccountCreateDto {
  @IsNotEmpty()
  @IsNumberString({}, { message: 'O número da conta deve ser um número.' })
  @MaxLength(10, {
    message: 'O número da conta pode ter no máximo 10 caracteres.',
  })
  @ApiProperty()
  number: string;

  @IsNotEmpty()
  @IsNumberString({}, { message: 'O dígito da conta deve ser um número.' })
  @MaxLength(1, {
    message: 'O dígito da conta deve ter 1 caractere.',
  })
  @MinLength(1, {
    message: 'O dígito da conta deve ter 1 caractere.',
  })
  @ApiProperty()
  digit: string;

  @IsNotEmpty()
  @IsNumberString({}, { message: 'A agência da conta deve ser um número.' })
  @MaxLength(4, {
    message: 'A agência da conta deve ter 4 caracteres.',
  })
  @MinLength(4, {
    message: 'A agência da conta deve ter 4 caracteres.',
  })
  @ApiProperty()
  agency: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  bankId: number;
}

export class BankAccountUpdateDto {
  @IsOptional()
  @IsNumberString({}, { message: 'O número da conta deve ser um número.' })
  @MaxLength(10, {
    message: 'O número da conta pode ter no máximo 10 caracteres.',
  })
  @ApiProperty()
  number: string;

  @IsOptional()
  @IsNumberString({}, { message: 'O dígito da conta deve ser um número.' })
  @MaxLength(1, {
    message: 'O dígito da conta deve ter 1 caractere.',
  })
  @MinLength(1, {
    message: 'O dígito da conta deve ter 1 caractere.',
  })
  @ApiProperty()
  digit: string;

  @IsOptional()
  @IsNumberString({}, { message: 'A agência da conta deve ser um número.' })
  @MaxLength(4, {
    message: 'A agência da conta deve ter 4 caracteres.',
  })
  @MinLength(4, {
    message: 'A agência da conta deve ter 4 caracteres.',
  })
  @ApiProperty()
  agency: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  bankId: number;
}
