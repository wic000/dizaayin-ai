import { apiError, apiOk } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" }
    });

    return apiOk({ announcements });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Forbidden.", 403);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();

    const announcement = await prisma.announcement.create({
      data: {
        title: body.title,
        body: body.body,
        language: body.language || "uz",
        isActive: Boolean(body.isActive ?? true)
      }
    });

    return apiOk({ announcement }, { status: 201 });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not create announcement.", 500);
  }
}
