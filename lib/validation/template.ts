import { z } from "zod";

export const promptTemplateSchema = z.object({
  slug: z.string().min(3).max(60),
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(240),
  prompt: z.string().min(20).max(2000),
  category: z.string().min(2).max(50),
  language: z.enum(["uz", "ru", "en"]),
  purpose: z.string().min(2).max(50),
  style: z.string().min(2).max(50),
  ratio: z.string().min(2).max(10),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0)
});
