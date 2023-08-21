import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Post,
  Body,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SpendsService } from './spends.service';
import { SpendCreateDto, SpendUpdateDto } from './spends.dto';

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

  @Post()
  @ApiBody({ type: SpendCreateDto })
  async create(@Request() req, @Body() data: SpendCreateDto) {
    return this.spendsService.create(req.user, data);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: SpendUpdateDto })
  async update(
    @Request() req,
    @Body() data: SpendUpdateDto,
    @Param('id') id: number,
  ) {
    return this.spendsService.update(req.user, data, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: 'string', required: true })
  async remove(@Request() req, @Param('id') id: number) {
    return this.spendsService.remove(req.user, id);
  }
}
