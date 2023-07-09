import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './users.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UserCreateDto })
  async create(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: UserUpdateDto })
  async update(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.usersService.update(id, data);
  }
}
