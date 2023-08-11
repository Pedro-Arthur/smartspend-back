import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GoalsService } from './goals.service';

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
}
