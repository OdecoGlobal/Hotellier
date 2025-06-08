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

export const CANCELLATION_POLICIES = [
  'FREE_CANCELLATION',
  'MODERATE',
  'STRICT',
  'SUPER_STRICT',
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

export type User = z.infer<typeof userSchema>;
export type signUpInput = z.infer<typeof signUpFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type HotelBasicData = z.infer<typeof hotelBasicInfoSchema>;

export type CountryData = z.infer<typeof insertCountrySchema>;
export type StateData = z.infer<typeof insertStateSchema>;
export type CityData = z.infer<typeof insertCitySchema>;
