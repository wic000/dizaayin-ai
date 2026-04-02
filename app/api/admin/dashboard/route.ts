import { GenerationStatus, PremiumOrderStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

import { apiError, apiOk } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAdminSession();

    const [users, generations, completed, failed, premiumOrders, newOrders, templates] = await Promise.all([
      prisma.user.count(),
      prisma.generation.count(),
      prisma.generation.count({ where: { status: GenerationStatus.COMPLETED } }),
      prisma.generation.count({ where: { status: GenerationStatus.FAILED } }),
      prisma.premiumOrder.count(),
      prisma.premiumOrder.count({ where: { status: PremiumOrderStatus.NEW } }),
      prisma.promptTemplate.count()
    ]);

    return apiOk({
      stats: {
        users,
        generations,
        completed,
        failed,
        premiumOrders,
        newOrders,
        templates
      }
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Forbidden.", 403);
  }
}
