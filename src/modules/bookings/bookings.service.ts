import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingRepository } from './booking.repository';
import { CarRepository } from '../cars/car.repository';
import { PricingService } from '../pricing/pricing.service';
import { parseISO } from 'date-fns';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly carRepository: CarRepository,
    private readonly pricingService: PricingService,
  ) {}

  async create(dto: CreateBookingDto) {
    const {
      email,
      carId,
      startDate,
      endDate,
      drivingLicense,
      drivingLicenseExpiry,
    } = dto;

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const licenseExpiry = parseISO(drivingLicenseExpiry);

    if (licenseExpiry < end) {
      throw new BadRequestException(
        'Driving license must be valid through booking period',
      );
    }

    try {
      const car = await this.carRepository.findById(carId);

      if (!car || car.stock <= 0) {
        throw new NotFoundException('Selected car model is out of stock');
      }

      const totalPrice = this.pricingService.calculateTotalPrice(
        start,
        end,
        car.prices,
      );

      const booking = await this.bookingRepository.create({
        email,
        car: carId,
        drivingLicense,
        drivingLicenseExpiry: licenseExpiry,
        startDate: start,
        endDate: end,
        totalPrice,
      });

      await this.carRepository.decrementStock(carId);

      return { message: 'Booking confirmed', id: booking._id };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all bookings`;
  }

  async findOne(id: string) {
    return await this.bookingRepository.findById(id);
  }
}
