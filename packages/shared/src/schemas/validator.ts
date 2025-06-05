import z from 'zod';

export const signInFormSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

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
export const createHotelSchema = z.object({
  ownerId: z.string().uuid(),
});

export const hotelBasicInfoSchema = z.object({
  name: z.string().min(4, 'Hotel Name must be at least 4 characters'),
  address: z.string().min(3, 'Address must at least be 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  state: z.string().min(3, 'State must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  zipCode: z.string().min(1, 'Zipcode must be at least 1 characters'),
  longitude: z.number(),
  latitude: z.number(),
  images: z.array(z.string()).optional(),
});

export const hotelPolicySchema = z.object({
  checkInTime: z.string(),
  checkOutTime: z.string(),
  lateCheckInFee: z.number().optional(),
  earlyCheckoutFee: z.number().optional(),
  cancellationPolicy: z.enum([
    'FREE_CANCELLATION',
    'MODERATE',
    'STRICT',
    'SUPER_STRICT',
  ]),
  cancellationHours: z.number(),
  cancellationFee: z.number().optional(),
  childPolicy: z.string().optional(),
  petPolicy: z.enum(['NOT_ALLOWED', 'ALLOWED_WITH_FEE', 'ALLOWED_FREE']),
  petFee: z.number().optional(),
  smokingPolicy: z.enum(['NO_SMOKING', 'SMOKING_ALLOWED', 'DESIGNATED_AREAS']),
  paymentMethod: z.array(
    z.enum([
      'CREDIT_CARD',
      'DEBIT_CARD',
      'CASH',
      'BANK_TRANSFER',
      'DIGITAL_WALLET',
    ])
  ),
  isDepositRequired: z.boolean(),
  depositAmount: z.number().optional(),
  additionalPolicy: z.any().optional(),
});

export const addRoomSchema = z.object({
  name: z.string().min(3, 'Room name must be at least 3 characters'),
  description: z.string().optional(),
  roomType: z.enum([
    'STANDARD',
    'DELUXE',
    'SUITE',
    'FAMILY',
    'EXECUTIVE',
    'PRESIDENTIAL',
  ]),
  size: z.number().optional(),
  maxOccupancy: z.number().min(1),
  bedConfigurations: z.string(),
  images: z.array(z.string().url()).optional(),
  totalRooms: z.number().min(1).optional().default(1),
  isAvailable: z.boolean().optional().default(true),

  basePrice: z.number().nonnegative(),
  currency: z.string().default('NGN'),
});

export const insertHotelSchema = z.object({
  name: z.string().min(4, 'Hotel name must be at least 4 characters'),
  // slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  // ownerId: z
  //   .string()
  //   .uuid("User id must be valid")
  //   // .min(1, "Owner Id is required"),
  state: z.string().min(3, 'State must be at least 3 characters'),
  lga: z.string().min(3, 'LGA must be at least 3 characters'),
  longitude: z.number(),
  latitude: z.number(),
  address: z.string().min(3, 'Address must be at least 3 characters'),
  services: z.array(z.string()).min(1, 'Hotel must have at least one service'),
  locationBrief: z
    .string()
    .min(3, 'Location Brief must be at least 3 characters'),
  banner: z.string().nullable().optional(),
});

export const updateHotelSchema = insertHotelSchema.partial().extend({
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
export const insertRoomSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  images: z.string().array(),
  roomNumber: z.number().min(0, ''),
});
