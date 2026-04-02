import { UserRole } from "@prisma/client";

import { ADMIN_TELEGRAM_IDS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function upsertTelegramUser(input: {
  telegramId: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  language: string;
}) {
  const role = ADMIN_TELEGRAM_IDS.includes(input.telegramId) ? UserRole.ADMIN : UserRole.USER;

  return prisma.user.upsert({
    where: { telegramId: input.telegramId },
    update: {
      username: input.username ?? undefined,
      firstName: input.firstName ?? undefined,
      lastName: input.lastName ?? undefined,
      language: input.language,
      role,
      lastActiveAt: new Date()
    },
    create: {
      telegramId: input.telegramId,
      username: input.username ?? undefined,
      firstName: input.firstName ?? undefined,
      lastName: input.lastName ?? undefined,
      language: input.language,
      role,
      lastActiveAt: new Date()
    }
  });
}
