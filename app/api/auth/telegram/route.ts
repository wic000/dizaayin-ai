import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

import { apiError, apiOk } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth/session";
import { verifyTelegramInitData } from "@/lib/auth/telegram-auth";
import { upsertTelegramUser } from "@/lib/server/user";
import { telegramAuthSchema } from "@/lib/validation/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = telegramAuthSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid Telegram auth payload.", 422);
    }

    const { initData, language } = parsed.data;
    let telegramUser = initData ? verifyTelegramInitData(initData) : null;

    if (!telegramUser && process.env.NODE_ENV !== "production" && process.env.DEV_TELEGRAM_ID) {
      telegramUser = {
        id: Number(process.env.DEV_TELEGRAM_ID),
        username: process.env.DEV_TELEGRAM_USERNAME || "dev_user",
        first_name: process.env.DEV_TELEGRAM_FIRST_NAME || "Dev",
        last_name: process.env.DEV_TELEGRAM_LAST_NAME || "User"
      };
    }

    if (!telegramUser) {
      return apiError("Telegram authentication failed.", 401);
    }

    const user = await upsertTelegramUser({
      telegramId: String(telegramUser.id),
      username: telegramUser.username ?? null,
      firstName: telegramUser.first_name ?? null,
      lastName: telegramUser.last_name ?? null,
      language
    });

    await setSessionCookie({
      userId: user.id,
      telegramId: user.telegramId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      language: user.language,
      role: user.role
    });

    return apiOk({
      user: {
        id: user.id,
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        language: user.language,
        role: user.role
      }
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Authentication failed.", 500);
  }
}
