import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsBoolean,
  ValidateIf,
  MaxLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(200)
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty()
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
