"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { MobileShell } from "@/components/mobile-shell";
import { SectionHeader } from "@/components/section-header";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";

type ProfileResponse = {
  user: { firstName?: string | null; username?: string | null };
  stats: { generationCount: number; premiumOrderCount: number };
};

export function HomePage() {
  const { dict } = useLanguage();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch(() => undefined);
  }, []);

  return (
    <MobileShell
      title={dict.home.title}
      subtitle={dict.home.subtitle}
      accent={
        <div className="rounded-[28px] bg-brand-ink p-4 text-white shadow-float">
          <Sparkles className="h-6 w-6" />
        </div>
      }
    >
      <Card className="overflow-hidden bg-brand-ink text-white">
        <Badge className="bg-white/10 text-white">{dict.home.badge}</Badge>
        <p className="mt-4 text-sm leading-6 text-white/74">
          {profile?.user?.firstName ? `${profile.user.firstName}, ` : ""}
          mobile-first AI design flow for Uzbekistan sellers.
        </p>
        <div className="mt-5 flex gap-3">
          <Link className="flex-1" href="/create">
            <Button className="w-full" type="button">
              {dict.home.primaryCta}
            </Button>
          </Link>
          <Link className="flex-1" href="/templates">
            <Button className="w-full border-white/15 bg-white/10 text-white" type="button" variant="outline">
              {dict.home.secondaryCta}
            </Button>
          </Link>
        </div>
      </Card>

      <Card>
        <SectionHeader eyebrow="Optimized" title={dict.home.quickTitle} />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {dict.home.quickItems.map((item) => (
            <div key={item} className="rounded-3xl bg-black/5 p-4 text-sm font-semibold dark:bg-white/5">
              {item}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label={dict.profile.generated} value={profile?.stats.generationCount ?? 0} />
        <StatCard label={dict.profile.orders} value={profile?.stats.premiumOrderCount ?? 0} />
      </div>

      <Card className="flex items-center justify-between gap-3">
        <div>
          <p className="text-base font-bold">Admin workspace</p>
          <p className="mt-1 text-sm text-foreground/70 dark:text-white/70">Templates, pricing, announcements, and failed jobs.</p>
        </div>
        <Link href="/admin">
          <Button size="sm" type="button" variant="secondary">
            {dict.common.admin}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </Card>
    </MobileShell>
  );
}
