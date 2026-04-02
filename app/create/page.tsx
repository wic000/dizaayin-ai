"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { ImageUpload, type UploadPreview } from "@/components/image-upload";
import { MobileShell } from "@/components/mobile-shell";
import { OptionChips } from "@/components/option-chips";
import { TemplateCard } from "@/components/template-card";
import { TelegramBackButton } from "@/components/telegram-back-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/providers/language-provider";

const purposeOptions = [
  { value: "living_room", label: "Living room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "office", label: "Office" },
  { value: "facade", label: "Facade" },
  { value: "studio", label: "Studio" }
];

const styleOptions = [
  { value: "modern", label: "Modern" },
  { value: "luxury", label: "Luxury" },
  { value: "minimal", label: "Minimal" },
  { value: "scandinavian", label: "Scandinavian" },
  { value: "classic", label: "Classic" },
  { value: "warm", label: "Warm" },
  { value: "dark", label: "Dark" },
  { value: "bright", label: "Bright" },
  { value: "industrial", label: "Industrial" },
  { value: "kids", label: "Kids" },
  { value: "premium", label: "Premium" }
];

const ratioOptions = ["16:9", "9:16", "4:5", "1:1"].map((value) => ({ value, label: value }));
const localeOptions = [
  { value: "uz", label: "Uzbek" },
  { value: "ru", label: "Russian" },
  { value: "en", label: "English" }
];

type UploadedFile = {
  path: string;
  publicUrl: string;
  mimeType: string;
  sizeBytes: number;
};

type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  style: string;
  ratio: string;
};

export default function CreatePage() {
  const { locale, dict } = useLanguage();
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<UploadPreview[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(searchParams.get("templateId") || undefined);
  const [purpose, setPurpose] = useState("living_room");
  const [style, setStyle] = useState("modern");
  const [ratio, setRatio] = useState("16:9");
  const [outputLanguage, setOutputLanguage] = useState(locale);
  const [customPrompt, setCustomPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [statusLabel, setStatusLabel] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/templates")
      .then((response) => response.json())
      .then((data) => setTemplates(data.templates || []))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (searchParams.get("rerun")) {
      const raw = sessionStorage.getItem("optimall-rerun");
      if (raw) {
        const payload = JSON.parse(raw);
        setPurpose(payload.purpose);
        setStyle(payload.style);
        setRatio(payload.ratio);
        setOutputLanguage(payload.language);
        setCustomPrompt(payload.customPrompt || "");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!files.length) {
      setUploadedFiles([]);
      return;
    }

    const formData = new FormData();
    files.forEach((entry) => formData.append("files", entry.file));

    fetch("/api/upload", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => setUploadedFiles(data.files || []))
      .catch(() => setUploadedFiles([]));
  }, [files]);

  const selectedTemplateCard = useMemo(
    () => templates.find((template) => template.id === selectedTemplate),
    [selectedTemplate, templates]
  );

  const submit = async () => {
    setSubmitting(true);
    setStatusLabel(dict.create.generating);
    setResultUrl(null);

    try {
      const response = await fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePaths: uploadedFiles.map((file) => ({
            path: file.path,
            mimeType: file.mimeType,
            sizeBytes: file.sizeBytes
          })),
          purpose,
          style,
          language: outputLanguage,
          ratio,
          customPrompt,
          templateId: selectedTemplate
        })
      });

      const data = await response.json();
      const output = data?.generation?.images?.find((image: { kind: string; url: string }) => image.kind === "OUTPUT");

      if (output?.url) {
        setResultUrl(output.url);
        setStatusLabel(dict.common.completed);
      } else {
        setStatusLabel(data?.generation?.error || dict.common.processing);
      }
    } catch (error) {
      setStatusLabel(error instanceof Error ? error.message : dict.common.failed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TelegramBackButton enabled />
      <MobileShell title={dict.create.title} subtitle={dict.create.subtitle}>
        <Card className="space-y-4">
          <p className="text-sm font-semibold">{dict.create.images}</p>
          <ImageUpload files={files} onChange={setFiles} />
          <p className="text-xs leading-5 text-foreground/60 dark:text-white/60">
            Empty room, rough renovation stage, new building room, facade, or unfinished apartment photos work best.
          </p>
        </Card>

        <Card className="space-y-4">
          <p className="text-sm font-semibold">{dict.create.templates}</p>
          <div className="space-y-3">
            {templates.slice(0, 3).map((template) => (
              <TemplateCard key={template.id} template={template} onUse={setSelectedTemplate} />
            ))}
          </div>
          {selectedTemplateCard ? <p className="text-xs text-foreground/60 dark:text-white/60">Selected: {selectedTemplateCard.title}</p> : null}
        </Card>

        <Card className="space-y-4">
          <p className="text-sm font-semibold">{dict.create.purpose}</p>
          <OptionChips options={purposeOptions} value={purpose} onChange={setPurpose} />
          <p className="text-sm font-semibold">{dict.create.style}</p>
          <OptionChips options={styleOptions} value={style} onChange={setStyle} />
          <p className="text-sm font-semibold">{dict.create.ratio}</p>
          <OptionChips options={ratioOptions} value={ratio} onChange={setRatio} />
          <p className="text-sm font-semibold">{dict.create.language}</p>
          <OptionChips options={localeOptions} value={outputLanguage} onChange={(value) => setOutputLanguage(value as typeof locale)} />
          <p className="text-sm font-semibold">{dict.create.customPrompt}</p>
          <Textarea placeholder={dict.create.customPromptPlaceholder} value={customPrompt} onChange={(event) => setCustomPrompt(event.target.value)} />
        </Card>

        <div className="sticky bottom-[calc(76px+var(--safe-bottom))] z-40">
          <Button className="w-full" disabled={submitting || !uploadedFiles.length} size="lg" type="button" onClick={submit}>
            {submitting ? dict.create.generating : dict.common.generate}
          </Button>
        </div>

        <Card className="space-y-3">
          <p className="text-sm font-semibold">{dict.create.result}</p>
          {resultUrl ? (
            <Image alt="Result" className="h-auto w-full rounded-[24px] object-cover" height={480} src={resultUrl} width={480} />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-[24px] border border-dashed border-black/10 text-sm text-foreground/55 dark:border-white/10 dark:text-white/55">
              {statusLabel || dict.common.empty}
            </div>
          )}
          {resultUrl ? (
            <a href={resultUrl} download className="block">
              <Button className="w-full" type="button" variant="outline">
                {dict.common.download}
              </Button>
            </a>
          ) : null}
        </Card>
      </MobileShell>
    </>
  );
}
