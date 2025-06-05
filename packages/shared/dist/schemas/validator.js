"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertRoomSchema = exports.updateHotelServiceTypeSchema = exports.insertHotelServicesTypeSchema = exports.updateHotelSchema = exports.insertHotelSchema = exports.addRoomSchema = exports.hotelPolicySchema = exports.hotelBasicInfoSchema = exports.createHotelSchema = exports.signUpFormSchema = exports.loginSchema = exports.userSchema = exports.signInFormSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signInFormSchema = zod_1.default.object({
    email: zod_1.default.string().email('invalid email address'),
    password: zod_1.default.string().min(6, 'Password must be at least 6 characters'),
});
exports.userSchema = zod_1.default.object({
    id: zod_1.default.string().min(1, 'Id is required'),
    userName: zod_1.default.string().min(3, 'User name must be at least 3 characters'),
    password: zod_1.default.string().min(8, 'Password must be at least 8 digits').optional(),
    passwordConfirm: zod_1.default
        .string()
        .min(8, 'Password must be at least 8 digits')
        .optional(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email('invalid email address'),
    password: zod_1.default.string().min(6, 'Password must be at least 6 characters'),
});
exports.signUpFormSchema = zod_1.default
    .object({
    userName: zod_1.default.string().min(3, 'Name must be at least 3 characters'),
    email: zod_1.default.string().email('invalid email address'),
    password: zod_1.default.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: zod_1.default
        .string()
        .min(6, 'Confirm password must be at least 6 characters'),
})
    .refine(data => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ['confirmPassword'],
});
// HOTELS ZOD SCHEMA
exports.createHotelSchema = zod_1.default.object({
    ownerId: zod_1.default.string().uuid(),
});
exports.hotelBasicInfoSchema = zod_1.default.object({
    name: zod_1.default.string().min(4, 'Hotel Name must be at least 4 characters'),
    address: zod_1.default.string().min(3, 'Address must at least be 3 characters'),
    city: zod_1.default.string().min(3, 'City must be at least 3 characters'),
    state: zod_1.default.string().min(3, 'State must be at least 3 characters'),
    country: zod_1.default.string().min(3, 'Country must be at least 3 characters'),
    zipCode: zod_1.default.string().min(1, 'Zipcode must be at least 1 characters'),
    longitude: zod_1.default.number(),
    latitude: zod_1.default.number(),
    images: zod_1.default.array(zod_1.default.string()).optional(),
});
exports.hotelPolicySchema = zod_1.default.object({
    checkInTime: zod_1.default.string(),
    checkOutTime: zod_1.default.string(),
    lateCheckInFee: zod_1.default.number().optional(),
    earlyCheckoutFee: zod_1.default.number().optional(),
    cancellationPolicy: zod_1.default.enum([
        'FREE_CANCELLATION',
        'MODERATE',
        'STRICT',
        'SUPER_STRICT',
    ]),
    cancellationHours: zod_1.default.number(),
    cancellationFee: zod_1.default.number().optional(),
    childPolicy: zod_1.default.string().optional(),
    petPolicy: zod_1.default.enum(['NOT_ALLOWED', 'ALLOWED_WITH_FEE', 'ALLOWED_FREE']),
    petFee: zod_1.default.number().optional(),
    smokingPolicy: zod_1.default.enum(['NO_SMOKING', 'SMOKING_ALLOWED', 'DESIGNATED_AREAS']),
    paymentMethod: zod_1.default.array(zod_1.default.enum([
        'CREDIT_CARD',
        'DEBIT_CARD',
        'CASH',
        'BANK_TRANSFER',
        'DIGITAL_WALLET',
    ])),
    isDepositRequired: zod_1.default.boolean(),
    depositAmount: zod_1.default.number().optional(),
    additionalPolicy: zod_1.default.any().optional(),
});
exports.addRoomSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, 'Room name must be at least 3 characters'),
    description: zod_1.default.string().optional(),
    roomType: zod_1.default.enum([
        'STANDARD',
        'DELUXE',
        'SUITE',
        'FAMILY',
        'EXECUTIVE',
        'PRESIDENTIAL',
    ]),
    size: zod_1.default.number().optional(),
    maxOccupancy: zod_1.default.number().min(1),
    bedConfigurations: zod_1.default.string(),
    images: zod_1.default.array(zod_1.default.string().url()).optional(),
    totalRooms: zod_1.default.number().min(1).optional().default(1),
    isAvailable: zod_1.default.boolean().optional().default(true),
    basePrice: zod_1.default.number().nonnegative(),
    currency: zod_1.default.string().default('NGN'),
});
exports.insertHotelSchema = zod_1.default.object({
    name: zod_1.default.string().min(4, 'Hotel name must be at least 4 characters'),
    // slug: z.string().min(3, 'Slug must be at least 3 characters'),
    description: zod_1.default.string().min(3, 'Description must be at least 3 characters'),
    // ownerId: z
    //   .string()
    //   .uuid("User id must be valid")
    //   // .min(1, "Owner Id is required"),
    state: zod_1.default.string().min(3, 'State must be at least 3 characters'),
    lga: zod_1.default.string().min(3, 'LGA must be at least 3 characters'),
    longitude: zod_1.default.number(),
    latitude: zod_1.default.number(),
    address: zod_1.default.string().min(3, 'Address must be at least 3 characters'),
    services: zod_1.default.array(zod_1.default.string()).min(1, 'Hotel must have at least one service'),
    locationBrief: zod_1.default
        .string()
        .min(3, 'Location Brief must be at least 3 characters'),
    banner: zod_1.default.string().nullable().optional(),
});
exports.updateHotelSchema = exports.insertHotelSchema.partial().extend({
    slug: zod_1.default.string().min(3, 'Slug must be at least 3 characters').optional(),
});
exports.insertHotelServicesTypeSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, 'Name must be at least 3 characters'),
    questions: zod_1.default
        .string()
        .min(4, 'Queation must be at least 4 characters')
        .array(),
    icon: zod_1.default.string().min(4, 'Icon must be at least 4 characters').optional(),
});
exports.updateHotelServiceTypeSchema = exports.insertHotelServicesTypeSchema.extend({
    id: zod_1.default.string().min(1, 'Id id required'),
});
exports.insertRoomSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, 'Name must be at least 3 characters'),
    category: zod_1.default.string().min(3, 'Category must be at least 3 characters'),
    images: zod_1.default.string().array(),
    roomNumber: zod_1.default.number().min(0, ''),
});
