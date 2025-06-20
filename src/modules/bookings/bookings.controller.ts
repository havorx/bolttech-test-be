import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import {
  CreateBookingDto,
  CreateBookingResponseDto,
} from './dto/create-booking.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetBookingResponseDto } from './dto/get-bookings.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Create car booking' })
  @ApiResponse({ type: CreateBookingResponseDto, status: 200 })
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingsService.create(createBookingDto);
  }

  @ApiOperation({ summary: 'Get a booking by id' })
  @ApiResponse({ type: GetBookingResponseDto })
  @Get(':id')
  async getBooking(@Param('id') id: string) {
    return await this.bookingsService.findOne(id);
  }
}
