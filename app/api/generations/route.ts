import { randomUUID } from "node:crypto";
import { GenerationImageKind, GenerationStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

import { apiError, apiOk } from "@/lib/api";
import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { buildCommercialPrompt } from "@/lib/services/prompt-builder";
import { generateVisual } from "@/lib/services/ai";
import { getPublicStorageUrl, uploadBufferToStorage } from "@/lib/services/storage";
import { rateLimit } from "@/lib/services/rate-limit";
import { generationCreateSchema } from "@/lib/validation/generation";

type GenerationWithImages = Prisma.GenerationGetPayload<{
  include: { images: true };
}>;

function serializeGeneration(generation: GenerationWithImages) {
  return {
    id: generation.id,
    prompt: generation.prompt,
    customPrompt: generation.customPrompt,
    purpose: generation.purpose,
    style: generation.style,
    language: generation.language,
    ratio: generation.ratio,
    status: generation.status,
    error: generation.error,
    createdAt: generation.createdAt,
    images: generation.images.map((image) => ({
      id: image.id,
      kind: image.kind,
      path: image.path,
      url: image.kind === "OUTPUT" ? getPublicStorageUrl("results", image.path) : getPublicStorageUrl("uploads", image.path)
    }))
  };
}

export async function GET() {
  try {
    const session = await requireSession();
    const generations = await prisma.generation.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      include: { images: true },
      take: 30
    });

    return apiOk({
      generations: generations.map((generation) =>
        serializeGeneration(generation)
      )
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not load generations.", 401);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const limiter = rateLimit(`generation:${session.userId}`, 12, 60 * 60 * 1000);

    if (!limiter.allowed) {
      return apiError("Hourly generation limit reached. Please try again later.", 429);
    }

    const body = await request.json();
    const parsed = generationCreateSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid generation payload.", 422);
    }

    const template = parsed.data.templateId
      ? await prisma.promptTemplate.findUnique({ where: { id: parsed.data.templateId } })
      : null;

    const prompt = buildCommercialPrompt({
      purpose: parsed.data.purpose,
      style: parsed.data.style,
      language: parsed.data.language,
      ratio: parsed.data.ratio,
      customPrompt: parsed.data.customPrompt,
      templatePrompt: template?.prompt,
      imageCount: parsed.data.imagePaths.length
    });

    const generation = await prisma.generation.create({
      data: {
        userId: session.userId,
        prompt,
        customPrompt: parsed.data.customPrompt,
        purpose: parsed.data.purpose,
        style: parsed.data.style,
        language: parsed.data.language,
        ratio: parsed.data.ratio,
        status: GenerationStatus.PROCESSING,
        images: {
          create: parsed.data.imagePaths.map((image) => ({
            kind: GenerationImageKind.INPUT,
            path: image.path,
            mimeType: image.mimeType,
            sizeBytes: image.sizeBytes
          }))
        }
      },
      include: { images: true }
    });

    try {
      const aiResult = await generateVisual({
        prompt,
        ratio: parsed.data.ratio,
        images: parsed.data.imagePaths.map((image) => ({
          path: image.path,
          publicUrl: getPublicStorageUrl("uploads", image.path),
          mimeType: image.mimeType
        }))
      });

      const outputPath = `${session.telegramId}/generated/${generation.id}-${randomUUID()}.png`;
      await uploadBufferToStorage({
        bucket: "results",
        path: outputPath,
        buffer: Buffer.from(aiResult.base64Data, "base64"),
        contentType: aiResult.mimeType
      });

      const updated = await prisma.generation.update({
        where: { id: generation.id },
        data: {
          status: GenerationStatus.COMPLETED,
          provider: aiResult.provider,
          providerJobId: aiResult.providerJobId,
          outputImagePath: outputPath,
          images: {
            create: {
              kind: GenerationImageKind.OUTPUT,
              path: outputPath,
              mimeType: aiResult.mimeType
            }
          }
        },
        include: { images: true }
      });

      return apiOk({
        generation: serializeGeneration(updated)
      });
    } catch (error) {
      const failed = await prisma.generation.update({
        where: { id: generation.id },
        data: {
          status: GenerationStatus.FAILED,
          error: error instanceof Error ? error.message : "Generation failed."
        },
        include: { images: true }
      });

      return apiOk(
        {
          generation: serializeGeneration(failed)
        },
        { status: 202 }
      );
    }
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not create generation.", 500);
  }
}
