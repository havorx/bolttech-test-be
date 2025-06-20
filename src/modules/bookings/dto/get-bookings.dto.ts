import { ApiResponseProperty } from '@nestjs/swagger';

class Car {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  brand: string;

  @ApiResponseProperty()
  modelName: string;
}

export class GetBookingResponseDto {
  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  car: Car;

  @ApiResponseProperty()
  startDate: string;

  @ApiResponseProperty()
  endDate: string;

  @ApiResponseProperty()
  totalPrice: number;
}
