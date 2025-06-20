import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Types } from 'mongoose';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto and return result', async () => {
      const dto: CreateBookingDto = {
        carId: 'abc123',
        email: 'test@example.com',
        drivingLicense: 'A123456',
        drivingLicenseExpiry: '2025-12-31',
        startDate: '2025-06-01',
        endDate: '2025-06-05',
      };

      const expected = { message: 'Booking confirmed', id: 'booking123' };
      jest.spyOn(service, 'create').mockResolvedValue(expected);

      const result = await controller.create(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('getBooking', () => {
    it('should call service.findOne with id and return result', async () => {
      const bookingId = 'booking123';
      const mockBooking = {
        id: new Types.ObjectId(),
        email: 'john@example.com',
        totalPrice: '250.0',
        car: {
          id: new Types.ObjectId().toString(),
          brand: 'Toyota',
          modelName: 'Camry',
        },
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-07-05'),
        drivingLicense: 'ABC123456',
        drivingLicenseExpiry: new Date('2026-01-01'),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockBooking);

      const result = await controller.getBooking(bookingId);
      expect(result).toEqual(mockBooking);
    });
  });
});
