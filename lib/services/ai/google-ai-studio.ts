import { sleep } from "@/lib/utils";

import type { GenerateVisualInput, GenerateVisualResult } from "./types";

const DEFAULT_MODEL = process.env.GOOGLE_AI_STUDIO_MODEL || "gemini-2.0-flash-exp";
const DEFAULT_ENDPOINT =
  process.env.GOOGLE_AI_STUDIO_ENDPOINT ||
  `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent`;

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

  const parts: Array<Record<string, unknown>> = [
    {
      text: `${input.prompt}\n\nReturn a single high-quality generated commercial image. Aspect preference: ${normalizeRatio(input.ratio)}.`
    }
  ];

  for (const image of input.images) {
    if (image.path.startsWith("data:")) {
      const [, mimeType = "image/jpeg", base64Data = ""] =
        image.path.match(/^data:(.+?);base64,(.+)$/) || [];

      if (base64Data) {
        parts.push({
          inlineData: {
            mimeType,
            data: base64Data
          }
        });
      }
    } else if (image.publicUrl) {
      parts.push({
        fileData: {
          mimeType: image.mimeType || "image/jpeg",
          fileUri: image.publicUrl
        }
      });
    }
  }

  const payload = {
    contents: [
      {
        role: "user",
        parts
      }
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"]
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
      const partsOut =
        data?.candidates?.[0]?.content?.parts ||
        data?.candidates?.[0]?.parts ||
        data?.outputs?.[0]?.content?.parts ||
        [];

      const inlineData = partsOut.find((part: Record<string, unknown>) => part.inlineData) as
        | { inlineData?: { data?: string; mimeType?: string } }
        | undefined;

      if (!inlineData?.inlineData?.data) {
        throw new Error("Image was not returned by the provider.");
      }

      return {
        provider: "google-ai-studio",
        providerJobId: data?.responseId,
        mimeType: inlineData.inlineData.mimeType || "image/png",
        base64Data: inlineData.inlineData.data
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
