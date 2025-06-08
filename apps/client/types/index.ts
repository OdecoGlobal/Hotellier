import {
  basicInfoSchema,
  completionStepsSchema,
  createHotelApiResponseSchema,
  hotelItemSchema,
  incompleteHotelApiResponseSchema,
} from '@/lib/validator';

import {
  hotelBasicInfoSchema,
  hotelPolicySchema,
  insertCountrySchema,
} from '@hotellier/shared';
import z from 'zod';

export type User = {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'OWNER';
  userName: string;
};
export type AdminOwnerRole = 'ADMIN' | 'OWNER';
export type ApiSessionResponse = {
  data: Session;
};
export type Session = {
  user: User;
  token: string;
};
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type HotelPolicyType = z.infer<typeof hotelPolicySchema>;

export type CompletionSteps = z.infer<typeof completionStepsSchema>;
export type HotelBasicData = z.infer<typeof hotelBasicInfoSchema>;
export type HotelItem = z.infer<typeof hotelItemSchema>;
export type CreateHotelApiResponse = z.infer<
  typeof createHotelApiResponseSchema
>;
export type IncompleteHotelApiResponse = z.infer<
  typeof incompleteHotelApiResponseSchema
>;

export type HotelBasicInfoData = z.infer<typeof hotelBasicInfoSchema>;

export const getCountryData = insertCountrySchema.extend({
  id: z.string(),
});

export type CountryData = z.infer<typeof getCountryData>;
