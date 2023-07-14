import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserCreateDto,
  UserUpdateDto,
  UserCreateWithGoogleDto,
} from './users.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UserCreateDto })
  async create(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }

  @Post('withGoogle')
  @ApiBody({ type: UserCreateWithGoogleDto })
  async createWithGoogle(@Body() data: UserCreateWithGoogleDto) {
    return this.usersService.createWithGoogle(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: UserUpdateDto })
  async update(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.usersService.update(id, data);
  }

  @Get('confirmAccount/:code')
  @HttpCode(200)
  @ApiParam({ name: 'code', type: 'string', required: true })
  async confirmAccount(@Res() res, @Param('code') code: string) {
    return this.usersService.confirmAccount(res, code);
  }
}
