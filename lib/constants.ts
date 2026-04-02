export const APP_NAME = "Optimall Design";
export const SESSION_COOKIE = "optimall_session";
export const ADMIN_TELEGRAM_IDS = (process.env.ADMIN_TELEGRAM_IDS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

export const PURPOSE_OPTIONS = [
  "instagram_post",
  "instagram_story",
  "telegram_post",
  "olx_banner",
  "marketplace_card",
  "sale_poster",
  "product_ad"
] as const;

export const STYLE_OPTIONS = [
  "premium",
  "luxury",
  "modern",
  "dark",
  "bright",
  "minimal",
  "tech",
  "kids",
  "sale"
] as const;

export const LANGUAGE_OPTIONS = ["uz", "ru", "en"] as const;
export const RATIO_OPTIONS = ["1:1", "4:5", "9:16", "16:9"] as const;

export const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024;
export const MAX_UPLOAD_FILES = 4;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const STORAGE_BUCKETS = {
  uploads: process.env.SUPABASE_UPLOAD_BUCKET || "design-uploads",
  results: process.env.SUPABASE_RESULTS_BUCKET || "design-results"
};

export const DEFAULT_SETTINGS = {
  premiumOrderPriceFrom: 150000,
  standardGenerationLimitPerHour: 20,
  announcementEnabled: true
};
