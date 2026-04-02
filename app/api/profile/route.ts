import { apiError, apiOk } from "@/lib/api";
import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await requireSession();
    const [user, generationCount, premiumOrderCount, announcements] = await Promise.all([
      prisma.user.findUnique({ where: { id: session.userId } }),
      prisma.generation.count({ where: { userId: session.userId } }),
      prisma.premiumOrder.count({ where: { userId: session.userId } }),
      prisma.announcement.findMany({
        where: {
          isActive: true,
          OR: [{ language: session.language }, { language: "en" }]
        },
        orderBy: { createdAt: "desc" },
        take: 5
      })
    ]);

    if (!user) {
      return apiError("User not found.", 404);
    }

    return apiOk({
      user,
      stats: {
        generationCount,
        premiumOrderCount
      },
      announcements
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not load profile.", 401);
  }
}
