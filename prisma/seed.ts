import { PrismaClient, UserRole } from "@prisma/client";

import { DEFAULT_SETTINGS } from "@/lib/constants";
import { seedTemplates } from "@/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  for (const template of seedTemplates) {
    await prisma.promptTemplate.upsert({
      where: { slug: template.slug },
      update: template,
      create: template
    });
  }

  await prisma.adminSetting.upsert({
    where: { key: "general" },
    update: { value: DEFAULT_SETTINGS },
    create: { key: "general", value: DEFAULT_SETTINGS }
  });

  await prisma.announcement.createMany({
    data: [
      {
        title: "Ramazon reklama vizuallari tezroq tayyor bo'ladi",
        body: "Yangi premium sale shablonlari qo'shildi. 9:16 va 4:5 natijalar yanada toza ko'rinishda chiqadi.",
        language: "uz"
      },
      {
        title: "Новые премиум-шаблоны уже доступны",
        body: "Добавлены более чистые визуалы для сторис, OLX и карточек маркетплейсов.",
        language: "ru"
      },
      {
        title: "Fresh premium templates are live",
        body: "We added cleaner outputs for stories, OLX banners, and marketplace cards.",
        language: "en"
      }
    ],
    skipDuplicates: true
  });

  const adminIds = (process.env.ADMIN_TELEGRAM_IDS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  for (const telegramId of adminIds) {
    await prisma.user.upsert({
      where: { telegramId },
      update: { role: UserRole.ADMIN },
      create: {
        telegramId,
        role: UserRole.ADMIN,
        language: "uz",
        firstName: "Admin"
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
