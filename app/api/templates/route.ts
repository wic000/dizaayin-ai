import { prisma } from "@/lib/prisma";
import { apiOk } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const templates = await prisma.promptTemplate.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return apiOk({ templates });
}
