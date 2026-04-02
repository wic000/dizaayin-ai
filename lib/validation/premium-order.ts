import { z } from "zod";

export const premiumOrderSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  deadline: z.string().optional(),
  telegramUsername: z.string().max(60).optional(),
  contact: z.string().min(5).max(80),
  referenceImages: z.array(
    z.object({
      path: z.string().min(1),
      mimeType: z.string().optional()
    })
  ).max(4)
});
