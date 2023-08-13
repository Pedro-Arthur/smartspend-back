import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  HttpCode,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GoalsService } from './goals.service';
import { GoalCreateDto } from './goals.dto';

@Controller('goals')
@ApiTags('goals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get()
  async find(@Request() req) {
    return this.goalsService.find(req.user);
  }

  @Post()
  @ApiBody({ type: GoalCreateDto })
  async create(@Request() req, @Body() data: GoalCreateDto) {
    return this.goalsService.create(req.user, data);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  async remove(@Request() req, @Param('id') id: number) {
    return this.goalsService.remove(req.user, id);
  }
}
