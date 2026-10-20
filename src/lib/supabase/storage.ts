/**
 * Supabase Storage helpers
 * Upload/download files từ Supabase Storage
 */
import { createSupabaseServiceClient } from './server';

export const BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  COVER_IMAGES: 'cover-images',
} as const;

export type BucketName = (typeof BUCKETS)[keyof typeof BUCKETS];

/**
 * Upload file lên Supabase Storage
 */
export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: Buffer | Blob,
  contentType: string,
): Promise<{ publicUrl: string; storagePath: string }> {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return { publicUrl: data.publicUrl, storagePath: path };
}

/**
 * Xóa file khỏi Supabase Storage
 */
export async function deleteFile(
  bucket: BucketName,
  path: string,
): Promise<void> {
  const { error } = await createSupabaseServiceClient()
    .storage.from(bucket)
    .remove([path]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}

/**
 * Lấy public URL của file
 */
export function getPublicUrl(bucket: BucketName, path: string): string {
  const { data } = createSupabaseServiceClient()
    .storage.from(bucket)
    .getPublicUrl(path);
  return data.publicUrl;
}
