import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, Validate } from 'class-validator';
import { IsAfterStartDateConstraint } from 'src/common/validators/is-end-date-after-start-date-constraint';

export class GetCarsQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  @Validate(IsAfterStartDateConstraint)
  endDate?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => value === 'true')
  availableOnly?: boolean;
}

export class GetCarsResponseDto {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  brand: string;

  @ApiResponseProperty()
  modelName: string;

  @ApiResponseProperty()
  stock: number;

  @ApiResponseProperty()
  averagePricePerDay: number;

  @ApiResponseProperty()
  totalPrice: number;
}
