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
  password: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/,
      { message: "Use a strong Password" }
    ),
  rememberMe: z.boolean().optional(),
});

const userInfoSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3),
  currentPassword: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/,
      { message: "Use a strong Password" }
    ),
  newPassword: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/,
      { message: "Use a strong Password" }
    ),
});
export { signupSchema, loginSchema, userInfoSchema };

export const emailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/,
      { message: "Use a strong Password" }
    ),
    confirmPassword: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/,
      { message: "Use a strong Password" }
    ),
});


export const redeemCodeSchema = z.object({
    name: z.string().nonempty(),
    amount: z.number().int().positive(),
    expiryDate: z.date(),
    code: z.string().min(6, { message: "Token must be at least 6 characters" }),
    limit: z.number().int().positive(),
  });