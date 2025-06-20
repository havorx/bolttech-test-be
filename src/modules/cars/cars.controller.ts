import { Controller, Get, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { GetCarsQueryDto } from './dto/get-cars.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Get all cars' })
  @Get()
  async getCars(@Query() dto: GetCarsQueryDto) {
    return await this.carsService.getCars(dto);
  }
}
