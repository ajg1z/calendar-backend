import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false, name: 'IsNumberOrUndefined' })
export class IsNumberOrUndefined implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    if (value === undefined || typeof value === 'number') return true;
    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be undefined or number`;
  }
}
