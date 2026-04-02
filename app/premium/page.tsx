"use client";

import { useState } from "react";

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
  const [files, setFiles] = useState<UploadPreview[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ path: string; mimeType: string }>>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const syncUploads = async (nextFiles: UploadPreview[]) => {
    setFiles(nextFiles);
    if (!nextFiles.length) {
      setUploadedFiles([]);
      return;
    }

    const formData = new FormData();
    nextFiles.forEach((entry) => formData.append("files", entry.file));

    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await response.json();
    setUploadedFiles((data.files || []).map((file: { path: string; mimeType: string }) => ({ path: file.path, mimeType: file.mimeType })));
  };

  const submit = async () => {
    const response = await fetch("/api/premium-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        deadline,
        telegramUsername: username,
        contact,
        referenceImages: uploadedFiles
      })
    });

    const data = await response.json();
    setMessage(response.ok ? "Premium request submitted." : data.error || "Request failed.");
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
          <Button className="w-full" type="button" onClick={submit}>
            {dict.common.submit}
          </Button>
          {message ? <p className="text-sm text-foreground/72 dark:text-white/72">{message}</p> : null}
        </Card>
      </MobileShell>
    </>
  );
}
