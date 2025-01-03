import { z } from "zod";

const signupSchema = z.object({
    username: z
      .string()
      .min(5, { message: "username must be at least 5 characters long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: "Use a strong Password" }
      ),
  });
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Use a strong Password' }),
    rememberMe: z.boolean().optional(),
  })


export {
    signupSchema, loginSchema
}