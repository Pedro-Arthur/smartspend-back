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
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  password?: string | null;

  @IsOptional()
  @IsBoolean()
  @ValidateIf((object, value) => value !== null)
  withGoogle?: boolean | null;
}

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;
}
