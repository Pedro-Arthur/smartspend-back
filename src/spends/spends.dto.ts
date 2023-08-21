import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class SpendCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'A descrição pode ter no máximo 50 caracteres.' })
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Valor inválido!' })
  @Min(1, { message: 'O valor precisa ser maior que R$ 1,00!' })
  @Max(999999, { message: 'O valor precisa ser menor que R$ 999.999,00!' })
  @ApiProperty()
  value: number;

  @IsNotEmpty()
  @IsDateString({}, { message: 'Data inválida!' })
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  categoryId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  spendMethodId: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  bankCardId: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  bankAccountId: number;
}

export class SpendUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'A descrição pode ter no máximo 50 caracteres.' })
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsNumber({}, { message: 'Valor inválido!' })
  @Min(1, { message: 'O valor precisa ser maior que R$ 1,00!' })
  @Max(999999, { message: 'O valor precisa ser menor que R$ 999.999,00!' })
  @ApiProperty()
  value: number;

  @IsOptional()
  @IsDateString({}, { message: 'Data inválida!' })
  @ApiProperty()
  date: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  categoryId: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  spendMethodId: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  bankCardId: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  bankAccountId: number;
}
