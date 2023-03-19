import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }

  @Get('findAll')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('findById/:id')
  async findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.usersService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
