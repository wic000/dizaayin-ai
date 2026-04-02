"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

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
          mobile-first AI interior redesign flow for apartments, houses, offices, and unfinished rooms in Uzbekistan.
        </p>
        <div className="mt-5">
          <Link className="block" href="/create">
            <Button className="w-full" type="button">
              {dict.home.primaryCta}
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

      <div className="grid grid-cols-1 gap-3">
        <StatCard label={dict.profile.generated} value={profile?.stats.generationCount ?? 0} />
      </div>
    </MobileShell>
  );
}
