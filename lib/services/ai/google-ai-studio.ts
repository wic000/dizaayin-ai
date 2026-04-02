import { sleep } from "@/lib/utils";

import type { GenerateVisualInput, GenerateVisualResult } from "./types";

const DEFAULT_MODEL = process.env.GOOGLE_AI_STUDIO_MODEL || "imagen-4.0-generate-001";
const DEFAULT_ENDPOINT =
  process.env.GOOGLE_AI_STUDIO_ENDPOINT ||
  `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:predict`;

function normalizeRatio(ratio: string) {
  switch (ratio) {
    case "9:16":
      return "portrait";
    case "16:9":
      return "landscape";
    default:
      return "square";
  }
}

export async function generateVisualWithGoogleAiStudio(input: GenerateVisualInput): Promise<GenerateVisualResult> {
  const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_STUDIO_API_KEY is missing.");
  }

  const payload = {
    instances: [
      {
        prompt: `${input.prompt}\n\nPhotorealistic interior design render. Aspect ratio: ${input.ratio}.`
      }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: input.ratio,
      personGeneration: "dont_allow"
    }
  };

  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 45_000);

    try {
      const response = await fetch(`${DEFAULT_ENDPOINT}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`Google AI Studio error: ${response.status} ${await response.text()}`);
      }

      const data = await response.json();
      const bytes =
        data?.predictions?.[0]?.bytesBase64Encoded ||
        data?.generatedImages?.[0]?.image?.imageBytes;

      if (!bytes) {
        throw new Error("Image was not returned by the provider.");
      }

      return {
        provider: "google-ai-studio",
        providerJobId: data?.predictions?.[0]?.mimeType || data?.responseId,
        mimeType: "image/png",
        base64Data: bytes
      };
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      if (attempt < 2) {
        await sleep(1000 * (attempt + 1));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to generate image with Google AI Studio.");
}
