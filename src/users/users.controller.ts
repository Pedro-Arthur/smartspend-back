import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
