import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BanksService } from './banks.service';

@Controller('banks')
@ApiTags('banks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BanksController {
  constructor(private banksService: BanksService) {}

  @Get()
  async find() {
    return this.banksService.find();
  }
}
