export type Locale = "uz" | "ru" | "en";

export const translations = {
  uz: {
    nav: { home: "Bosh sahifa", create: "Dizayn", templates: "Variantlar", history: "Tarix", premium: "Premium", profile: "Profil" },
    common: {
      appName: "Optimall Interior AI",
      loading: "Yuklanmoqda...",
      generate: "Dizayn yaratish",
      submit: "Yuborish",
      save: "Saqlash",
      retry: "Qayta urinish",
      download: "Yuklab olish",
      rerun: "Qayta yaratish",
      logout: "Chiqish",
      admin: "Admin",
      empty: "Hali ma'lumot yo'q",
      language: "Til",
      processing: "Ishlanmoqda",
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
      badge: "Telegram ichidagi interior dizayn yordamchisi",
      title: "Remont qilinmagan xonani chiroyli interyerga aylantiring",
      subtitle: "Yangi qurilgan uy, qora suvoq xona yoki bo'sh joy rasmini yuklab, AI orqali ichki dizayn variantini ko'ring.",
      primaryCta: "Yangi xona dizayni",
      secondaryCta: "Tayyor variantlar",
      quickTitle: "Mos yo'nalishlar",
      quickItems: ["Mehmonxona", "Yotoqxona", "Oshxona", "Fasad"],
      statsTitle: "Profil statistikasi"
    },
    create: {
      title: "Xona dizayni",
      subtitle: "Xona rasmini yuklang, xona turini va stilni tanlang, AI sizga tayyor interyer konsept ko'rsatadi.",
      images: "Xona rasmlari",
      purpose: "Xona turi",
      style: "Interyer stili",
      ratio: "Rasm nisbati",
      language: "Natija tili",
      customPrompt: "Qo'shimcha istak",
      customPromptPlaceholder: "Masalan: oq-bej ranglar bo'lsin, TV zona bo'lsin, oshxona oroli qo'shilsin.",
      templates: "Tayyor dizayn variantlari",
      result: "Natija",
      generating: "AI interyer dizayn tayyorlamoqda..."
    },
    templates: {
      title: "Dizayn variantlari",
      subtitle: "Xona turiga mos tayyor interyer promptlardan foydalanib, tezroq natija oling."
    },
    history: {
      title: "Dizaynlar tarixi",
      subtitle: "Oldingi before/after natijalarni ko'ring, yuklab oling yoki qayta yarating.",
      original: "Asl xona",
      result: "Yangi dizayn"
    },
    premium: {
      title: "Premium interior buyurtma",
      subtitle: "Murakkab kvartira, ofis, fasad yoki to'liq loyiha uchun admin jamoaga buyurtma yuboring.",
      helper: "Premium buyurtma admin paneliga tushadi va siz bilan aloqa orqali bog'laniladi."
    },
    profile: {
      title: "Profil",
      subtitle: "Telegram profilingiz, til sozlamalari, yangiliklar va yaratilgan interyer dizaynlar statistikasi.",
      announcements: "E'lonlar",
      stats: "Ko'rsatkichlar",
      generated: "Yaratilgan dizaynlar",
      orders: "Premium buyurtmalar"
    },
    admin: {
      title: "Admin panel",
      subtitle: "Foydalanuvchilar, xona dizaynlari, premium so'rovlar va shablonlar bir joyda.",
      users: "Foydalanuvchilar",
      generations: "Dizaynlar",
      orders: "Buyurtmalar",
      templates: "Shablonlar",
      settings: "Sozlamalar",
      announcements: "E'lonlar"
    }
  },
  ru: {
    nav: { home: "Главная", create: "Дизайн", templates: "Варианты", history: "История", premium: "Премиум", profile: "Профиль" },
    common: {
      appName: "Optimall Interior AI",
      loading: "Загрузка...",
      generate: "Создать дизайн",
      submit: "Отправить",
      save: "Сохранить",
      retry: "Повторить",
      download: "Скачать",
      rerun: "Сгенерировать снова",
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
      badge: "Interior design помощник внутри Telegram",
      title: "Превратите пустую комнату в готовый интерьер",
      subtitle: "Загрузите фото новой квартиры, черновой комнаты или фасада и получите AI-концепт интерьера.",
      primaryCta: "Новый дизайн комнаты",
      secondaryCta: "Готовые варианты",
      quickTitle: "Подходит для",
      quickItems: ["Гостиная", "Спальня", "Кухня", "Фасад"],
      statsTitle: "Статистика профиля"
    },
    create: {
      title: "Дизайн комнаты",
      subtitle: "Загрузите фото комнаты, выберите тип помещения и стиль, затем получите интерьерный концепт.",
      images: "Фото комнаты",
      purpose: "Тип помещения",
      style: "Стиль интерьера",
      ratio: "Соотношение",
      language: "Язык результата",
      customPrompt: "Дополнительное пожелание",
      customPromptPlaceholder: "Например: светлый бежевый интерьер, ТВ-зона, остров на кухне.",
      templates: "Готовые интерьерные варианты",
      result: "Результат",
      generating: "AI готовит интерьерный дизайн..."
    },
    templates: {
      title: "Варианты дизайна",
      subtitle: "Используйте готовые интерьерные шаблоны для быстрого старта."
    },
    history: {
      title: "История дизайнов",
      subtitle: "Смотрите прошлые варианты, скачивайте и запускайте заново.",
      original: "Исходная комната",
      result: "Новый дизайн"
    },
    premium: {
      title: "Премиум заказ интерьера",
      subtitle: "Отправьте сложный проект квартиры, офиса, фасада или полного ремонта администратору.",
      helper: "Заявка попадет в админ-панель, после чего с вами свяжутся."
    },
    profile: {
      title: "Профиль",
      subtitle: "Ваш Telegram-профиль, язык интерфейса, новости и статистика интерьерных генераций.",
      announcements: "Объявления",
      stats: "Статистика",
      generated: "Создано дизайнов",
      orders: "Премиум-заказы"
    },
    admin: {
      title: "Админ-панель",
      subtitle: "Пользователи, интерьерные генерации, премиум-заявки и шаблоны в одном месте.",
      users: "Пользователи",
      generations: "Дизайны",
      orders: "Заказы",
      templates: "Шаблоны",
      settings: "Настройки",
      announcements: "Объявления"
    }
  },
  en: {
    nav: { home: "Home", create: "Design", templates: "Concepts", history: "History", premium: "Premium", profile: "Profile" },
    common: {
      appName: "Optimall Interior AI",
      loading: "Loading...",
      generate: "Generate design",
      submit: "Submit",
      save: "Save",
      retry: "Retry",
      download: "Download",
      rerun: "Regenerate",
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
      badge: "Interior design assistant for Telegram",
      title: "Turn an unfinished room into a finished interior concept",
      subtitle: "Upload a new-build room, empty apartment, or rough facade photo and get AI-generated interior redesign ideas.",
      primaryCta: "Start a room redesign",
      secondaryCta: "Browse concepts",
      quickTitle: "Best for",
      quickItems: ["Living room", "Bedroom", "Kitchen", "Facade"],
      statsTitle: "Profile stats"
    },
    create: {
      title: "Room redesign",
      subtitle: "Upload room photos, choose the room type and style, then generate a realistic interior concept.",
      images: "Room photos",
      purpose: "Room type",
      style: "Interior style",
      ratio: "Ratio",
      language: "Output language",
      customPrompt: "Extra request",
      customPromptPlaceholder: "For example: warm beige palette, TV wall, island kitchen, built-in storage.",
      templates: "Ready interior concepts",
      result: "Result",
      generating: "AI is preparing the interior redesign..."
    },
    templates: {
      title: "Interior concepts",
      subtitle: "Use ready-made interior templates to redesign rooms faster."
    },
    history: {
      title: "Design history",
      subtitle: "Review previous before/after outputs, download them, or regenerate them.",
      original: "Original room",
      result: "New design"
    },
    premium: {
      title: "Premium interior order",
      subtitle: "Send advanced apartment, office, facade, or full renovation requests to the admin team.",
      helper: "Premium requests appear in the admin panel so your team can handle them manually."
    },
    profile: {
      title: "Profile",
      subtitle: "Your Telegram profile, language settings, announcements, and interior design stats.",
      announcements: "Announcements",
      stats: "Stats",
      generated: "Designs generated",
      orders: "Premium orders"
    },
    admin: {
      title: "Admin panel",
      subtitle: "Users, room redesign generations, premium requests, and templates in one place.",
      users: "Users",
      generations: "Designs",
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
