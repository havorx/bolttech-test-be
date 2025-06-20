import { Injectable } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { GetCarsQueryDto } from './dto/get-cars.dto';
import { parseISO } from 'date-fns';
import { PricingService } from '../pricing/pricing.service';

@Injectable()
export class CarsService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly pricingService: PricingService,
  ) {}

  async getCars(dto: GetCarsQueryDto) {
    const { startDate, endDate, availableOnly } = dto;

    const cars = await this.carRepository.findAll({ availableOnly });

    if (!startDate || !endDate) {
      return cars.map((car) => ({
        brand: car.brand,
        modelName: car.modelName,
        stock: car.stock,
        averagePricePerDay: 0,
        totalPrice: 0,
      }));
    }

    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const res = cars.map((car) => {
      const totalPrice = this.pricingService.calculateTotalPrice(
        start,
        end,
        car.prices,
      );
      const averagePricePerDay =
        this.pricingService.calculateAveragePricePerDay(start, end, car.prices);

      return {
        id: car._id,
        brand: car.brand,
        modelName: car.modelName,
        stock: car.stock,
        averagePricePerDay: averagePricePerDay,
        totalPrice,
      };
    });

    return res;
  }
}
