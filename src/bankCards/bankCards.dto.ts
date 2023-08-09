import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BankCardTypeEnum } from './bankCards.enum';

export class BankCardCreateDto {
  @IsNotEmpty()
  @IsNumberString({}, { message: 'Números do cartão inválidos.' })
  @MaxLength(4, {
    message: 'Você deve enviar os últimos 4 números do cartão.',
  })
  @MinLength(4, {
    message: 'Você deve enviar os últimos 4 números do cartão.',
  })
  @ApiProperty()
  lastFourNumbers: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(BankCardTypeEnum)
  type: BankCardTypeEnum;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  bankAccountId: number;
}

export class BankCardUpdateDto {
  @IsOptional()
  @IsNumberString({}, { message: 'Números do cartão inválidos.' })
  @MaxLength(4, {
    message: 'Você deve enviar os últimos 4 números do cartão.',
  })
  @MinLength(4, {
    message: 'Você deve enviar os últimos 4 números do cartão.',
  })
  @ApiProperty()
  lastFourNumbers: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(BankCardTypeEnum)
  type: BankCardTypeEnum;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  bankAccountId: number;
}
