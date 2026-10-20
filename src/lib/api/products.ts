/**
 * Product query helpers sử dụng Prisma + Supabase
 */
import { ProductStatus } from '@prisma/client';

import { prisma } from '@/lib/prisma';

/** Lấy tất cả sản phẩm đã publish */
export async function getPublishedProducts() {
  return prisma.product.findMany({
    where: { status: ProductStatus.PUBLISHED },
    include: {
      category: { include: { group: true } },
      images: { where: { isCover: true }, take: 1 },
    },
    orderBy: { sortOrder: 'asc' },
  });
}

/** Lấy sản phẩm theo slug */
export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: { include: { group: true } },
      images: { orderBy: { sortOrder: 'asc' } },
      models: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
      specs: { orderBy: { sortOrder: 'asc' } },
      pricing: { orderBy: { sortOrder: 'asc' } },
      faqs: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

/** Lấy sản phẩm theo category */
export async function getProductsByCategory(categorySlug: string) {
  return prisma.product.findMany({
    where: {
      status: ProductStatus.PUBLISHED,
      category: { slug: categorySlug },
    },
    include: {
      images: { where: { isCover: true }, take: 1 },
      specs: { take: 3, orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { sortOrder: 'asc' },
  });
}
