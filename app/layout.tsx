import type { Metadata } from "next";

import { AuthGuard } from "@/components/auth-guard";
import { AppProviders } from "@/components/providers/app-providers";
import { TelegramThemeSync } from "@/components/telegram-theme-sync";

import "./globals.css";

export const metadata: Metadata = {
  title: "Optimall Design",
  description: "Telegram Mini App for AI-powered commercial design generation."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <TelegramThemeSync />
          <AuthGuard>{children}</AuthGuard>
        </AppProviders>
      </body>
    </html>
  );
}
