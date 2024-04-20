import { z } from 'zod';

export const CreateCheckoutSessionInput = z.object({
  uiMode: z.enum(['hosted', 'embedded']),
  description: z.string(),
  customDonation: z.number().or(z.string()),
  type: z.string().optional(),
  billable_id: z.number().optional(),
});

export const CreateCheckoutSessionOutput = z.object({
  client_secret: z.string().nullable(),
  url: z.string().nullable(),
  
});
