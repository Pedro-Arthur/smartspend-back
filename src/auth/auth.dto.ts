import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordSendCode {
  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido!' })
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;
}
