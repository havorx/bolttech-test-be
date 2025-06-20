import {
  isDate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsAfterStartDate', async: false })
export class IsAfterStartDateConstraint
  implements ValidatorConstraintInterface
{
  validate(endDate: Date, args: ValidationArguments): boolean {
    const obj = args.object as { startDate: string; endDate: string };

    if (!isDate(endDate) || !isDate(obj.startDate)) return false;

    return endDate > obj.startDate;
  }

  defaultMessage(): string {
    return 'endDate must be after startDate';
  }
}
