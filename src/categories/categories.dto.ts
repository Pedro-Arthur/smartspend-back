import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'O nome da categoria pode ter no máximo 100 caracteres.',
  })
  @ApiProperty()
  name: string;
}
