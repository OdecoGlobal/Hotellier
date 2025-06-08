import { baseHotelSchema, hotelBasicInfoSchema } from '@hotellier/shared';
import { z } from 'zod';

export const hotelBasicInfoStepOneSchema = hotelBasicInfoSchema.pick({
  name: true,
  hotelType: true,
  roomUnitTotal: true,
  acceptedCurrency: true,
});

export const hotelBasicInfoStepTwoSchema = hotelBasicInfoSchema.pick({
  address: true,
  city: true,
  state: true,
  country: true,
  zipCode: true,
});
export const hotelBasicInfoStepThreeSchema = hotelBasicInfoSchema.pick({
  lng: true,
  lat: true,
});

export const completionStepsSchema = z.object({
  step4_rooms: z.boolean(),
  step5_rates: z.boolean(),
  step2_policies: z.boolean(),
  step6_amenities: z.boolean(),
  step1_basic_info: z.boolean(),
  step3_hotel_images: z.boolean(),
});

export const basicInfoSchema = baseHotelSchema.extend({
  id: z.string().uuid(),
  hotelId: z.string().uuid(),
  slug: z.string(),
  rating: z.string(),
  isCompleted: z.boolean(),
  completedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const hotelItemSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum(['IN_PROGRESS']),
  completionSteps: completionStepsSchema,
  currentStep: z.number(),
  totalSteps: z.number(),
  isFullyCompleted: z.boolean(),
  ownerId: z.string().uuid(),
  basicInfo: basicInfoSchema,
});

export const createHotelApiResponseSchema = z.object({
  status: z.enum(['success', 'error', 'fail']),
  data: z.object({
    hotel: hotelItemSchema.omit({ basicInfo: true }),
    basicInfoData: basicInfoSchema,
  }),
});
export const incompleteHotelApiResponseSchema = z.object({
  status: z.enum(['success', 'error', 'fail']),
  data: z.array(hotelItemSchema),
});
