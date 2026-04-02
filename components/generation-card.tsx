"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

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

export function GenerationCard({ generation, onRerun }: { generation: Generation; onRerun?: (id: string) => void }) {
  const { locale, dict } = useLanguage();
  const input = generation.images.find((image) => image.kind === "INPUT");
  const output = generation.images.find((image) => image.kind === "OUTPUT");

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold">{generation.purpose.replaceAll("_", " ")}</p>
          <p className="mt-1 text-xs text-foreground/60 dark:text-white/60">{formatDate(generation.createdAt, locale)}</p>
        </div>
        <Badge>{generation.status}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {input?.url ? <Image alt="Input" className="h-28 w-full rounded-2xl object-cover" height={160} src={input.url} width={160} /> : null}
        {output?.url ? (
          <Image alt="Output" className="h-28 w-full rounded-2xl object-cover" height={160} src={output.url} width={160} />
        ) : (
          <div className="flex h-28 items-center justify-center rounded-2xl bg-black/5 text-xs text-foreground/55 dark:bg-white/5 dark:text-white/55">
            {dict.common.processing}
          </div>
        )}
      </div>

      <p className="line-clamp-3 text-sm leading-6 text-foreground/72 dark:text-white/72">{generation.prompt}</p>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55 dark:text-white/55">
          {generation.style} • {generation.ratio}
        </p>
        <div className="flex gap-2">
          {output?.url ? (
            <a href={output.url} download className="inline-flex">
              <Button size="sm" type="button" variant="outline">
                {dict.common.download}
              </Button>
            </a>
          ) : null}
          {onRerun ? (
            <Button size="sm" type="button" variant="secondary" onClick={() => onRerun(generation.id)}>
              {dict.common.rerun}
            </Button>
          ) : null}
        </div>
      </div>
      {generation.error ? <p className="text-xs text-red-500">{generation.error}</p> : null}
    </Card>
  );
}
