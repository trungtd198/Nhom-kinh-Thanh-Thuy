const DEFAULT_IMAGE_EXTENSION = 'webp';

type ProductImageStoragePathInput = {
  productId: string;
  imageId: string;
  extension?: string;
};

type ProductModelImageStoragePathInput = ProductImageStoragePathInput & {
  modelId: string;
};

const normalizeExtension = (extension = DEFAULT_IMAGE_EXTENSION) =>
  extension.replace(/^\./, '').toLowerCase();

export const createProductCoverStoragePath = ({
  productId,
  imageId,
  extension,
}: ProductImageStoragePathInput) =>
  `products/${productId}/cover/${imageId}.${normalizeExtension(extension)}`;

export const createProductGalleryStoragePath = ({
  productId,
  imageId,
  extension,
}: ProductImageStoragePathInput) =>
  `products/${productId}/gallery/${imageId}.${normalizeExtension(extension)}`;

export const createProductModelImageStoragePath = ({
  productId,
  modelId,
  imageId,
  extension,
}: ProductModelImageStoragePathInput) =>
  `products/${productId}/models/${modelId}/${imageId}.${normalizeExtension(
    extension,
  )}`;
