export type GenerateVisualInput = {
  prompt: string;
  ratio: string;
  images: {
    path: string;
    publicUrl?: string;
    mimeType?: string;
  }[];
};

export type GenerateVisualResult = {
  provider: string;
  providerJobId?: string;
  mimeType: string;
  base64Data: string;
};
