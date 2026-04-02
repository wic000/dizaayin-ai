import { apiError, apiOk } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { promptTemplateSchema } from "@/lib/validation/template";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const parsed = promptTemplateSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid template payload.", 422);
    }

    const template = await prisma.promptTemplate.update({
      where: { id: params.id },
      data: parsed.data
    });

    return apiOk({ template });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not update template.", 500);
  }
}
