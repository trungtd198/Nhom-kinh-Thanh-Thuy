/**
 * Category query helpers
 */
import { prisma } from '@/lib/prisma';

/** Lấy tất cả category groups kèm categories con */
export async function getCategoryGroups() {
  return prisma.categoryGroup.findMany({
    include: {
      categories: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });
}

/** Lấy category theo slug */
export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { group: true },
  });
}
