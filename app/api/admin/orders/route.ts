import { apiError, apiOk } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
    const orders = await prisma.premiumOrder.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        referenceImages: true
      },
      take: 100
    });

    return apiOk({ orders });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Forbidden.", 403);
  }
}
