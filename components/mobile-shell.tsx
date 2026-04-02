"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Home, Layers3, PlusSquare, Sparkles, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", key: "home", icon: Home },
  { href: "/create", key: "create", icon: PlusSquare },
  { href: "/templates", key: "templates", icon: Layers3 },
  { href: "/history", key: "history", icon: History },
  { href: "/premium", key: "premium", icon: Sparkles },
  { href: "/profile", key: "profile", icon: UserRound }
] as const;

export function MobileShell({
  title,
  subtitle,
  accent,
  children
}: {
  title: string;
  subtitle?: string;
  accent?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { dict } = useLanguage();

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-hero-glow px-4 pb-[calc(110px+var(--safe-bottom))] pt-[calc(20px+var(--safe-top))] text-foreground dark:bg-hero-glow-dark dark:text-white">
      <header className="animate-fade-up">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge>{dict.common.appName}</Badge>
            <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.02]">{title}</h1>
            {subtitle ? <p className="mt-2 max-w-[18rem] text-sm leading-6 text-foreground/72 dark:text-white/70">{subtitle}</p> : null}
          </div>
          {accent}
        </div>
      </header>

      <main className="mt-6 space-y-4">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-md gap-1 border-t border-black/5 bg-white/90 px-2 pb-[calc(10px+var(--safe-bottom))] pt-2 backdrop-blur-xl dark:border-white/10 dark:bg-[#151316]/90">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const label = dict.nav[item.key as keyof typeof dict.nav];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition",
                active ? "bg-brand-orange text-white shadow-soft" : "text-foreground/65 dark:text-white/70"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
