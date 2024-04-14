import { z } from "zod";


export interface Document {
    id: number;
    name: string;
    path: string;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface newDocument {
    file: File | null;
  }

export const newDocumentSchema = z.object({
    file: z.object({}).nullable(),
});

