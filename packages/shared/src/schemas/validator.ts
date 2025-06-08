import z from 'zod';
import {
  ALLOWED_PET_TYPE,
  CANCELLATION_FEE_TYPE,
  CANCELLATION_POLICIES,
  CURRENCIES,
  DAYS,
  HOTEL_TYPES,
  LATE_CHECK_IN_FEE_TYPE,
  PAYMENT_METHODS,
  PET_FEE_DURATION,
  PET_FRIENDLY_FEATURES,
  PET_POLICIES,
  PET_RESTRICTION_TYPE,
  PET_SURCHARGE_TYPE,
  ROOM_TYPES,
  SELF_CHECK_IN,
  SMOKING_POLICIES,
  SURCHARGE_TYPE,
} from '../types';

export const userSchema = z.object({
  id: z.string().min(1, 'Id is required'),
  userName: z.string().min(3, 'User name must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 digits').optional(),
  passwordConfirm: z
    .string()
    .min(8, 'Password must be at least 8 digits')
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export const signUpFormSchema = z
  .object({
    userName: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ['confirmPassword'],
  });

// HOTELS ZOD SCHEMA

export const baseHotelSchema = z.object({
  name: z.string().min(4, 'Hotel name must be at least 4 characters'),
  address: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  state: z.string().min(3, 'State must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  zipCode: z.string().min(1, 'Zipcode must be at least 1 character'),
  lat: z.number(),
  lng: z.number(),
  hotelType: z.enum(['HOTEL', 'MOTEL', 'GUESTHOUSE', 'INN', 'APARTMENT']),
  roomUnitTotal: z.coerce
    .number()
    .min(1, 'There must be at least one room or unit'),
  acceptedCurrency: z.enum(['NGN', 'USD', 'EUR', 'GBP']),
});

export const hotelBasicInfoSchema = baseHotelSchema;

export const hotelPolicySchema = z.object({
  
  paymentMethod: z.array(z.enum(PAYMENT_METHODS)),
  isDepositRequired: z.boolean(),
  depositAmount: z.number().optional(),
  isTaxIncludedInRoomRates: z.boolean(),
  cancellationPolicy: z.enum(CANCELLATION_POLICIES),
  cancellationFeeType: z.enum(CANCELLATION_FEE_TYPE),
  smokingPolicy: z.enum(SMOKING_POLICIES),
  additionalPolicy: z.any().optional(),

  isFrontDesk: z.boolean(),
  frontDeskScheduleDays: z.array(z.enum(DAYS)).optional(),
  frontDeskStartTime: z.string().optional(),
  frontDeskEndTime: z.string().optional(),
  isSelfCheckIn: z.boolean(),
  selfCheckInType: z.enum(SELF_CHECK_IN),
  checkInStartTime: z.string(),
  checkInEndTime: z.string(),
  isLateCheckIn: z.boolean().optional(),
  lateCheckInType: z.enum(LATE_CHECK_IN_FEE_TYPE).optional(),
  surchargeType: z.enum(SURCHARGE_TYPE).optional(),
  surchargeAmount: z.number().optional(),
  surchargePercent: z.number().optional(),
  lateCheckInStartTime: z.string().optional(),
  lateCheckInEndTime: z.string().optional(),
  isAdvancedNoticeCheckIn: z.boolean().optional(),
  advanceNoticeCheckInTime: z.string().optional(),
  checkOutTime: z.string(),
  minCheckInAgeAllowed: z.number().optional(),

  isPetAllowed: z.boolean(),
  isPetSurcharged: z.boolean().optional(),
  petSurchargeAmount: z.number().optional(),
  petSurchargeType: z.enum(PET_SURCHARGE_TYPE).optional(),
  petSurchargeDuration: z.enum(PET_FEE_DURATION).optional(),
  isMaxFeePerStay: z.boolean().optional(),
  maxFeePerStayAmount: z.number().optional(),
  isPetFeeVaried: z.boolean().optional(),
  allowedPetType: z.enum(ALLOWED_PET_TYPE).optional(),
  isPetRestricted: z.boolean().optional(),
  petRestrictionType: z.array(z.enum(PET_RESTRICTION_TYPE)).optional(),
  isMaxWeightPerPet: z.boolean().optional(),
  petMaxWeight: z.number().optional(),
  isPetDeposit: z.boolean().optional(),
  petDepositType: z.enum(PET_FEE_DURATION).optional(),
  petDepositAmount: z.number().optional(),
  isPetCleaningFee: z.boolean().optional(),
  petCleaningFee: z.number().optional(),
  petFriendlyFeatures: z.array(z.enum(PET_FRIENDLY_FEATURES)).optional(),
});

export const baseRoomSchema = z.object({
  name: z.string().min(3, 'Room name must be at least 3 characters'),
  description: z.string().optional(),
  roomType: z.enum(ROOM_TYPES),
  size: z.number().optional(),
  maxOccupancy: z.number().min(1),
  bedConfigurations: z.string(),
  // images: z.array(z.string().url()).optional(),
  totalRooms: z.number().min(1).optional().default(1),
  isAvailable: z.boolean().optional().default(true),

  basePrice: z.number().nonnegative(),
  currency: z.string().default('NGN'),
});

export const addRoomSchema = baseRoomSchema;

export const updateHotelSchema = baseHotelSchema.partial().extend({
  slug: z.string().min(3, 'Slug must be at least 3 characters').optional(),
});

export const insertHotelServicesTypeSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  questions: z
    .string()
    .min(4, 'Queation must be at least 4 characters')
    .array(),
  icon: z.string().min(4, 'Icon must be at least 4 characters').optional(),
});
export const updateHotelServiceTypeSchema =
  insertHotelServicesTypeSchema.extend({
    id: z.string().min(1, 'Id id required'),
  });

export const insertCountrySchema = z.object({
  name: z.string().min(1, 'Country name is required'),
  iso2: z.string().min(1, 'iso2 is required'),
  iso3: z.string().min(1, 'iso2 is required'),
  phoneCode: z.string().optional(),
  capital: z.string().optional(),
  currency: z.string().optional(),
  currency_name: z.string().optional(),
  region: z.string().optional(),
  nationality: z.string().optional(),
});

export const insertStateSchema = z.object({
  name: z.string().min(1, 'State name is required'),
  country_code: z.string().min(1, 'Country code is required'),
  country_name: z.string().min(1, 'Country code is required'),
  id: z.string().min(1, 'Id is required'),
  state_code: z.string().optional(),
});

export const insertCitySchema = z.object({
  name: z.string().min(1, 'City name is required'),
  id: z.string().min(1, 'Id is required'),
  state_code: z.string().optional(),
  state_name: z.string().optional(),
  state_id: z.string().min(1, 'State id is required'),
  country_name: z.string().optional(),
});
