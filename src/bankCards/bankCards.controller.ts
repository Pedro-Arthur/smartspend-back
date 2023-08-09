import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  HttpCode,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BankCardsService } from './bankCards.service';
import { BankCardCreateDto, BankCardUpdateDto } from './bankCards.dto';

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

  @Post()
  @ApiBody({ type: BankCardCreateDto })
  async create(@Request() req, @Body() data: BankCardCreateDto) {
    return this.bankCardsService.create(req.user, data);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: BankCardUpdateDto })
  async update(
    @Request() req,
    @Body() data: BankCardUpdateDto,
    @Param('id') id: number,
  ) {
    return this.bankCardsService.update(req.user, data, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  async remove(@Request() req, @Param('id') id: number) {
    return this.bankCardsService.remove(req.user, id);
  }
}
