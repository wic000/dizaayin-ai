export type Locale = "uz" | "ru" | "en";

export const translations = {
  uz: {
    nav: { home: "Bosh sahifa", create: "Yaratish", templates: "Shablonlar", history: "Tarix", premium: "Premium", profile: "Profil" },
    common: {
      appName: "Optimall Design",
      loading: "Yuklanmoqda...",
      generate: "Vizual yaratish",
      submit: "Yuborish",
      save: "Saqlash",
      retry: "Qayta urinish",
      download: "Yuklab olish",
      rerun: "Qayta ishga tushirish",
      logout: "Chiqish",
      admin: "Admin",
      empty: "Hali ma'lumot yo'q",
      language: "Til",
      processing: "Tayyorlanmoqda",
      completed: "Tayyor",
      failed: "Xato",
      queued: "Navbatda",
      choose: "Tanlang",
      title: "Sarlavha",
      description: "Tavsif",
      deadline: "Muddat",
      contact: "Aloqa",
      upload: "Rasm yuklash",
      remove: "O'chirish",
      cancel: "Bekor qilish"
    },
    home: {
      badge: "Telegram ichida ishlaydigan AI dizayn bot",
      title: "Telefon uchun qulay marketing vizuallar",
      subtitle: "Instagram, Telegram, OLX va marketplace uchun mahsulot rasmlaridan premium reklama kreativi tayyorlang.",
      primaryCta: "Yangi dizayn boshlash",
      secondaryCta: "Shablonlarni ko'rish",
      quickTitle: "Tez yo'nalishlar",
      quickItems: ["Instagram sotuvchilari", "Telegram shop egalari", "OLX sotuvchilari", "Elektronika do'konlari"],
      statsTitle: "Profil statistikasi"
    },
    create: {
      title: "Yangi dizayn",
      subtitle: "Bir nechta mahsulot rasmini yuklang va tayyor prompt yoki o'z matningiz bilan natija oling.",
      images: "Mahsulot rasmlari",
      purpose: "Maqsad",
      style: "Stil",
      ratio: "Nisbat",
      language: "Natija tili",
      customPrompt: "Qo'shimcha talab",
      customPromptPlaceholder: "Masalan: narx uchun bo'sh joy qoldir, oltin rang aktsent qo'sh.",
      templates: "Tayyor promptlar",
      result: "Natija",
      generating: "AI dizayn yaratilmoqda..."
    },
    templates: {
      title: "Prompt shablonlari",
      subtitle: "Tayyor marketing promptlaridan birini tanlab, bir necha tegish bilan dizayn yarating."
    },
    history: {
      title: "Generatsiyalar tarixi",
      subtitle: "Oldingi natijalarni ko'ring, yuklab oling yoki yana ishga tushiring.",
      original: "Asl rasm",
      result: "Natija"
    },
    premium: {
      title: "Premium buyurtma",
      subtitle: "Murakkab banner, katalog, video cover yoki to'liq kreativ paketni admin jamoaga yuboring.",
      helper: "Premium buyurtma admin paneliga tushadi va aloqangiz bo'yicha siz bilan bog'laniladi."
    },
    profile: {
      title: "Profil",
      subtitle: "Telegram profilingiz, til sozlamalari, yangiliklar va hisob ko'rsatkichlari.",
      announcements: "E'lonlar",
      stats: "Ko'rsatkichlar",
      generated: "Yaratilgan dizaynlar",
      orders: "Premium buyurtmalar"
    },
    admin: {
      title: "Admin panel",
      subtitle: "Foydalanuvchilar, generatsiyalar, premium buyurtmalar va sozlamalar bir joyda.",
      users: "Foydalanuvchilar",
      generations: "Generatsiyalar",
      orders: "Buyurtmalar",
      templates: "Shablonlar",
      settings: "Sozlamalar",
      announcements: "E'lonlar"
    }
  },
  ru: {
    nav: { home: "Главная", create: "Создать", templates: "Шаблоны", history: "История", premium: "Премиум", profile: "Профиль" },
    common: {
      appName: "Optimall Design",
      loading: "Загрузка...",
      generate: "Сгенерировать",
      submit: "Отправить",
      save: "Сохранить",
      retry: "Повторить",
      download: "Скачать",
      rerun: "Повторить",
      logout: "Выйти",
      admin: "Админ",
      empty: "Пока пусто",
      language: "Язык",
      processing: "Обработка",
      completed: "Готово",
      failed: "Ошибка",
      queued: "В очереди",
      choose: "Выберите",
      title: "Название",
      description: "Описание",
      deadline: "Срок",
      contact: "Контакт",
      upload: "Загрузить",
      remove: "Удалить",
      cancel: "Отмена"
    },
    home: {
      badge: "AI-дизайн бот внутри Telegram",
      title: "Премиальные маркетинговые визуалы прямо с телефона",
      subtitle: "Генерируйте креативы для Instagram, Telegram, OLX и маркетплейсов на основе фото товара.",
      primaryCta: "Начать новый дизайн",
      secondaryCta: "Открыть шаблоны",
      quickTitle: "Для кого это",
      quickItems: ["Instagram продавцы", "Telegram магазины", "OLX продавцы", "Магазины электроники"],
      statsTitle: "Статистика профиля"
    },
    create: {
      title: "Новый дизайн",
      subtitle: "Загрузите несколько фото товара и получите готовый рекламный визуал.",
      images: "Фото товара",
      purpose: "Формат",
      style: "Стиль",
      ratio: "Соотношение",
      language: "Язык результата",
      customPrompt: "Дополнительный запрос",
      customPromptPlaceholder: "Например: оставь место под цену и добавь золотые акценты.",
      templates: "Готовые промпты",
      result: "Результат",
      generating: "AI создает дизайн..."
    },
    templates: {
      title: "Шаблоны промптов",
      subtitle: "Выберите готовый маркетинговый шаблон и быстро запустите генерацию."
    },
    history: {
      title: "История генераций",
      subtitle: "Смотрите прошлые результаты, скачивайте и перезапускайте.",
      original: "Исходник",
      result: "Результат"
    },
    premium: {
      title: "Премиум заказ",
      subtitle: "Отправьте сложный дизайн, баннер, каталог или пакет креативов администратору.",
      helper: "Заявка попадает в админ-панель, после чего с вами свяжутся по указанному контакту."
    },
    profile: {
      title: "Профиль",
      subtitle: "Ваш Telegram-профиль, язык интерфейса, новости и статистика.",
      announcements: "Объявления",
      stats: "Статистика",
      generated: "Создано дизайнов",
      orders: "Премиум-заказы"
    },
    admin: {
      title: "Админ-панель",
      subtitle: "Пользователи, генерации, заявки и настройки в одном месте.",
      users: "Пользователи",
      generations: "Генерации",
      orders: "Заказы",
      templates: "Шаблоны",
      settings: "Настройки",
      announcements: "Объявления"
    }
  },
  en: {
    nav: { home: "Home", create: "Create", templates: "Templates", history: "History", premium: "Premium", profile: "Profile" },
    common: {
      appName: "Optimall Design",
      loading: "Loading...",
      generate: "Generate",
      submit: "Submit",
      save: "Save",
      retry: "Retry",
      download: "Download",
      rerun: "Rerun",
      logout: "Log out",
      admin: "Admin",
      empty: "Nothing here yet",
      language: "Language",
      processing: "Processing",
      completed: "Completed",
      failed: "Failed",
      queued: "Queued",
      choose: "Choose",
      title: "Title",
      description: "Description",
      deadline: "Deadline",
      contact: "Contact",
      upload: "Upload",
      remove: "Remove",
      cancel: "Cancel"
    },
    home: {
      badge: "AI design bot built for Telegram",
      title: "Premium marketing visuals designed for phones",
      subtitle: "Turn product photos into polished ads for Instagram, Telegram, OLX, and marketplace cards.",
      primaryCta: "Start a new design",
      secondaryCta: "Browse templates",
      quickTitle: "Built for",
      quickItems: ["Instagram sellers", "Telegram shops", "OLX sellers", "Electronics stores"],
      statsTitle: "Profile stats"
    },
    create: {
      title: "New design",
      subtitle: "Upload one or more product images and generate an ad-ready visual with minimal taps.",
      images: "Product images",
      purpose: "Purpose",
      style: "Style",
      ratio: "Ratio",
      language: "Output language",
      customPrompt: "Custom prompt",
      customPromptPlaceholder: "For example: leave space for the price and add warm golden highlights.",
      templates: "Ready prompts",
      result: "Result",
      generating: "AI is generating your design..."
    },
    templates: {
      title: "Prompt templates",
      subtitle: "Choose a production-ready prompt and launch a commercial visual quickly."
    },
    history: {
      title: "Generation history",
      subtitle: "Review previous outputs, download them, or rerun with one tap.",
      original: "Original",
      result: "Result"
    },
    premium: {
      title: "Premium order",
      subtitle: "Send advanced design requests, campaign packs, or custom banners to the admin team.",
      helper: "Premium requests appear in the admin panel and can be handled manually by your team."
    },
    profile: {
      title: "Profile",
      subtitle: "Your Telegram details, language, recent announcements, and account stats.",
      announcements: "Announcements",
      stats: "Stats",
      generated: "Designs generated",
      orders: "Premium orders"
    },
    admin: {
      title: "Admin panel",
      subtitle: "Users, generations, premium orders, templates, and settings in one place.",
      users: "Users",
      generations: "Generations",
      orders: "Orders",
      templates: "Templates",
      settings: "Settings",
      announcements: "Announcements"
    }
  }
} satisfies Record<Locale, Record<string, unknown>>;

export function t(locale: Locale) {
  return translations[locale];
}
