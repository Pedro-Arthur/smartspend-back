import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResetPasswordSendCode, ResetPasswordUpdate } from './auth.dto';

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

  @Patch('resetPassword/updatePassword/:code')
  @HttpCode(200)
  @ApiParam({ name: 'code', type: 'string', required: true })
  @ApiBody({ type: ResetPasswordUpdate })
  async updatePassword(
    @Param('code') code: string,
    @Body() data: ResetPasswordUpdate,
  ) {
    return this.authService.updatePassword(code, data);
  }
}
