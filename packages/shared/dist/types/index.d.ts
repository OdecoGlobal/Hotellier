import { z } from "zod";
import { loginSchema, signUpFormSchema, userSchema } from "../schemas/validator";
export type User = z.infer<typeof userSchema>;
export type signUpInput = z.infer<typeof signUpFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=index.d.ts.map