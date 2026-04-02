"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";
import { getTelegramWebApp } from "@/lib/telegram";

async function waitForTelegramInitData() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const webApp = getTelegramWebApp();
    webApp?.ready();
    webApp?.expand();

    if (webApp?.initData) {
      return webApp.initData;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return "";
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { locale, dict } = useLanguage();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function authenticate() {
      try {
        const initData = await waitForTelegramInitData();

        const response = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            initData: initData || undefined,
            language: locale
          })
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Authentication failed.");
        }

        if (!ignore) setReady(true);
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : "Authentication failed.");
      }
    }

    authenticate();
    return () => {
      ignore = true;
    };
  }, [locale]);

  if (error) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <Card className="w-full text-sm leading-6">
          Telegram auth error: {error}
          <div className="mt-3 text-xs text-foreground/65 dark:text-white/65">
            Mini App'ni to'g'ridan-to'g'ri Telegram ichidan oching. Agar bot endi ulangan bo'lsa, sahifani qayta ochib ko'ring.
          </div>
        </Card>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <Card className="w-full text-sm">{dict.common.loading}</Card>
      </div>
    );
  }

  return <>{children}</>;
}
