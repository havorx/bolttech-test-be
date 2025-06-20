import { ApiProperty } from '@nestjs/swagger';
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
  @IsString()
  @IsNotEmpty()
  carId: string;

  @IsEmail()
  email: string;

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

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: { value: string }) => new Date(value))
  @MinDate(startOfDay(addDays(new Date(), 1)), {
    message: 'startDate must be at least tomorrow',
  })
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: { value: string }): Date => new Date(value))
  @Validate(IsAfterStartDateConstraint)
  endDate: string;
}
