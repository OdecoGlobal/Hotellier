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

export type User = z.infer<typeof userSchema>;
export type signUpInput = z.infer<typeof signUpFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type HotelBasicData = z.infer<typeof hotelBasicInfoSchema>;

export type CountryData = z.infer<typeof insertCountrySchema>;
export type StateData = z.infer<typeof insertStateSchema>;
export type CityData = z.infer<typeof insertCitySchema>;
