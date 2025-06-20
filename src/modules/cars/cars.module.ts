import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entities/car.entity';
import { CarRepository } from './car.repository';
import { PricingService } from '../pricing/pricing.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  controllers: [CarsController],
  providers: [CarRepository, CarsService, PricingService],
  exports: [MongooseModule, CarRepository],
})
export class CarsModule {}
