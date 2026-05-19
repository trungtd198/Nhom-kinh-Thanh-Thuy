'use server';

import { ProductStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';

import { requireAdminUser } from '@/features/admin/auth/guards';
import { createModelSlug } from '@/features/products/product.repository';
import {
  createProductCoverStoragePath,
  createProductGalleryStoragePath,
  createProductModelImageStoragePath,
} from '@/features/uploads/storage-path';
import {
  deleteProductImages,
  uploadProductImage,
} from '@/features/uploads/upload.service';
import { db } from '@/lib/db';

import { parseProductAdminFormData } from './product-admin.validation';

export const revalidateProductPaths = (
  slugs: Array<string | null | undefined>,
) => {
  revalidatePath('/');
  revalidatePath('/san-pham');
  revalidatePath('/sitemap.xml');
  slugs.filter(Boolean).forEach((slug) => {
    revalidatePath(`/san-pham/${slug}`);
  });
};

const getPublishedAt = (
  status: ProductStatus,
  existingPublishedAt?: Date | null,
) => {
  if (status !== ProductStatus.PUBLISHED) {
    return null;
  }

  return existingPublishedAt ?? new Date();
};

const assertUniqueSlug = async (slug: string, currentProductId?: string) => {
  const existing = await db.product.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (existing && existing.id !== currentProductId) {
    throw new Error('Product slug already exists');
  }
};

const getString = (formData: FormData, key: string) =>
  String(formData.get(key) ?? '').trim();

const getOptionalString = (formData: FormData, key: string) => {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
};

const getInt = (formData: FormData, key: string) => {
  const value = Number.parseInt(getString(formData, key), 10);

  return Number.isFinite(value) ? value : 0;
};

const getBoolean = (formData: FormData, key: string) =>
  formData.get(key) === 'on' || formData.get(key) === 'true';

const getImageFileExtension = (file: File) => {
  const extensionFromName = path.extname(file.name);

  if (extensionFromName) {
    return extensionFromName;
  }

  return file.type.split('/')[1] ?? 'webp';
};

const redirectToProductMedia = (productId: string) => {
  redirect(`/admin/products/${productId}?saved=1#media`);
};

const getProductSlugById = async (productId: string) => {
  const product = await db.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
    select: {
      slug: true,
    },
  });

  return product.slug;
};

const assertUniqueModelSlug = async (
  productId: string,
  slug: string,
  currentModelId?: string,
) => {
  const existing = await db.productModel.findUnique({
    where: {
      productId_slug: {
        productId,
        slug,
      },
    },
    select: {
      id: true,
    },
  });

  if (existing && existing.id !== currentModelId) {
    throw new Error('Product model slug already exists');
  }
};

export const createAdminProduct = async (formData: FormData) => {
  await requireAdminUser();

  const payload = parseProductAdminFormData(formData);
  await assertUniqueSlug(payload.slug);

  const product = await db.product.create({
    data: {
      categoryId: payload.categoryId,
      slug: payload.slug,
      name: payload.name,
      heroTitle: payload.heroTitle,
      subtitle: payload.subtitle,
      excerpt: payload.excerpt,
      description: payload.description,
      coverImageUrl: payload.coverImageUrl,
      overviewDescription: payload.overviewDescription,
      overviewValue: payload.overviewValue,
      overviewTargetUsers: payload.overviewTargetUsers,
      overviewReasons: payload.overviewReasons,
      highlights: payload.highlights,
      advantages: payload.advantages,
      applications: payload.applications,
      technicalSpecs: payload.technicalSpecs,
      priceNote: payload.priceNote,
      status: payload.status,
      sortOrder: payload.sortOrder,
      seoTitle: payload.seoTitle,
      seoDescription: payload.seoDescription,
      seoImageUrl: payload.seoImageUrl,
      publishedAt: getPublishedAt(payload.status),
      specs: {
        createMany: {
          data: payload.specs,
        },
      },
      pricing: {
        createMany: {
          data: payload.pricing,
        },
      },
      faqs: {
        createMany: {
          data: payload.faqs,
        },
      },
    },
    select: {
      id: true,
      slug: true,
    },
  });

  revalidateProductPaths([product.slug]);
  redirect(`/admin/products/${product.id}?saved=1`);
};

