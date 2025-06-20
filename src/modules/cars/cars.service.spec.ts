import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { CarRepository } from './car.repository';
import { PricingService } from '../pricing/pricing.service';
import { Types } from 'mongoose';
import { Car } from './entities/car.entity';

const mockCar = {
  _id: new Types.ObjectId(),
  brand: 'Honda',
  modelName: 'Civic',
  stock: 5,
  prices: [
    {
      pricingName: 'mid',
      value: {
        _bsontype: 'Decimal128',
        toString: () => '100',
      },
    },
  ],
} as Car & { _id: Types.ObjectId };

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: CarRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockCar]),
          },
        },
        {
          provide: PricingService,
          useValue: {
            calculateTotalPrice: jest.fn().mockReturnValue(100),
            calculateAveragePricePerDay: jest.fn().mockReturnValue(100),
          },
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cars with pricing', async () => {
    const result = await service.getCars({
      startDate: '2025-06-01',
      endDate: '2025-06-03',
      availableOnly: true,
    });

    expect(result[0].brand).toBe('Honda');
    expect(result[0].totalPrice).toBe(100);
    expect(result[0].averagePricePerDay).toBe(100);
  });

  it('should return cars with zero prices when no date range provided', async () => {
    const result = await service.getCars({
      startDate: '',
      endDate: '',
      availableOnly: false,
    });

    expect(result[0].totalPrice).toBe(0);
    expect(result[0].averagePricePerDay).toBe(0);
  });
});
