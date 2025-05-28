"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertHotelSchema = exports.signUpFormSchema = exports.loginSchema = exports.userSchema = exports.signInFormSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signInFormSchema = zod_1.default.object({
    email: zod_1.default.string().email("invalid email address"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters"),
});
exports.userSchema = zod_1.default.object({
    id: zod_1.default.string().min(1, "Id is required"),
    userName: zod_1.default.string().min(3, "User name must be at least 3 characters"),
    password: zod_1.default.string().min(8, "Password must be at least 8 digits").optional(),
    passwordConfirm: zod_1.default
        .string()
        .min(8, "Password must be at least 8 digits")
        .optional(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email("invalid email address"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters"),
});
exports.signUpFormSchema = zod_1.default
    .object({
    userName: zod_1.default.string().min(3, "Name must be at least 3 characters"),
    email: zod_1.default.string().email("invalid email address"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: zod_1.default
        .string()
        .min(6, "Confirm password must be at least 6 characters"),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"],
});
exports.insertHotelSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, "Name must be at least 3 characters"),
    // slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: zod_1.default.string().min(3, "Description must be at least 3 characters"),
    // ownerId: z
    //   .string()
    //   .uuid("User id must be valid")
    //   // .min(1, "Owner Id is required"),
    state: zod_1.default.string().min(3, "State must be at least 3 characters"),
    lga: zod_1.default.string().min(3, "LGA must be at least 3 characters"),
    longitude: zod_1.default.number(),
    latitude: zod_1.default.number(),
    address: zod_1.default.string().min(3, "Address must be at least 3 characters"),
    services: zod_1.default.array(zod_1.default.string()).min(1, "Hotel must have at least one service"),
    locationBrief: zod_1.default
        .string()
        .min(3, "Location Brief must be at least 3 characters"),
    banner: zod_1.default.string().nullable().optional(),
});
