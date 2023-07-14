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
import {
  LoginDto,
  LoginWithGoogleDto,
  ResetPasswordSendCodeDto,
  ResetPasswordUpdateDto,
} from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('loginWithGoogle')
  @ApiBody({ type: LoginWithGoogleDto })
  async loginWithGoogle(@Body() data: LoginWithGoogleDto) {
    return this.authService.loginWithGoogle(data);
  }

  @Post('resetPassword/sendCode')
  @ApiBody({ type: ResetPasswordSendCodeDto })
  async sendCodeByEmail(@Body() data: ResetPasswordSendCodeDto) {
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
  @ApiBody({ type: ResetPasswordUpdateDto })
  async updatePassword(
    @Param('code') code: string,
    @Body() data: ResetPasswordUpdateDto,
  ) {
    return this.authService.updatePassword(code, data);
  }
}
