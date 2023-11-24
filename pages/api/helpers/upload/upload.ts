import { StorageClient } from "@supabase/storage-js";

const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY ?? "",
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const bucket = storageClient.from("images");

export function getPublicUrl(path: string) {
  return bucket.getPublicUrl(path).data.publicUrl;
}

export async function upload(id: string, buffer: Buffer, contentType: string) {
  const { data, error } = await bucket.upload(`${id}`, buffer, {
    cacheControl: "max-age=31536000",
    contentType,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteAssets(ids: string[]) {
  const { data, error } = await bucket.remove(ids);
  if (error) {
    throw error;
  }

  return data;
}
