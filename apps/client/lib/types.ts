import {
  hotelBasicInfoSchema,
  insertCitySchema,
  insertCountrySchema,
  insertStateSchema,
} from '@hotellier/shared';
import { z } from 'zod';

export type HotelBasicInfoData = z.infer<typeof hotelBasicInfoSchema>;
export const getCountryData = insertCountrySchema.extend({
  id: z.string(),
});

export type CountryData = z.infer<typeof getCountryData>;
export type StateData = z.infer<typeof insertStateSchema>;
export type CityData = z.infer<typeof insertCitySchema>;
