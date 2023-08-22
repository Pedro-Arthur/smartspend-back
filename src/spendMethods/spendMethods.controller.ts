import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SpendMethodsService } from './spendMethods.service';

@Controller('spendMethods')
@ApiTags('spendMethods')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SpendMethodsController {
  constructor(private spendMethodsService: SpendMethodsService) {}

  @Get()
  async find() {
    return this.spendMethodsService.find();
  }
}
