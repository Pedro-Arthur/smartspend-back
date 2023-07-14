import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginDto,
  ResetPasswordSendCodeDto,
  ResetPasswordUpdateDto,
} from './auth.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.generateAuthToken(req.user);
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
