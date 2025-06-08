"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCitySchema = exports.insertStateSchema = exports.insertCountrySchema = exports.updateHotelServiceTypeSchema = exports.insertHotelServicesTypeSchema = exports.updateHotelSchema = exports.addRoomSchema = exports.baseRoomSchema = exports.hotelPolicySchema = exports.hotelBasicInfoSchema = exports.baseHotelSchema = exports.signUpFormSchema = exports.loginSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const types_1 = require("../types");
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
exports.baseHotelSchema = zod_1.default.object({
    name: zod_1.default.string().min(4, 'Hotel name must be at least 4 characters'),
    address: zod_1.default.string().min(3, 'Address must be at least 3 characters'),
    city: zod_1.default.string().min(3, 'City must be at least 3 characters'),
    state: zod_1.default.string().min(3, 'State must be at least 3 characters'),
    country: zod_1.default.string().min(3, 'Country must be at least 3 characters'),
    zipCode: zod_1.default.string().min(1, 'Zipcode must be at least 1 character'),
    lat: zod_1.default.number(),
    lng: zod_1.default.number(),
    hotelType: zod_1.default.enum(['HOTEL', 'MOTEL', 'GUESTHOUSE', 'INN', 'APARTMENT']),
    roomUnitTotal: zod_1.default.coerce
        .number()
        .min(1, 'There must be at least one room or unit'),
    acceptedCurrency: zod_1.default.enum(['NGN', 'USD', 'EUR', 'GBP']),
});
exports.hotelBasicInfoSchema = exports.baseHotelSchema;
exports.hotelPolicySchema = zod_1.default.object({
    checkInTime: zod_1.default.string(),
    checkOutTime: zod_1.default.string(),
    lateCheckInFee: zod_1.default.number().optional(),
    earlyCheckoutFee: zod_1.default.number().optional(),
    cancellationPolicy: zod_1.default.enum(types_1.CANCELLATION_POLICIES),
    cancellationHours: zod_1.default.number(),
    cancellationFee: zod_1.default.number().optional(),
    childPolicy: zod_1.default.string().optional(),
    petPolicy: zod_1.default.enum(types_1.PET_POLICIES),
    petFee: zod_1.default.number().optional(),
    smokingPolicy: zod_1.default.enum(types_1.SMOKING_POLICIES),
    paymentMethod: zod_1.default.array(zod_1.default.enum(types_1.PAYMENT_METHODS)),
    isDepositRequired: zod_1.default.boolean(),
    depositAmount: zod_1.default.number().optional(),
    additionalPolicy: zod_1.default.any().optional(),
});
exports.baseRoomSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, 'Room name must be at least 3 characters'),
    description: zod_1.default.string().optional(),
    roomType: zod_1.default.enum(types_1.ROOM_TYPES),
    size: zod_1.default.number().optional(),
    maxOccupancy: zod_1.default.number().min(1),
    bedConfigurations: zod_1.default.string(),
    // images: z.array(z.string().url()).optional(),
    totalRooms: zod_1.default.number().min(1).optional().default(1),
    isAvailable: zod_1.default.boolean().optional().default(true),
    basePrice: zod_1.default.number().nonnegative(),
    currency: zod_1.default.string().default('NGN'),
});
exports.addRoomSchema = exports.baseRoomSchema;
exports.updateHotelSchema = exports.baseHotelSchema.partial().extend({
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
exports.insertCountrySchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Country name is required'),
    iso2: zod_1.default.string().min(1, 'iso2 is required'),
    iso3: zod_1.default.string().min(1, 'iso2 is required'),
    phoneCode: zod_1.default.string().optional(),
    capital: zod_1.default.string().optional(),
    currency: zod_1.default.string().optional(),
    currency_name: zod_1.default.string().optional(),
    region: zod_1.default.string().optional(),
    nationality: zod_1.default.string().optional(),
});
exports.insertStateSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'State name is required'),
    country_code: zod_1.default.string().min(1, 'Country code is required'),
    country_name: zod_1.default.string().min(1, 'Country code is required'),
    id: zod_1.default.string().min(1, 'Id is required'),
    state_code: zod_1.default.string().optional(),
});
exports.insertCitySchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'City name is required'),
    id: zod_1.default.string().min(1, 'Id is required'),
    state_code: zod_1.default.string().optional(),
    state_name: zod_1.default.string().optional(),
    state_id: zod_1.default.string().min(1, 'State id is required'),
    country_name: zod_1.default.string().optional(),
});
