"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpFormSchema = exports.loginSchema = exports.userSchema = exports.signInFormSchema = void 0;
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
