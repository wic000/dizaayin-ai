import { z } from "zod";

import { LANGUAGE_OPTIONS, PURPOSE_OPTIONS, RATIO_OPTIONS, STYLE_OPTIONS } from "@/lib/constants";

export const uploadImageSchema = z.object({
  path: z.string().min(1),
  mimeType: z.string().optional(),
  sizeBytes: z.number().optional()
});

export const generationCreateSchema = z.object({
  imagePaths: z.array(uploadImageSchema).min(1).max(4),
  purpose: z.enum(PURPOSE_OPTIONS),
  style: z.enum(STYLE_OPTIONS),
  language: z.enum(LANGUAGE_OPTIONS),
  ratio: z.enum(RATIO_OPTIONS),
  customPrompt: z.string().max(900).optional(),
  templateId: z.string().optional()
});
