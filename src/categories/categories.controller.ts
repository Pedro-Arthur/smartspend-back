import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CategoryCreateDto } from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
@ApiTags('categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async find(@Request() req) {
    return this.categoriesService.find(req.user);
  }

  @Post()
  @ApiBody({ type: CategoryCreateDto })
  async create(@Request() req, @Body() data: CategoryCreateDto) {
    return this.categoriesService.create(req.user, data);
  }
}
