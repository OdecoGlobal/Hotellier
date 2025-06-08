import { z } from 'zod';
import {
  hotelBasicInfoSchema,
  insertCitySchema,
  insertCountrySchema,
  insertStateSchema,
  loginSchema,
  signUpFormSchema,
  userSchema,
} from '../schemas/validator';

export const HOTEL_TYPES = [
  'HOTEL',
  'MOTEL',
  'GUESTHOUSE',
  'INN',
  'APARTMENT',
] as const;
export const CURRENCIES = ['NGN', 'USD', 'EUR', 'GBP'] as const;
export const ROOM_TYPES = [
  'STANDARD',
  'DELUXE',
  'SUITE',
  'FAMILY',
  'EXECUTIVE',
  'PRESIDENTIAL',
] as const;

export const CANCELLATION_FEE_TYPE = [
  'FIRST_NIGHT_PLUS_TAX',
  ' AMOUNT_50',
  'AMOUNT_100',
] as const
export const CANCELLATION_POLICIES = [
  'FREE_CANCELLATION',
  'HOUR_24',
  'HOUR_48',
  'HOUR_72',
  'NO_REFUND',
] as const;
export const PET_POLICIES = [
  'NOT_ALLOWED',
  'ALLOWED_WITH_FEE',
  'ALLOWED_FREE',
] as const;
export const SMOKING_POLICIES = [
  'NO_SMOKING',
  'SMOKING_ALLOWED',
  'DESIGNATED_AREAS',
] as const;
export const PAYMENT_METHODS = [
  'CREDIT_CARD',
  'DEBIT_CARD',
  'CASH',
  'BANK_TRANSFER',
  'DIGITAL_WALLET',
] as const;

export const SELF_CHECK_IN = [
  'ACCESS_CODE',
  'KEY_RETRIVAL_INSTRUCTION',
  'LOCK_BOX',
  'SMART_LOCK_CODE',
  'EXPRESS_CHECKIN',
] as const;

export const DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export const LATE_CHECK_IN_FEE_TYPE = ['FREE', 'SURCHARGE'] as const;

export const SURCHARGE_TYPE = ['AMOUNT', 'PERCENT', 'FEE_VARIES'] as const;
export const PET_SURCHARGE_TYPE = ['PER_PET', 'PER_ACCOMODATION'] as const;
export const PET_FEE_DURATION = [
  ' PER_DAY',
  'PER_NIGHT',
  'PER_STAY',
  'PER_WEEK',
] as const;

export const ALLOWED_PET_TYPE = [
  'ONLY_DOGS',
  'ONLY_CATS',
  'ONLY_DOGS_AND_CATS',
] as const;

export const PET_RESTRICTION_TYPE = [
  'ONLY_SMOKING_ROOMS',
  'ONLY_SPECIFIC_AREAS',
  'CANNOT_BE_LEFT_UNATTENDED',
  'OTHERS',
] as const;

export const PET_FRIENDLY_FEATURES = [
  'FOOD_WATER_BOWL',
  'LITTER_BOX',
  'DOG_EXERCISE_ROOM',
  ' PET_SITTING_SERVICE',
  'PET_GROOMING_SERVICE',
] as const;

export type User = z.infer<typeof userSchema>;
export type signUpInput = z.infer<typeof signUpFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export type CountryData = z.infer<typeof insertCountrySchema>;
export type StateData = z.infer<typeof insertStateSchema>;
export type CityData = z.infer<typeof insertCitySchema>;
