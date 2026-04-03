"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ImageUpload, type UploadPreview } from "@/components/image-upload";
import { MobileShell } from "@/components/mobile-shell";
import { TelegramBackButton } from "@/components/telegram-back-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/providers/language-provider";

export default function PremiumPage() {
  const { dict } = useLanguage();
  const router = useRouter();
  const [files, setFiles] = useState<UploadPreview[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const syncUploads = (nextFiles: UploadPreview[]) => {
    setFiles(nextFiles);
  };

  const submit = async () => {
    if (submitting) return;

    setSubmitting(true);
    setMessage(null);

    const referenceNames = files.map((file) => file.file.name).join(", ");
    const enrichedDescription = referenceNames
      ? `${description}\n\nReference files selected by user: ${referenceNames}`
      : description;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/premium-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          title,
          description: enrichedDescription,
          deadline,
          telegramUsername: username,
          contact,
          referenceImages: []
        })
      });

      clearTimeout(timeout);

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Request failed.");
        return;
      }

      setMessage("Buyurtma yuborildi.");
      setTitle("");
      setDescription("");
      setDeadline("");
      setUsername("");
      setContact("");
      setFiles([]);

      setTimeout(() => {
        router.push("/history");
      }, 800);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Request failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TelegramBackButton enabled />
      <MobileShell title={dict.premium.title} subtitle={dict.premium.subtitle}>
        <Card className="text-sm leading-6">{dict.premium.helper}</Card>
        <Card className="space-y-4">
          <Input placeholder={dict.common.title} value={title} onChange={(event) => setTitle(event.target.value)} />
          <Textarea placeholder={dict.common.description} value={description} onChange={(event) => setDescription(event.target.value)} />
          <Input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
          <Input placeholder="Telegram username" value={username} onChange={(event) => setUsername(event.target.value)} />
          <Input placeholder={dict.common.contact} value={contact} onChange={(event) => setContact(event.target.value)} />
          <ImageUpload files={files} onChange={syncUploads} />
          <p className="text-xs leading-5 text-foreground/60 dark:text-white/60">
            Buyurtma qotib qolmasligi uchun reference rasmlar hozir faqat preview sifatida tanlanadi. Asosiy so'rov tez yuboriladi.
          </p>
          <Button className="w-full" disabled={submitting} type="button" onClick={submit}>
            {submitting ? "Yuborilmoqda..." : dict.common.submit}
          </Button>
          {message ? <p className="text-sm text-foreground/72 dark:text-white/72">{message}</p> : null}
        </Card>
      </MobileShell>
    </>
  );
}
