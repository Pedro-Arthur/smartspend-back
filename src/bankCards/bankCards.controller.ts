import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BankCardsService } from './bankCards.service';

@Controller('bankCards')
@ApiTags('bankCards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BankCardsController {
  constructor(private bankCardsService: BankCardsService) {}

  @Get()
  async find(@Request() req) {
    return this.bankCardsService.find(req.user);
  }
}
