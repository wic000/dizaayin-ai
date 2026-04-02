"use client";

import { useEffect } from "react";

import { getTelegramWebApp } from "@/lib/telegram";

export function TelegramThemeSync() {
  useEffect(() => {
    const webApp = getTelegramWebApp();
    const root = document.documentElement;
    const scheme = webApp?.colorScheme || "light";
    root.classList.toggle("dark", scheme === "dark");
    if (webApp?.themeParams?.bg_color) root.style.setProperty("--tg-bg", webApp.themeParams.bg_color);
    if (webApp?.themeParams?.text_color) root.style.setProperty("--tg-text", webApp.themeParams.text_color);
  }, []);

  return null;
}
