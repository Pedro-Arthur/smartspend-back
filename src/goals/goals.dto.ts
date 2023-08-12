import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class GoalCreateDto {
  @IsNotEmpty()
  @IsDateString({}, { message: 'Data inicial inválida!' })
  @ApiProperty()
  startDate: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'Data final inválida!' })
  @ApiProperty()
  endDate: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Valor inválido!' })
  @Min(1, { message: 'O valor precisa ser maior que R$ 1,00!' })
  @Max(9999999, { message: 'O valor precisa ser menor que R$ 9.999.999,99!' })
  @ApiProperty()
  maxValue: number;
}

export class GoalUpdateDto {
  @IsOptional()
  @IsNumber({}, { message: 'Valor inválido!' })
  @Min(1, { message: 'O valor precisa ser maior que R$ 1,00!' })
  @Max(9999999, { message: 'O valor precisa ser menor que R$ 9.999.999,99!' })
  @ApiProperty()
  maxValue: number;
}
