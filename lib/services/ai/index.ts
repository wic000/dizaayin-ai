import type { GenerateVisualInput } from "./types";
import { generateVisualWithGoogleAiStudio } from "./google-ai-studio";

export async function generateVisual(input: GenerateVisualInput) {
  return generateVisualWithGoogleAiStudio(input);
}
