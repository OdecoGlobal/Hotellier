import z from 'zod';
export declare const signInFormSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
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
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const signUpFormSchema: z.ZodEffects<z.ZodObject<{
    userName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    userName: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    userName: string;
    confirmPassword: string;
}>, {
    email: string;
    password: string;
    userName: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    userName: string;
    confirmPassword: string;
}>;
export declare const createHotelSchema: z.ZodObject<{
    ownerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ownerId: string;
}, {
    ownerId: string;
}>;
export declare const hotelBasicInfoSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    zipCode: z.ZodString;
    lng: z.ZodNumber;
    lat: z.ZodNumber;
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
    lng: number;
    lat: number;
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
    lng: number;
    lat: number;
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
export declare const insertHotelSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    state: z.ZodString;
    lga: z.ZodString;
    longitude: z.ZodNumber;
    latitude: z.ZodNumber;
    address: z.ZodString;
    services: z.ZodArray<z.ZodString, "many">;
    locationBrief: z.ZodString;
    banner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    address: string;
    state: string;
    description: string;
    lga: string;
    longitude: number;
    latitude: number;
    services: string[];
    locationBrief: string;
    banner?: string | null | undefined;
}, {
    name: string;
    address: string;
    state: string;
    description: string;
    lga: string;
    longitude: number;
    latitude: number;
    services: string[];
    locationBrief: string;
    banner?: string | null | undefined;
}>;
export declare const updateHotelSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    lga: z.ZodOptional<z.ZodString>;
    longitude: z.ZodOptional<z.ZodNumber>;
    latitude: z.ZodOptional<z.ZodNumber>;
    address: z.ZodOptional<z.ZodString>;
    services: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    locationBrief: z.ZodOptional<z.ZodString>;
    banner: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
} & {
    slug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    address?: string | undefined;
    state?: string | undefined;
    description?: string | undefined;
    lga?: string | undefined;
    longitude?: number | undefined;
    latitude?: number | undefined;
    services?: string[] | undefined;
    locationBrief?: string | undefined;
    banner?: string | null | undefined;
    slug?: string | undefined;
}, {
    name?: string | undefined;
    address?: string | undefined;
    state?: string | undefined;
    description?: string | undefined;
    lga?: string | undefined;
    longitude?: number | undefined;
    latitude?: number | undefined;
    services?: string[] | undefined;
    locationBrief?: string | undefined;
    banner?: string | null | undefined;
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
export declare const insertRoomSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodString;
    images: z.ZodArray<z.ZodString, "many">;
    roomNumber: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    category: string;
    images: string[];
    roomNumber: number;
}, {
    name: string;
    category: string;
    images: string[];
    roomNumber: number;
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