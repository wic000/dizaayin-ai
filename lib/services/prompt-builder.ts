type PromptBuilderInput = {
  purpose: string;
  style: string;
  language: string;
  ratio: string;
  customPrompt?: string;
  templatePrompt?: string | null;
  imageCount: number;
};

const languageMap: Record<string, string> = {
  uz: "Write the composition guidance in Uzbek where text elements are required.",
  ru: "Write the composition guidance in Russian where text elements are required.",
  en: "Write the composition guidance in English where text elements are required."
};

const styleMap: Record<string, string> = {
  premium: "premium advertising styling with polished reflections and balanced luxury lighting",
  luxury: "luxury commercial art direction with elegant shadows, premium texture, rich detail",
  modern: "clean contemporary ecommerce branding with crisp shapes and modern composition",
  dark: "cinematic dark ad layout with dramatic contrast and deep shadows",
  bright: "high-key bright campaign style with vibrant lighting and uplifting tone",
  minimal: "minimal catalog design with plenty of whitespace and product focus",
  tech: "tech-forward campaign visual with sleek gradients and futuristic lighting",
  kids: "friendly playful design with colorful accents and family-safe mood",
  sale: "high-converting sale campaign visual with clear promo zones and urgency"
};

const purposeMap: Record<string, string> = {
  instagram_post: "Instagram feed post",
  instagram_story: "Instagram story layout",
  telegram_post: "Telegram sales post visual",
  olx_banner: "OLX banner",
  marketplace_card: "marketplace product card",
  sale_poster: "sale poster",
  product_ad: "product advertising creative"
};

export function buildCommercialPrompt(input: PromptBuilderInput) {
  const sections = [
    `Create a ${purposeMap[input.purpose] || input.purpose} using ${input.imageCount} reference product image(s).`,
    `Keep the product absolutely recognizable and centered as the hero subject.`,
    `Visual direction: ${styleMap[input.style] || input.style}.`,
    `Target aspect ratio: ${input.ratio}.`,
    `Commercial goals: sharp product edges, realistic proportions, premium lighting, clean background separation, ad-ready composition, professional color grading.`,
    `Design rules: leave clean safe text zones, avoid clutter, avoid warped packaging, avoid extra fingers or duplicate products, avoid distorted logos, avoid unreadable text, avoid low-resolution surfaces.`,
    languageMap[input.language] || languageMap.en
  ];

  if (input.templatePrompt) {
    sections.push(`Template direction: ${input.templatePrompt}`);
  }

  if (input.customPrompt?.trim()) {
    sections.push(`Custom request from seller: ${input.customPrompt.trim()}`);
  }

  sections.push(
    "Output should look like a real ecommerce or social media campaign made by a professional marketing designer for sellers in Uzbekistan."
  );

  return sections.join(" ");
}
