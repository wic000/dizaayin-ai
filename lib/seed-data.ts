export const seedTemplates = [
  {
    slug: "product-banner",
    title: "Product banner",
    description: "Hero product placement with clean headline zone for daily promotions.",
    prompt:
      "Create a polished product banner with the product as the hero, modern studio lighting, clean headline space, and commercial-ready composition.",
    category: "general",
    language: "en",
    purpose: "instagram_post",
    style: "premium",
    ratio: "4:5",
    sortOrder: 1
  },
  {
    slug: "premium-showcase",
    title: "Premium showcase",
    description: "Luxury hero frame for boutique sellers and branded Telegram posts.",
    prompt:
      "Present the product like a premium catalog campaign with luxury reflections, elegant background depth, and high-end ad styling.",
    category: "general",
    language: "en",
    purpose: "telegram_post",
    style: "luxury",
    ratio: "1:1",
    sortOrder: 2
  },
  {
    slug: "discount-sale-post",
    title: "Discount sale post",
    description: "Promo-first layout with high-converting sale messaging area.",
    prompt:
      "Create a fast-converting sale visual with energetic composition, bold promotional text zone, and product clarity.",
    category: "sale",
    language: "en",
    purpose: "instagram_post",
    style: "sale",
    ratio: "4:5",
    sortOrder: 3
  },
  {
    slug: "electronics-ad",
    title: "Electronics ad",
    description: "Sleek ad composition for gadgets, appliances, and electronics stores.",
    prompt:
      "Create a sleek electronics advertisement with glossy surfaces, tech gradients, precise reflections, and a clean pricing area.",
    category: "electronics",
    language: "en",
    purpose: "product_ad",
    style: "tech",
    ratio: "16:9",
    sortOrder: 4
  },
  {
    slug: "toy-ad",
    title: "Toy ad",
    description: "Colorful playful design for toy shops and family-focused sellers.",
    prompt:
      "Create a joyful toy advertisement with playful but tidy background accents, bright colors, and strong product focus.",
    category: "toys",
    language: "en",
    purpose: "instagram_post",
    style: "kids",
    ratio: "4:5",
    sortOrder: 5
  },
  {
    slug: "sweet-shop-ad",
    title: "Sweet shop ad",
    description: "Warm appetizing visual for candies, cakes, and dessert sellers.",
    prompt:
      "Create a delicious sweet shop campaign visual with appetizing lighting, soft premium highlights, and clean promo space.",
    category: "sweets",
    language: "en",
    purpose: "instagram_post",
    style: "bright",
    ratio: "4:5",
    sortOrder: 6
  },
  {
    slug: "carpet-showroom-ad",
    title: "Carpet showroom ad",
    description: "Elegant interior-led composition for carpet and home decor stores.",
    prompt:
      "Create an elegant carpet showroom ad with tasteful interior atmosphere, realistic material detail, and luxury spatial depth.",
    category: "home",
    language: "en",
    purpose: "telegram_post",
    style: "luxury",
    ratio: "16:9",
    sortOrder: 7
  },
  {
    slug: "olx-product-card",
    title: "OLX product card",
    description: "Clean classified-listing visual optimized for quick product understanding.",
    prompt:
      "Create a clean OLX-ready product card with neutral background, strong product cutout, key details zone, and trustworthy style.",
    category: "marketplace",
    language: "en",
    purpose: "olx_banner",
    style: "minimal",
    ratio: "1:1",
    sortOrder: 8
  },
  {
    slug: "marketplace-clean-card",
    title: "Marketplace clean card",
    description: "Studio-clean marketplace listing with crisp shadows and no clutter.",
    prompt:
      "Create a clean marketplace card with studio background, realistic shadow, sharp product crop, and ecommerce-ready look.",
    category: "marketplace",
    language: "en",
    purpose: "marketplace_card",
    style: "minimal",
    ratio: "1:1",
    sortOrder: 9
  },
  {
    slug: "instagram-commercial-post",
    title: "Instagram commercial post",
    description: "Social-first commercial design for fast-scrolling mobile audiences.",
    prompt:
      "Create an Instagram commercial post with strong focal hierarchy, scroll-stopping contrast, and premium ad polish.",
    category: "social",
    language: "en",
    purpose: "instagram_post",
    style: "modern",
    ratio: "4:5",
    sortOrder: 10
  }
] as const;
