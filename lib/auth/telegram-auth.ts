import crypto from "node:crypto";

type ParseResult = Record<string, string>;

function parseInitData(initData: string): ParseResult {
  return Array.from(new URLSearchParams(initData).entries()).reduce<ParseResult>((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}

export function verifyTelegramInitData(initData: string) {
  if (!initData) {
    return null;
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN is required to validate Telegram init data.");
  }

  const parsed = parseInitData(initData);
  const hash = parsed.hash;
  delete parsed.hash;

  const checkString = Object.entries(parsed)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secret = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const generatedHash = crypto.createHmac("sha256", secret).update(checkString).digest("hex");

  if (generatedHash !== hash) {
    return null;
  }

  const userRaw = parsed.user;
  if (!userRaw) {
    return null;
  }

  return JSON.parse(userRaw) as {
    id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
  };
}
