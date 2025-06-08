import {
  basicInfoSchema,
  completionStepsSchema,
  createHotelApiResponseSchema,
  hotelItemSchema,
  incompleteHotelApiResponseSchema,
} from '@/lib/validator';
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

export type CompletionSteps = z.infer<typeof completionStepsSchema>;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type HotelItem = z.infer<typeof hotelItemSchema>;
export type CreateHotelApiResponse = z.infer<
  typeof createHotelApiResponseSchema
>;
export type IncompleteHotelApiResponse = z.infer<
  typeof incompleteHotelApiResponseSchema
>;
