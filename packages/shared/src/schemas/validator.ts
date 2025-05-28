import z from "zod";
export const signInFormSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const userSchema = z.object({
  id: z.string().min(1, "Id is required"),
  userName: z.string().min(3, "User name must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 digits").optional(),
  passwordConfirm: z
    .string()
    .min(8, "Password must be at least 8 digits")
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const signUpFormSchema = z
  .object({
    userName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"],
  });

export const insertHotelSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  // slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  // ownerId: z
  //   .string()
  //   .uuid("User id must be valid")
  //   // .min(1, "Owner Id is required"),
  state: z.string().min(3, "State must be at least 3 characters"),
  lga: z.string().min(3, "LGA must be at least 3 characters"),
  longitude: z.number(),
  latitude: z.number(),
  address: z.string().min(3, "Address must be at least 3 characters"),
  services: z.array(z.string()).min(1, "Hotel must have at least one service"),
  locationBrief: z
    .string()
    .min(3, "Location Brief must be at least 3 characters"),
  banner: z.string().nullable().optional(),
});