export const updateAdminProduct = async (formData: FormData) => {
  await requireAdminUser();

  const productId = String(formData.get('productId') ?? '');

  if (!productId) {
    throw new Error('Missing product id');
  }

  const payload = parseProductAdminFormData(formData);
  const existingProduct = await db.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
    select: {
      slug: true,
      publishedAt: true,
    },
  });

  await assertUniqueSlug(payload.slug, productId);

  await db.$transaction(async (tx) => {
    await tx.product.update({
      where: {
        id: productId,
      },
      data: {
        categoryId: payload.categoryId,
        slug: payload.slug,
        name: payload.name,
        heroTitle: payload.heroTitle,
        subtitle: payload.subtitle,
        excerpt: payload.excerpt,
        description: payload.description,
        coverImageUrl: payload.coverImageUrl,
        overviewDescription: payload.overviewDescription,
        overviewValue: payload.overviewValue,
        overviewTargetUsers: payload.overviewTargetUsers,
        overviewReasons: payload.overviewReasons,
        highlights: payload.highlights,
        advantages: payload.advantages,
        applications: payload.applications,
        technicalSpecs: payload.technicalSpecs,
        priceNote: payload.priceNote,
        status: payload.status,
        sortOrder: payload.sortOrder,
        seoTitle: payload.seoTitle,
        seoDescription: payload.seoDescription,
        seoImageUrl: payload.seoImageUrl,
        publishedAt: getPublishedAt(
          payload.status,
          existingProduct.publishedAt,
        ),
      },
    });

    await tx.productSpec.deleteMany({
      where: {
        productId,
      },
    });
    await tx.productPricing.deleteMany({
      where: {
        productId,
      },
    });
    await tx.productFaq.deleteMany({
      where: {
        productId,
      },
    });

    if (payload.specs.length > 0) {
      await tx.productSpec.createMany({
        data: payload.specs.map((spec) => ({
          ...spec,
          productId,
        })),
      });
    }

    if (payload.pricing.length > 0) {
      await tx.productPricing.createMany({
        data: payload.pricing.map((price) => ({
          ...price,
          productId,
        })),
      });
    }

    if (payload.faqs.length > 0) {
      await tx.productFaq.createMany({
        data: payload.faqs.map((faq) => ({
          ...faq,
          productId,
        })),
      });
    }
  });

  revalidateProductPaths([existingProduct.slug, payload.slug]);
  redirect(`/admin/products/${productId}?saved=1`);
};

export const updateAdminProductStatus = async (formData: FormData) => {
  await requireAdminUser();

  const productId = String(formData.get('productId') ?? '');
  const status = String(formData.get('status') ?? '') as ProductStatus;

  if (!productId || !Object.values(ProductStatus).includes(status)) {
    throw new Error('Invalid product status update');
  }

  const existingProduct = await db.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
    select: {
      slug: true,
      publishedAt: true,
    },
  });

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      status,
      publishedAt: getPublishedAt(status, existingProduct.publishedAt),
    },
  });

  revalidateProductPaths([existingProduct.slug]);
  redirect('/admin/products');
};

export const createAdminProductModel = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');
  const name = getString(formData, 'name');
  const type = getString(formData, 'type');
  const slug = getString(formData, 'slug') || createModelSlug(name);

  if (!productId || !name || !type || !slug) {
    throw new Error('Missing product model fields');
  }

  await assertUniqueModelSlug(productId, slug);
  const productSlug = await getProductSlugById(productId);

  await db.productModel.create({
    data: {
      productId,
      slug,
      name,
      type,
      description: getOptionalString(formData, 'description'),
      coverImageUrl: getOptionalString(formData, 'coverImageUrl'),
      sortOrder: getInt(formData, 'sortOrder'),
      isActive: getBoolean(formData, 'isActive'),
    },
  });

  revalidateProductPaths([productSlug]);
  redirectToProductMedia(productId);
};

export const updateAdminProductModel = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');
  const modelId = getString(formData, 'modelId');
  const name = getString(formData, 'name');
  const type = getString(formData, 'type');
  const slug = getString(formData, 'slug') || createModelSlug(name);

  if (!productId || !modelId || !name || !type || !slug) {
    throw new Error('Missing product model fields');
  }

  await assertUniqueModelSlug(productId, slug, modelId);
  const productSlug = await getProductSlugById(productId);

  await db.productModel.update({
    where: {
      id: modelId,
    },
    data: {
      slug,
      name,
      type,
      description: getOptionalString(formData, 'description'),
      coverImageUrl: getOptionalString(formData, 'coverImageUrl'),
      sortOrder: getInt(formData, 'sortOrder'),
      isActive: getBoolean(formData, 'isActive'),
    },
  });

  revalidateProductPaths([productSlug]);
  redirectToProductMedia(productId);
};

