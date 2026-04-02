"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getTelegramWebApp } from "@/lib/telegram";

export function TelegramBackButton({ enabled }: { enabled: boolean }) {
  const router = useRouter();

  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp?.BackButton) return;

    const handleClick = () => router.back();

    if (enabled) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(handleClick);
    } else {
      webApp.BackButton.hide();
    }

    return () => {
      webApp.BackButton.offClick(handleClick);
      webApp.BackButton.hide();
    };
  }, [enabled, router]);

  return null;
}
