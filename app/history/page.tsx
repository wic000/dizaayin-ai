"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { GenerationCard } from "@/components/generation-card";
import { MobileShell } from "@/components/mobile-shell";
import { TelegramBackButton } from "@/components/telegram-back-button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";

type Generation = {
  id: string;
  prompt: string;
  purpose: string;
  style: string;
  ratio: string;
  status: string;
  error?: string | null;
  createdAt: string;
  images: Array<{ kind: string; url: string }>;
};

export default function HistoryPage() {
  const { dict } = useLanguage();
  const router = useRouter();
  const [generations, setGenerations] = useState<Generation[]>([]);

  useEffect(() => {
    fetch("/api/generations")
      .then((response) => response.json())
      .then((data) => setGenerations(data.generations || []))
      .catch(() => undefined);
  }, []);

  const handleRerun = async (id: string) => {
    const response = await fetch(`/api/generations/${id}/rerun`, { method: "POST" });
    const data = await response.json();
    if (data?.rerunPayload) {
      sessionStorage.setItem("optimall-rerun", JSON.stringify(data.rerunPayload));
      router.push("/create?rerun=1");
    }
  };

  return (
    <>
      <TelegramBackButton enabled />
      <MobileShell title={dict.history.title} subtitle={dict.history.subtitle}>
        {generations.length ? (
          generations.map((generation) => <GenerationCard key={generation.id} generation={generation} onRerun={handleRerun} />)
        ) : (
          <Card className="text-sm">{dict.common.empty}</Card>
        )}
      </MobileShell>
    </>
  );
}