export const deleteAdminProductModel = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');
  const modelId = getString(formData, 'modelId');

  if (!productId || !modelId) {
    throw new Error('Missing product model id');
  }

  const productSlug = await getProductSlugById(productId);
  const model = await db.productModel.findUniqueOrThrow({
    where: {
      id: modelId,
    },
    include: {
      images: true,
    },
  });

  await db.productModel.delete({
    where: {
      id: modelId,
    },
  });
  await deleteProductImages(
    model.images
      .map((image) => image.storagePath)
      .filter((item): item is string => Boolean(item)),
  );

  revalidateProductPaths([productSlug]);
  redirectToProductMedia(productId);
};

export const uploadAdminProductImage = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');
  const modelId = getOptionalString(formData, 'modelId');
  const file = formData.get('image');
  const shouldSetCover = getBoolean(formData, 'isCover');

  if (!productId || !(file instanceof File) || file.size === 0) {
    throw new Error('Missing image file');
  }

  const productSlug = await getProductSlugById(productId);
  const imageId = crypto.randomUUID();
  const extension = getImageFileExtension(file);
  let storagePath = createProductGalleryStoragePath({
    productId,
    imageId,
    extension,
  });

  if (shouldSetCover) {
    storagePath = createProductCoverStoragePath({
      productId,
      imageId,
      extension,
    });
  }

  if (modelId) {
    storagePath = createProductModelImageStoragePath({
      productId,
      modelId,
      imageId,
      extension,
    });
  }
  const uploadedImage = await uploadProductImage({
    path: storagePath,
    file,
    contentType: file.type || 'application/octet-stream',
  });
  const existingCover = await db.productImage.findFirst({
    where: {
      productId,
      modelId,
      isCover: true,
    },
    select: {
      id: true,
    },
  });
  const isCover = shouldSetCover || !existingCover;

  await db.$transaction(async (tx) => {
    if (isCover) {
      await tx.productImage.updateMany({
        where: {
          productId,
          modelId,
        },
        data: {
          isCover: false,
        },
      });
    }

    await tx.productImage.create({
      data: {
        id: imageId,
        productId,
        modelId,
        storagePath: uploadedImage.path,
        publicUrl: uploadedImage.publicUrl,
        alt: getOptionalString(formData, 'alt'),
        caption: getOptionalString(formData, 'caption'),
        sortOrder: getInt(formData, 'sortOrder'),
        isCover,
      },
    });

    if (isCover && modelId) {
      await tx.productModel.update({
        where: {
          id: modelId,
        },
        data: {
          coverImageUrl: uploadedImage.publicUrl,
        },
      });
    }

    if (isCover && !modelId) {
      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          coverImageUrl: uploadedImage.publicUrl,
          seoImageUrl: uploadedImage.publicUrl,
        },
      });
    }
  });

  revalidateProductPaths([productSlug]);
  redirectToProductMedia(productId);
};

export const setAdminProductImageCover = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');
  const imageId = getString(formData, 'imageId');

  if (!productId || !imageId) {
    throw new Error('Missing image id');
  }

  const productSlug = await getProductSlugById(productId);
  const image = await db.productImage.findUniqueOrThrow({
    where: {
      id: imageId,
    },
  });

  await db.$transaction(async (tx) => {
    await tx.productImage.updateMany({
      where: {
        productId: image.productId,
        modelId: image.modelId,
      },
      data: {
        isCover: false,
      },
    });
    await tx.productImage.update({
      where: {
        id: imageId,
      },
      data: {
        isCover: true,
      },
    });

    if (image.modelId) {
      await tx.productModel.update({
        where: {
          id: image.modelId,
        },
        data: {
          coverImageUrl: image.publicUrl,
        },
      });
    } else {
      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          coverImageUrl: image.publicUrl,
          seoImageUrl: image.publicUrl,
        },
      });
    }
  });

  revalidateProductPaths([productSlug]);
  redirectToProductMedia(productId);
};

export const deleteAdminProductImage = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');
  const imageId = getString(formData, 'imageId');

  if (!productId || !imageId) {
    throw new Error('Missing image id');
  }

  const productSlug = await getProductSlugById(productId);
  const image = await db.productImage.findUniqueOrThrow({
    where: {
      id: imageId,
    },
  });

  await db.productImage.delete({
    where: {
      id: imageId,
    },
  });

  if (image.storagePath) {
    await deleteProductImages([image.storagePath]);
  }

  if (image.isCover) {
    if (image.modelId) {
      await db.productModel.update({
        where: {
          id: image.modelId,
        },
        data: {
          coverImageUrl: null,
        },
      });
    } else {
      await db.product.update({
        where: {
          id: productId,
        },
        data: {
          coverImageUrl: null,
        },
      });
    }
  }

  revalidateProductPaths([productSlug]);
  redirectToProductMedia(productId);
};
