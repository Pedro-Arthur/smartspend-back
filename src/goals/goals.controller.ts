import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  HttpCode,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GoalsService } from './goals.service';
import { GoalCreateDto, GoalUpdateDto } from './goals.dto';

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

  @Patch(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: GoalUpdateDto })
  async update(
    @Request() req,
    @Body() data: GoalUpdateDto,
    @Param('id') id: number,
  ) {
    return this.goalsService.update(req.user, data, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  async remove(@Request() req, @Param('id') id: number) {
    return this.goalsService.remove(req.user, id);
  }
}
