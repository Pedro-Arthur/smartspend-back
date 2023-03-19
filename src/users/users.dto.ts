import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsBoolean,
  ValidateIf,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  password?: string | null;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  photoUrl?: string | null;

  @IsNotEmpty()
  @IsBoolean()
  withGoogle: boolean;
}

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;
}
