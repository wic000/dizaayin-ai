import { apiError, apiOk } from "@/lib/api";
import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const generation = await prisma.generation.findFirst({
      where: {
        id: params.id,
        userId: session.userId
      },
      include: { images: true }
    });

    if (!generation) {
      return apiError("Generation not found.", 404);
    }

    const inputs = generation.images
      .filter((image) => image.kind === "INPUT")
      .map((image) => ({
        path: image.path,
        mimeType: image.mimeType || undefined,
        sizeBytes: image.sizeBytes || undefined
      }));

    return apiOk({
      rerunPayload: {
        imagePaths: inputs,
        purpose: generation.purpose,
        style: generation.style,
        language: generation.language,
        ratio: generation.ratio,
        customPrompt: generation.customPrompt
      }
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not load rerun payload.", 500);
  }
}
