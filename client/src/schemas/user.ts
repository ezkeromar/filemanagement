import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email("Email not valide"),
    password: z
      .string()
      .min(8, "length should be greater or equal to 8")
      .max(20, "length should not be greater to 20")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  });

export type TLogin = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z.string().min(3, "length should be greater or equal to 3"),
    email: z.string().email("Email not valide"),
    password: z
      .string()
      .min(8, "length should be greater or equal to 8")
      .max(20, "length should not be greater to 20")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "length should be greater or equal to 8")
      .max(20, "length should not be greater to 20")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password not match",
    path: ["confirmPassword"],
  });

export type TRegister = z.infer<typeof registerSchema>

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles?: [];
  permissions?: [];
}

export const profileSchema = z.object({
  name: z.string().min(3, "length should be greater or equal to 3"),
  email: z.string().email("Email not valide"),
});
