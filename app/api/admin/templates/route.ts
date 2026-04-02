import { apiError, apiOk } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { promptTemplateSchema } from "@/lib/validation/template";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
    const templates = await prisma.promptTemplate.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });

    return apiOk({ templates });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Forbidden.", 403);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const parsed = promptTemplateSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid template payload.", 422);
    }

    const template = await prisma.promptTemplate.create({
      data: parsed.data
    });

    return apiOk({ template }, { status: 201 });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not create template.", 500);
  }
}
