import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SpendsService } from './spends.service';

@Controller('spends')
@ApiTags('spends')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SpendsController {
  constructor(private spendsService: SpendsService) {}

  @Get()
  async find(@Request() req) {
    return this.spendsService.find(req.user);
  }
}
