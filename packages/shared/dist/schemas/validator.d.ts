import z from 'zod';
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    userName: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
    passwordConfirm: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    userName: string;
    password?: string | undefined;
    passwordConfirm?: string | undefined;
}, {
    id: string;
    userName: string;
    password?: string | undefined;
    passwordConfirm?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export declare const signUpFormSchema: z.ZodEffects<z.ZodObject<{
    userName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
    password: string;
    email: string;
    confirmPassword: string;
}, {
    userName: string;
    password: string;
    email: string;
    confirmPassword: string;
}>, {
    userName: string;
    password: string;
    email: string;
    confirmPassword: string;
}, {
    userName: string;
    password: string;
    email: string;
    confirmPassword: string;
}>;
export declare const baseHotelSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    zipCode: z.ZodString;
    lat: z.ZodNumber;
    lng: z.ZodNumber;
    hotelType: z.ZodEnum<["HOTEL", "MOTEL", "GUESTHOUSE", "INN", "APARTMENT"]>;
    roomUnitTotal: z.ZodNumber;
    acceptedCurrency: z.ZodEnum<["NGN", "USD", "EUR", "GBP"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    lat: number;
    lng: number;
    hotelType: "HOTEL" | "MOTEL" | "GUESTHOUSE" | "INN" | "APARTMENT";
    roomUnitTotal: number;
    acceptedCurrency: "NGN" | "USD" | "EUR" | "GBP";
}, {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    lat: number;
    lng: number;
    hotelType: "HOTEL" | "MOTEL" | "GUESTHOUSE" | "INN" | "APARTMENT";
    roomUnitTotal: number;
    acceptedCurrency: "NGN" | "USD" | "EUR" | "GBP";
}>;
export declare const hotelBasicInfoSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    zipCode: z.ZodString;
    lat: z.ZodNumber;
    lng: z.ZodNumber;
    hotelType: z.ZodEnum<["HOTEL", "MOTEL", "GUESTHOUSE", "INN", "APARTMENT"]>;
    roomUnitTotal: z.ZodNumber;
    acceptedCurrency: z.ZodEnum<["NGN", "USD", "EUR", "GBP"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    lat: number;
    lng: number;
    hotelType: "HOTEL" | "MOTEL" | "GUESTHOUSE" | "INN" | "APARTMENT";
    roomUnitTotal: number;
    acceptedCurrency: "NGN" | "USD" | "EUR" | "GBP";
}, {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    lat: number;
    lng: number;
    hotelType: "HOTEL" | "MOTEL" | "GUESTHOUSE" | "INN" | "APARTMENT";
    roomUnitTotal: number;
    acceptedCurrency: "NGN" | "USD" | "EUR" | "GBP";
}>;
export declare const hotelPolicySchema: z.ZodObject<{
    checkInTime: z.ZodString;
    checkOutTime: z.ZodString;
    lateCheckInFee: z.ZodOptional<z.ZodNumber>;
    earlyCheckoutFee: z.ZodOptional<z.ZodNumber>;
    cancellationPolicy: z.ZodEnum<["FREE_CANCELLATION", "MODERATE", "STRICT", "SUPER_STRICT"]>;
    cancellationHours: z.ZodNumber;
    cancellationFee: z.ZodOptional<z.ZodNumber>;
    childPolicy: z.ZodOptional<z.ZodString>;
    petPolicy: z.ZodEnum<["NOT_ALLOWED", "ALLOWED_WITH_FEE", "ALLOWED_FREE"]>;
    petFee: z.ZodOptional<z.ZodNumber>;
    smokingPolicy: z.ZodEnum<["NO_SMOKING", "SMOKING_ALLOWED", "DESIGNATED_AREAS"]>;
    paymentMethod: z.ZodArray<z.ZodEnum<["CREDIT_CARD", "DEBIT_CARD", "CASH", "BANK_TRANSFER", "DIGITAL_WALLET"]>, "many">;
    isDepositRequired: z.ZodBoolean;
    depositAmount: z.ZodOptional<z.ZodNumber>;
    additionalPolicy: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: "FREE_CANCELLATION" | "MODERATE" | "STRICT" | "SUPER_STRICT";
    cancellationHours: number;
    petPolicy: "NOT_ALLOWED" | "ALLOWED_WITH_FEE" | "ALLOWED_FREE";
    smokingPolicy: "NO_SMOKING" | "SMOKING_ALLOWED" | "DESIGNATED_AREAS";
    paymentMethod: ("CREDIT_CARD" | "DEBIT_CARD" | "CASH" | "BANK_TRANSFER" | "DIGITAL_WALLET")[];
    isDepositRequired: boolean;
    lateCheckInFee?: number | undefined;
    earlyCheckoutFee?: number | undefined;
    cancellationFee?: number | undefined;
    childPolicy?: string | undefined;
    petFee?: number | undefined;
    depositAmount?: number | undefined;
    additionalPolicy?: any;
}, {
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: "FREE_CANCELLATION" | "MODERATE" | "STRICT" | "SUPER_STRICT";
    cancellationHours: number;
    petPolicy: "NOT_ALLOWED" | "ALLOWED_WITH_FEE" | "ALLOWED_FREE";
    smokingPolicy: "NO_SMOKING" | "SMOKING_ALLOWED" | "DESIGNATED_AREAS";
    paymentMethod: ("CREDIT_CARD" | "DEBIT_CARD" | "CASH" | "BANK_TRANSFER" | "DIGITAL_WALLET")[];
    isDepositRequired: boolean;
    lateCheckInFee?: number | undefined;
    earlyCheckoutFee?: number | undefined;
    cancellationFee?: number | undefined;
    childPolicy?: string | undefined;
    petFee?: number | undefined;
    depositAmount?: number | undefined;
    additionalPolicy?: any;
}>;
export declare const baseRoomSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    roomType: z.ZodEnum<["STANDARD", "DELUXE", "SUITE", "FAMILY", "EXECUTIVE", "PRESIDENTIAL"]>;
    size: z.ZodOptional<z.ZodNumber>;
    maxOccupancy: z.ZodNumber;
    bedConfigurations: z.ZodString;
    totalRooms: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    isAvailable: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    basePrice: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    roomType: "STANDARD" | "DELUXE" | "SUITE" | "FAMILY" | "EXECUTIVE" | "PRESIDENTIAL";
    maxOccupancy: number;
    bedConfigurations: string;
    totalRooms: number;
    isAvailable: boolean;
    basePrice: number;
    currency: string;
    description?: string | undefined;
    size?: number | undefined;
}, {
    name: string;
    roomType: "STANDARD" | "DELUXE" | "SUITE" | "FAMILY" | "EXECUTIVE" | "PRESIDENTIAL";
    maxOccupancy: number;
    bedConfigurations: string;
    basePrice: number;
    description?: string | undefined;
    size?: number | undefined;
    totalRooms?: number | undefined;
    isAvailable?: boolean | undefined;
    currency?: string | undefined;
}>;
export declare const addRoomSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    roomType: z.ZodEnum<["STANDARD", "DELUXE", "SUITE", "FAMILY", "EXECUTIVE", "PRESIDENTIAL"]>;
    size: z.ZodOptional<z.ZodNumber>;
    maxOccupancy: z.ZodNumber;
    bedConfigurations: z.ZodString;
    totalRooms: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    isAvailable: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    basePrice: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    roomType: "STANDARD" | "DELUXE" | "SUITE" | "FAMILY" | "EXECUTIVE" | "PRESIDENTIAL";
    maxOccupancy: number;
    bedConfigurations: string;
    totalRooms: number;
    isAvailable: boolean;
    basePrice: number;
    currency: string;
    description?: string | undefined;
    size?: number | undefined;
}, {
    name: string;
    roomType: "STANDARD" | "DELUXE" | "SUITE" | "FAMILY" | "EXECUTIVE" | "PRESIDENTIAL";
    maxOccupancy: number;
    bedConfigurations: string;
    basePrice: number;
    description?: string | undefined;
    size?: number | undefined;
    totalRooms?: number | undefined;
    isAvailable?: boolean | undefined;
    currency?: string | undefined;
}>;
export declare const updateHotelSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    zipCode: z.ZodOptional<z.ZodString>;
    lat: z.ZodOptional<z.ZodNumber>;
    lng: z.ZodOptional<z.ZodNumber>;
    hotelType: z.ZodOptional<z.ZodEnum<["HOTEL", "MOTEL", "GUESTHOUSE", "INN", "APARTMENT"]>>;
    roomUnitTotal: z.ZodOptional<z.ZodNumber>;
    acceptedCurrency: z.ZodOptional<z.ZodEnum<["NGN", "USD", "EUR", "GBP"]>>;
} & {
    slug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
    zipCode?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    hotelType?: "HOTEL" | "MOTEL" | "GUESTHOUSE" | "INN" | "APARTMENT" | undefined;
    roomUnitTotal?: number | undefined;
    acceptedCurrency?: "NGN" | "USD" | "EUR" | "GBP" | undefined;
    slug?: string | undefined;
}, {
    name?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
    zipCode?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    hotelType?: "HOTEL" | "MOTEL" | "GUESTHOUSE" | "INN" | "APARTMENT" | undefined;
    roomUnitTotal?: number | undefined;
    acceptedCurrency?: "NGN" | "USD" | "EUR" | "GBP" | undefined;
    slug?: string | undefined;
}>;
export declare const insertHotelServicesTypeSchema: z.ZodObject<{
    name: z.ZodString;
    questions: z.ZodArray<z.ZodString, "many">;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    questions: string[];
    icon?: string | undefined;
}, {
    name: string;
    questions: string[];
    icon?: string | undefined;
}>;
export declare const updateHotelServiceTypeSchema: z.ZodObject<{
    name: z.ZodString;
    questions: z.ZodArray<z.ZodString, "many">;
    icon: z.ZodOptional<z.ZodString>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    questions: string[];
    icon?: string | undefined;
}, {
    id: string;
    name: string;
    questions: string[];
    icon?: string | undefined;
}>;
export declare const insertCountrySchema: z.ZodObject<{
    name: z.ZodString;
    iso2: z.ZodString;
    iso3: z.ZodString;
    phoneCode: z.ZodOptional<z.ZodString>;
    capital: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodString>;
    currency_name: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    nationality: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    iso2: string;
    iso3: string;
    currency?: string | undefined;
    phoneCode?: string | undefined;
    capital?: string | undefined;
    currency_name?: string | undefined;
    region?: string | undefined;
    nationality?: string | undefined;
}, {
    name: string;
    iso2: string;
    iso3: string;
    currency?: string | undefined;
    phoneCode?: string | undefined;
    capital?: string | undefined;
    currency_name?: string | undefined;
    region?: string | undefined;
    nationality?: string | undefined;
}>;
export declare const insertStateSchema: z.ZodObject<{
    name: z.ZodString;
    country_code: z.ZodString;
    country_name: z.ZodString;
    id: z.ZodString;
    state_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    country_code: string;
    country_name: string;
    state_code?: string | undefined;
}, {
    id: string;
    name: string;
    country_code: string;
    country_name: string;
    state_code?: string | undefined;
}>;
export declare const insertCitySchema: z.ZodObject<{
    name: z.ZodString;
    id: z.ZodString;
    state_code: z.ZodOptional<z.ZodString>;
    state_name: z.ZodOptional<z.ZodString>;
    state_id: z.ZodString;
    country_name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    state_id: string;
    country_name?: string | undefined;
    state_code?: string | undefined;
    state_name?: string | undefined;
}, {
    id: string;
    name: string;
    state_id: string;
    country_name?: string | undefined;
    state_code?: string | undefined;
    state_name?: string | undefined;
}>;
//# sourceMappingURL=validator.d.ts.map