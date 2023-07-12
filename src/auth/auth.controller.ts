import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResetPasswordSendCode } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('resetPassword/sendCode')
  @ApiBody({ type: ResetPasswordSendCode })
  async sendCodeByEmail(@Body() data: ResetPasswordSendCode) {
    return this.authService.sendCodeByEmail(data);
  }

  @Get('resetPassword/checkCode/:code')
  @ApiParam({ name: 'code', type: 'string', required: true })
  async checkCode(@Param('code') code: string) {
    return this.authService.checkCode(code);
  }
}
