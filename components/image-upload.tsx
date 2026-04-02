"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type UploadPreview = {
  file: File;
  preview: string;
};

export function ImageUpload({ files, onChange }: { files: UploadPreview[]; onChange: (files: UploadPreview[]) => void }) {
  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files || []).slice(0, 4);
    const previews = nextFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    onChange(previews);
  };

  return (
    <div className="space-y-3">
      <label className="block">
        <input className="hidden" multiple accept="image/png,image/jpeg,image/webp" type="file" onChange={handleFiles} />
        <Card className="flex cursor-pointer items-center gap-3 border-dashed">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
            <ImagePlus className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">Upload up to 4 product images</p>
            <p className="mt-1 text-xs text-foreground/65 dark:text-white/65">JPG, PNG, WEBP. Max 8MB each.</p>
          </div>
        </Card>
      </label>

      {files.length ? (
        <div className="grid grid-cols-2 gap-3">
          {files.map((item, index) => (
            <Card key={`${item.file.name}-${index}`} className="relative overflow-hidden p-0">
              <Image alt={item.file.name} className="h-36 w-full object-cover" height={160} src={item.preview} width={160} />
              <Button
                className="absolute right-2 top-2 h-8 w-8 rounded-full p-0"
                size="sm"
                type="button"
                variant="secondary"
                onClick={() => onChange(files.filter((_, fileIndex) => fileIndex !== index))}
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
