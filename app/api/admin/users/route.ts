import { apiError, apiOk } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 100
    });

    return apiOk({ users });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Forbidden.", 403);
  }
}
