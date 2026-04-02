"use client";

import { useEffect, useMemo, useState } from "react";

import { getTelegramWebApp } from "@/lib/telegram";

export function useTelegramWebApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const webApp = getTelegramWebApp();
    webApp?.ready();
    webApp?.expand();
    setMounted(true);
  }, []);

  return useMemo(() => {
    const webApp = getTelegramWebApp();
    return {
      mounted,
      webApp,
      user: webApp?.initDataUnsafe?.user || null,
      colorScheme: webApp?.colorScheme || "light"
    };
  }, [mounted]);
}
