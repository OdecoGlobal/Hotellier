import { z } from 'zod';
import { hotelBasicInfoSchema, insertCitySchema, insertCountrySchema, insertStateSchema, loginSchema, signUpFormSchema, userSchema } from '../schemas/validator';
export declare const HOTEL_TYPES: readonly ["HOTEL", "MOTEL", "GUESTHOUSE", "INN", "APARTMENT"];
export declare const CURRENCIES: readonly ["NGN", "USD", "EUR", "GBP"];
export declare const ROOM_TYPES: readonly ["STANDARD", "DELUXE", "SUITE", "FAMILY", "EXECUTIVE", "PRESIDENTIAL"];
export declare const CANCELLATION_POLICIES: readonly ["FREE_CANCELLATION", "MODERATE", "STRICT", "SUPER_STRICT"];
export declare const PET_POLICIES: readonly ["NOT_ALLOWED", "ALLOWED_WITH_FEE", "ALLOWED_FREE"];
export declare const SMOKING_POLICIES: readonly ["NO_SMOKING", "SMOKING_ALLOWED", "DESIGNATED_AREAS"];
export declare const PAYMENT_METHODS: readonly ["CREDIT_CARD", "DEBIT_CARD", "CASH", "BANK_TRANSFER", "DIGITAL_WALLET"];
export type User = z.infer<typeof userSchema>;
export type signUpInput = z.infer<typeof signUpFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type HotelBasicData = z.infer<typeof hotelBasicInfoSchema>;
export type CountryData = z.infer<typeof insertCountrySchema>;
export type StateData = z.infer<typeof insertStateSchema>;
export type CityData = z.infer<typeof insertCitySchema>;
//# sourceMappingURL=index.d.ts.map