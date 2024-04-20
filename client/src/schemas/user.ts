import { z } from "zod";
import { billing } from "./billing";
import { Plan } from "./Plan";


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



interface UserDetails {
  date_created: string;
  next_payment_date: string;
  days: number;
  percentage: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  is_first_login: number;
  current_billing_id: number;
  created_at: string;
  updated_at: string;
  details: UserDetails;
  plan: Plan | null;
  roles: any[]; // You may need to define the structure for roles and permissions
  permissions: any[];
  current_billing: billing | null;
}

export const profileSchema = z.object({
  name: z.string().min(3, "length should be greater or equal to 3"),
  email: z.string().email("Email not valide"),
});

// onboardingSchema 

export const onboardingSchema = z.object({
  website: z.string().url({ message: "Invalid url" }),
});  