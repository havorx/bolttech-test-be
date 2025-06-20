import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinDate,
  Validate,
} from 'class-validator';
import { addDays, startOfDay } from 'date-fns';
import { IsAfterStartDateConstraint } from 'src/common/validators/is-end-date-after-start-date-constraint';

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carId: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Matches(/^[A-Z0-9-]+$/, {
    message: 'Driving license must be alphanumeric and may include dashes',
  })
  @Transform(({ value }: { value: string }) => value.trim())
  drivingLicense: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  drivingLicenseExpiry: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: { value: string }) => new Date(value))
  @MinDate(startOfDay(addDays(new Date(), 1)), {
    message: 'startDate must be at least tomorrow',
  })
  startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: { value: string }): Date => new Date(value))
  @Validate(IsAfterStartDateConstraint)
  endDate: string;
}

export class CreateBookingResponseDto {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  message: string;
}
