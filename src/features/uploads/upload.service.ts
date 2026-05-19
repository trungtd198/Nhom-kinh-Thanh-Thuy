import { getOptionalServerEnv } from '@/lib/env';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

const DEFAULT_CACHE_CONTROL_SECONDS = '31536000';
const DEFAULT_STORAGE_BUCKET = 'product-images';

type UploadImageInput = {
  path: string;
  file: Blob;
  contentType: string;
  cacheControl?: string;
  upsert?: boolean;
};

type CreateSignedUploadUrlInput = {
  path: string;
};

const getStorageBucket = () =>
  getOptionalServerEnv('SUPABASE_STORAGE_BUCKET', DEFAULT_STORAGE_BUCKET);

export const uploadProductImage = async ({
  path,
  file,
  contentType,
  cacheControl = DEFAULT_CACHE_CONTROL_SECONDS,
  upsert = false,
}: UploadImageInput) => {
  const supabase = createSupabaseServiceClient();
  const bucket = getStorageBucket();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl,
      contentType,
      upsert,
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    bucket,
    path: data.path,
    publicUrl: publicUrlData.publicUrl,
  };
};

export const createProductImageSignedUploadUrl = async ({
  path,
}: CreateSignedUploadUrlInput) => {
  const bucket = getStorageBucket();
  const { data, error } = await createSupabaseServiceClient()
    .storage.from(bucket)
    .createSignedUploadUrl(path);

  if (error) {
    throw error;
  }

  return {
    bucket,
    path,
    signedUrl: data.signedUrl,
    token: data.token,
  };
};

export const deleteProductImages = async (paths: string[]) => {
  if (paths.length === 0) {
    return;
  }

  const { error } = await createSupabaseServiceClient()
    .storage.from(getStorageBucket())
    .remove(paths);

  if (error) {
    throw error;
  }
};
