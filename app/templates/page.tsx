"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MobileShell } from "@/components/mobile-shell";
import { TemplateCard } from "@/components/template-card";
import { TelegramBackButton } from "@/components/telegram-back-button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";

type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  style: string;
  ratio: string;
};

export default function TemplatesPage() {
  const { dict } = useLanguage();
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetch("/api/templates")
      .then((response) => response.json())
      .then((data) => setTemplates(data.templates || []))
      .catch(() => undefined);
  }, []);

  return (
    <>
      <TelegramBackButton enabled />
      <MobileShell title={dict.templates.title} subtitle={dict.templates.subtitle}>
        {templates.length ? (
          templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={(id) => router.push(`/create?templateId=${id}`)}
            />
          ))
        ) : (
          <Card className="text-sm">{dict.common.loading}</Card>
        )}
      </MobileShell>
    </>
  );
}
