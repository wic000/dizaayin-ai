import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

import { apiError, apiOk } from "@/lib/api";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_FILES, MAX_UPLOAD_SIZE_BYTES } from "@/lib/constants";
import { requireSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const session = await requireSession();
    const formData = await request.formData();
    const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);

    if (!files.length) {
      return apiError("At least one file is required.", 422);
    }

    if (files.length > MAX_UPLOAD_FILES) {
      return apiError(`You can upload up to ${MAX_UPLOAD_FILES} files.`, 422);
    }

    const uploaded = [];

    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return apiError("Only JPG, PNG, and WEBP files are allowed.", 422);
      }

      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        return apiError("Each file must be under 8MB.", 422);
      }

      const arrayBuffer = await file.arrayBuffer();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${session.telegramId}/${Date.now()}-${randomUUID()}.${ext}`;
      const dataUrl = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

      uploaded.push({
        path: dataUrl,
        publicUrl: dataUrl,
        storagePath: path,
        mimeType: file.type,
        sizeBytes: file.size
      });
    }

    return apiOk({ files: uploaded });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    const status = message === "Unauthorized" ? 401 : 500;
    return apiError(message, status);
  }
}
