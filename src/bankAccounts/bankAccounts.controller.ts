import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BankAccountsService } from './bankAccounts.service';
import { BankAccountCreateDto, BankAccountUpdateDto } from './bankAccounts.dto';

@Controller('bankAccounts')
@ApiTags('bankAccounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BankAccountsController {
  constructor(private bankAccountsService: BankAccountsService) {}

  @Get()
  async find(@Request() req) {
    return this.bankAccountsService.find(req.user);
  }

  @Post()
  @ApiBody({ type: BankAccountCreateDto })
  async create(@Request() req, @Body() data: BankAccountCreateDto) {
    return this.bankAccountsService.create(req.user, data);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: BankAccountUpdateDto })
  async update(
    @Request() req,
    @Body() data: BankAccountUpdateDto,
    @Param('id') id: number,
  ) {
    return this.bankAccountsService.update(req.user, data, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  async remove(@Request() req, @Param('id') id: number) {
    return this.bankAccountsService.remove(req.user, id);
  }
}
