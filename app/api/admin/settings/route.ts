import { apiError, apiOk } from "@/lib/api";
import { requireAdminSession } from "@/lib/auth/session";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
    const settings = await prisma.adminSetting.findUnique({
      where: { key: "general" }
    });

    return apiOk({ settings: settings?.value || DEFAULT_SETTINGS });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Forbidden.", 403);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();

    const settings = await prisma.adminSetting.upsert({
      where: { key: "general" },
      update: { value: body },
      create: { key: "general", value: body }
    });

    return apiOk({ settings: settings.value });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Could not save settings.", 500);
  }
}
