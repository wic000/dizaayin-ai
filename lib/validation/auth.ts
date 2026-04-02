import { z } from "zod";

export const telegramAuthSchema = z.object({
  initData: z.string().optional(),
  language: z.enum(["uz", "ru", "en"]).default("uz")
});
