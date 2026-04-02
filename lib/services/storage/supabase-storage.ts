import { createClient } from "@supabase/supabase-js";

import { STORAGE_BUCKETS } from "@/lib/constants";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase storage is not configured.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false
    }
  });
}

export async function uploadBufferToStorage(params: {
  bucket: keyof typeof STORAGE_BUCKETS;
  path: string;
  buffer: Buffer;
  contentType: string;
}) {
  const client = getAdminClient();
  const bucketName = STORAGE_BUCKETS[params.bucket];

  const { error } = await client.storage.from(bucketName).upload(params.path, params.buffer, {
    contentType: params.contentType,
    upsert: true
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = client.storage.from(bucketName).getPublicUrl(params.path);

  return {
    path: params.path,
    publicUrl: data.publicUrl
  };
}

export function getPublicStorageUrl(bucket: keyof typeof STORAGE_BUCKETS, path: string) {
  const client = getAdminClient();
  const bucketName = STORAGE_BUCKETS[bucket];
  return client.storage.from(bucketName).getPublicUrl(path).data.publicUrl;
}
