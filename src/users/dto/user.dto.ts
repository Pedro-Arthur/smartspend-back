import { IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
