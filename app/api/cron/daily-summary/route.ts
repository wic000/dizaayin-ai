import { apiOk } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const [users, generations, premiumOrders] = await Promise.all([
    prisma.user.count(),
    prisma.generation.count(),
    prisma.premiumOrder.count()
  ]);

  return apiOk({
    ok: true,
    summary: {
      users,
      generations,
      premiumOrders
    }
  });
}
