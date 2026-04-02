"use client";

import { useEffect, useState } from "react";

import { MobileShell } from "@/components/mobile-shell";
import { TelegramBackButton } from "@/components/telegram-back-button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";

type AdminData = {
  stats?: {
    users: number;
    generations: number;
    completed: number;
    failed: number;
    premiumOrders: number;
    newOrders: number;
    templates: number;
  };
  users?: Array<{ id: string; firstName?: string | null; username?: string | null; telegramId: string }>;
  generations?: Array<{ id: string; purpose: string; status: string; user: { username?: string | null } }>;
  orders?: Array<{ id: string; title: string; contact: string; status: string; user: { username?: string | null } }>;
  templates?: Array<{ id: string; title: string; category: string; language: string }>;
  settings?: Record<string, unknown>;
  announcements?: Array<{ id: string; title: string; language: string }>;
  error?: string;
};

export default function AdminPage() {
  const { dict } = useLanguage();
  const [data, setData] = useState<AdminData>({});

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/dashboard").then((response) => response.json()),
      fetch("/api/admin/users").then((response) => response.json()),
      fetch("/api/admin/generations").then((response) => response.json()),
      fetch("/api/admin/orders").then((response) => response.json()),
      fetch("/api/admin/templates").then((response) => response.json()),
      fetch("/api/admin/settings").then((response) => response.json()),
      fetch("/api/admin/announcements").then((response) => response.json())
    ])
      .then(([dashboard, users, generations, orders, templates, settings, announcements]) =>
        setData({
          ...dashboard,
          ...users,
          ...generations,
          ...orders,
          ...templates,
          ...settings,
          ...announcements
        })
      )
      .catch(() => setData({ error: "Admin access denied." }));
  }, []);

  return (
    <>
      <TelegramBackButton enabled />
      <MobileShell title={dict.admin.title} subtitle={dict.admin.subtitle}>
        {data.error ? (
          <Card className="text-sm">{data.error}</Card>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Card><p className="text-xs uppercase tracking-[0.16em]">{dict.admin.users}</p><p className="mt-1 text-2xl font-bold">{data.stats?.users ?? 0}</p></Card>
              <Card><p className="text-xs uppercase tracking-[0.16em]">{dict.admin.generations}</p><p className="mt-1 text-2xl font-bold">{data.stats?.generations ?? 0}</p></Card>
              <Card><p className="text-xs uppercase tracking-[0.16em]">Failed jobs</p><p className="mt-1 text-2xl font-bold">{data.stats?.failed ?? 0}</p></Card>
              <Card><p className="text-xs uppercase tracking-[0.16em]">{dict.admin.orders}</p><p className="mt-1 text-2xl font-bold">{data.stats?.premiumOrders ?? 0}</p></Card>
            </div>

            <Card className="space-y-3">
              <p className="text-sm font-semibold">{dict.admin.users}</p>
              {data.users?.slice(0, 6).map((user) => (
                <div key={user.id} className="rounded-3xl bg-black/5 p-3 text-sm dark:bg-white/5">
                  {user.firstName || "@telegram"} @{user.username || "unknown"}
                </div>
              ))}
            </Card>

            <Card className="space-y-3">
              <p className="text-sm font-semibold">{dict.admin.generations}</p>
              {data.generations?.slice(0, 6).map((generation) => (
                <div key={generation.id} className="rounded-3xl bg-black/5 p-3 text-sm dark:bg-white/5">
                  {generation.purpose} • {generation.status} • @{generation.user?.username || "user"}
                </div>
              ))}
            </Card>

            <Card className="space-y-3">
              <p className="text-sm font-semibold">{dict.admin.orders}</p>
              {data.orders?.slice(0, 6).map((order) => (
                <div key={order.id} className="rounded-3xl bg-black/5 p-3 text-sm dark:bg-white/5">
                  {order.title} • {order.status} • {order.contact}
                </div>
              ))}
            </Card>

            <Card className="space-y-3">
              <p className="text-sm font-semibold">{dict.admin.templates}</p>
              {data.templates?.slice(0, 6).map((template) => (
                <div key={template.id} className="rounded-3xl bg-black/5 p-3 text-sm dark:bg-white/5">
                  {template.title} • {template.category} • {template.language}
                </div>
              ))}
            </Card>
          </>
        )}
      </MobileShell>
    </>
  );
}
