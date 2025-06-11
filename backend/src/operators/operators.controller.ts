import { Controller, Get, Post } from '@nestjs/common';
import { OperatorsService } from './operators.service';

@Controller('api/operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get()
  findAll() {
    return this.operatorsService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.operatorsService.findAvailable();
  }

  @Post('seed')
  seedData() {
    return this.operatorsService.seedData();
  }
}