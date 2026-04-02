"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";
import { getTelegramWebApp } from "@/lib/telegram";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { locale, dict } = useLanguage();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function authenticate() {
      try {
        const webApp = getTelegramWebApp();
        const response = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            initData: webApp?.initData || undefined,
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
        <Card className="w-full text-sm leading-6">Telegram auth error: {error}</Card>
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
