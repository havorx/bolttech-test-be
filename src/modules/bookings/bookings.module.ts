import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingRepository } from './booking.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './entities/booking.entity';
import { PricingModule } from '../pricing/pricing.module';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    PricingModule,
    CarsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingRepository, BookingsService],
})
export class BookingsModule {}
