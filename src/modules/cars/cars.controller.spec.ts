import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { GetCarsQueryDto } from './dto/get-cars.dto';

describe('CarsController', () => {
  let controller: CarsController;
  let service: CarsService;

  beforeEach(async () => {
    const mockCarsService = {
      getCars: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: mockCarsService,
        },
      ],
    }).compile();

    controller = module.get<CarsController>(CarsController);
    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCars', () => {
    it('should call service with query params and return result', async () => {
      const query: GetCarsQueryDto = {
        startDate: '2025-06-01',
        endDate: '2025-06-03',
        availableOnly: true,
      };

      const expectedResult = [
        {
          id: '123',
          brand: 'Honda',
          modelName: 'Civic',
          stock: 3,
          totalPrice: 200,
          averagePricePerDay: 100,
        },
      ];

      jest.spyOn(service, 'getCars').mockResolvedValue(expectedResult);

      const result = await controller.getCars(query);

      expect(result).toEqual(expectedResult);
    });
  });
});
