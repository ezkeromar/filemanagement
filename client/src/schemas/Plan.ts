import { z } from "zod";

export interface Plan {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  storage_unit: string;
  currency: string;
  billing_interval?: 'annual' | 'monthly';
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export const packageSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  storage_unit: z.string(),
  currency: z.string(),
  billing_interval: z.string().optional(),
  is_active: z.boolean(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});
