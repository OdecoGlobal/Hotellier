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
//# sourceMappingURL=validator.d.ts.map