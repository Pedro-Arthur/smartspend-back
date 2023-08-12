import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsOptional,
  Min,
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
  @Min(1, { message: 'O valor precisa ser maior que R$ 1.00!' })
  @ApiProperty()
  maxValue: number;
}

export class GoalUpdateDto {
  @IsOptional()
  @IsNumber({}, { message: 'Valor inválido!' })
  @Min(1, { message: 'O valor precisa ser maior que R$ 1.00!' })
  @ApiProperty()
  maxValue: number;
}
