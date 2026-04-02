import { apiError, apiOk } from "@/lib/api";
import { requireSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { premiumOrderSchema } from "@/lib/validation/premium-order";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await requireSession();
    const orders = await prisma.premiumOrder.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      include: { referenceImages: true }
    });

    return apiOk({ orders });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not load orders.", 401);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const body = await request.json();
    const parsed = premiumOrderSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid premium order payload.", 422);
    }

    const order = await prisma.premiumOrder.create({
      data: {
        userId: session.userId,
        title: parsed.data.title,
        description: parsed.data.description,
        deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : undefined,
        telegramUsername: parsed.data.telegramUsername,
        contact: parsed.data.contact,
        referenceImages: {
          create: parsed.data.referenceImages.map((image) => ({
            path: image.path,
            mimeType: image.mimeType
          }))
        }
      },
      include: { referenceImages: true }
    });

    return apiOk({ order }, { status: 201 });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not submit premium order.", 500);
  }
}
