import { Controller, Get, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { GetCarsQueryDto, GetCarsResponseDto } from './dto/get-cars.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ type: GetCarsResponseDto, isArray: true, status: 200 })
  @Get()
  async getCars(@Query() dto: GetCarsQueryDto) {
    return await this.carsService.getCars(dto);
  }
}
