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
  uz: "Explain visible styling guidance in Uzbek if any labels or design notes are needed.",
  ru: "Explain visible styling guidance in Russian if any labels or design notes are needed.",
  en: "Explain visible styling guidance in English if any labels or design notes are needed."
};

const styleMap: Record<string, string> = {
  premium: "premium interior styling with architect-level composition and elegant materials",
  luxury: "luxury residential interior direction with refined textures, layered lighting, and expensive finishes",
  modern: "clean modern interior with practical furniture layout and contemporary materials",
  dark: "moody dark interior with dramatic contrast, warm ambient light, and rich surfaces",
  bright: "bright airy interior with daylight emphasis, soft tones, and fresh spacious feel",
  minimal: "minimal interior design with visual calm, integrated storage, and uncluttered surfaces",
  scandinavian: "Scandinavian interior with warm wood, soft textiles, light walls, and functional comfort",
  classic: "classic interior with timeless proportions, decorative moldings, and elegant balance",
  warm: "warm cozy interior with inviting palette, layered textures, and comfortable lighting",
  industrial: "industrial interior with clean geometry, dark metal details, concrete or wood accents",
  kids: "safe playful children's interior with thoughtful storage and family-friendly softness"
};

const purposeMap: Record<string, string> = {
  living_room: "living room redesign",
  bedroom: "bedroom redesign",
  kitchen: "kitchen redesign",
  bathroom: "bathroom redesign",
  office: "home office redesign",
  facade: "house facade redesign",
  studio: "studio apartment redesign"
};

export function buildCommercialPrompt(input: PromptBuilderInput) {
  const sections = [
    `Create a realistic ${purposeMap[input.purpose] || input.purpose} using ${input.imageCount} reference room image(s).`,
    "Preserve the room geometry, window placement, door placement, and overall architecture from the source image.",
    `Visual direction: ${styleMap[input.style] || input.style}.`,
    `Target aspect ratio: ${input.ratio}.`,
    "Interior goals: realistic renovation-ready result, balanced furniture layout, premium but believable materials, proper lighting plan, practical circulation, and clean zoning.",
    "Design rules: avoid changing wall structure unless implied, avoid impossible furniture, avoid clutter, avoid warped perspective, avoid floating objects, avoid extra rooms, avoid deformed doors or windows.",
    languageMap[input.language] || languageMap.en
  ];

  if (input.templatePrompt) {
    sections.push(`Template direction: ${input.templatePrompt}`);
  }

  if (input.customPrompt?.trim()) {
    sections.push(`Custom request from homeowner: ${input.customPrompt.trim()}`);
  }

  sections.push("Output should look like a real interior design concept prepared by a professional architect or interior designer in Uzbekistan.");

  return sections.join(" ");
}
