import { z } from "zod";

export interface Subscribe{
  email: string;

}
export const subscribeSchema = z.object({
  email: z.string().email("Email not valide"),
});


