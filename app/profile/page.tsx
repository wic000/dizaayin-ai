"use client";

import { useEffect, useState } from "react";

import { MobileShell } from "@/components/mobile-shell";
import { OptionChips } from "@/components/option-chips";
import { TelegramBackButton } from "@/components/telegram-back-button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";
import { formatDate } from "@/lib/utils";

type ProfileData = {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    telegramId: string;
  };
  stats: {
    generationCount: number;
    premiumOrderCount: number;
  };
  announcements: Array<{
    id: string;
    title: string;
    body: string;
    createdAt: string;
  }>;
};

export default function ProfilePage() {
  const { locale, setLocale, dict } = useLanguage();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch(() => undefined);
  }, []);

  return (
    <>
      <TelegramBackButton enabled />
      <MobileShell title={dict.profile.title} subtitle={dict.profile.subtitle}>
        <Card className="space-y-2">
          <p className="text-lg font-bold">
            {[profile?.user?.firstName, profile?.user?.lastName].filter(Boolean).join(" ") || "@telegram"}
          </p>
          <p className="text-sm text-foreground/70 dark:text-white/70">@{profile?.user?.username || "unknown"}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-foreground/55 dark:text-white/55">ID {profile?.user?.telegramId}</p>
        </Card>

        <Card className="space-y-4">
          <p className="text-sm font-semibold">{dict.common.language}</p>
          <OptionChips
            options={[
              { value: "uz", label: "Uz" },
              { value: "ru", label: "Ru" },
              { value: "en", label: "En" }
            ]}
            value={locale}
            onChange={(value) => setLocale(value as typeof locale)}
          />
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card>
            <p className="text-xs uppercase tracking-[0.16em] text-foreground/55 dark:text-white/55">{dict.profile.generated}</p>
            <p className="mt-1 text-2xl font-bold">{profile?.stats.generationCount ?? 0}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.16em] text-foreground/55 dark:text-white/55">{dict.profile.orders}</p>
            <p className="mt-1 text-2xl font-bold">{profile?.stats.premiumOrderCount ?? 0}</p>
          </Card>
        </div>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">{dict.profile.announcements}</p>
          {profile?.announcements?.length ? (
            profile.announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-3xl bg-black/5 p-4 dark:bg-white/5">
                <p className="text-sm font-bold">{announcement.title}</p>
                <p className="mt-2 text-sm leading-6 text-foreground/72 dark:text-white/72">{announcement.body}</p>
                <p className="mt-2 text-xs text-foreground/55 dark:text-white/55">{formatDate(announcement.createdAt, locale)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm">{dict.common.empty}</p>
          )}
        </Card>
      </MobileShell>
    </>
  );
}
