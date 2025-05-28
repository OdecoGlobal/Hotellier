import z from "zod";
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
    description: string;
    state: string;
    lga: string;
    longitude: number;
    latitude: number;
    address: string;
    services: string[];
    locationBrief: string;
    banner?: string | null | undefined;
}, {
    name: string;
    description: string;
    state: string;
    lga: string;
    longitude: number;
    latitude: number;
    address: string;
    services: string[];
    locationBrief: string;
    banner?: string | null | undefined;
}>;
//# sourceMappingURL=validator.d.ts.map