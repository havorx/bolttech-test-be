import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { BookingRepository } from './booking.repository';
import { CarRepository } from '../cars/car.repository';
import { PricingService } from '../pricing/pricing.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Types } from 'mongoose';
import { parseISO } from 'date-fns';

describe('BookingsService', () => {
  let service: BookingsService;
  let carRepo: jest.Mocked<CarRepository>;

  const carId = new Types.ObjectId();
  const bookingId = new Types.ObjectId();

  const mockDto: CreateBookingDto = {
    email: 'john@example.com',
    carId: carId.toHexString(),
    drivingLicense: 'ABC123',
    drivingLicenseExpiry: '2025-12-31T00:00:00.000Z',
    startDate: '2025-07-01T00:00:00.000Z',
    endDate: '2025-07-03T00:00:00.000Z',
  };

  const mockCar = {
    _id: carId,
    brand: 'Toyota',
    modelName: 'Corolla',
    stock: 1,
    prices: [{ pricingName: 'peak', value: 100 }],
  };

  const mockBooking = {
    _id: bookingId,
    ...mockDto,
    car: carId,
    totalPrice: 200,
    drivingLicenseExpiry: parseISO(mockDto.drivingLicenseExpiry),
    startDate: mockDto.startDate,
    endDate: mockDto.endDate,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: BookingRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(mockBooking),
            findById: jest.fn().mockResolvedValue(mockBooking),
          },
        },
        {
          provide: CarRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue(mockCar),
            decrementStock: jest.fn(),
          },
        },
        {
          provide: PricingService,
          useValue: {
            calculateTotalPrice: jest.fn().mockReturnValue(200),
          },
        },
      ],
    }).compile();

    service = module.get(BookingsService);
    carRepo = module.get(CarRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a booking successfully', async () => {
    const result = await service.create(mockDto);

    expect(result).toEqual({
      message: 'Booking confirmed',
      id: bookingId,
    });
  });

  it('should throw if license expiry is before end date', async () => {
    const invalidDto = {
      ...mockDto,
      drivingLicenseExpiry: '2025-07-02T00:00:00.000Z',
    };

    await expect(service.create(invalidDto)).rejects.toThrow(
      'Driving license must be valid through booking period',
    );
  });

  it('should throw if car is not found or out of stock', async () => {
    carRepo.findById.mockResolvedValueOnce(null);

    await expect(service.create(mockDto)).rejects.toThrow(
      'Selected car model is out of stock',
    );
  });

  it('should find a booking by id', async () => {
    const found = await service.findOne(bookingId.toHexString());
    expect(found).toEqual(mockBooking);
  });
});
