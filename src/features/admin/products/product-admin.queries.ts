import { type Prisma, ProductStatus } from '@prisma/client';

import { db } from '@/lib/db';

const productFormInclude = {
  category: true,
  images: {
    orderBy: {
      sortOrder: 'asc',
    },
  },
  models: {
    orderBy: {
      sortOrder: 'asc',
    },
    include: {
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  },
  specs: {
    orderBy: {
      sortOrder: 'asc',
    },
  },
  pricing: {
    orderBy: {
      sortOrder: 'asc',
    },
  },
  faqs: {
    orderBy: {
      sortOrder: 'asc',
    },
  },
} satisfies Prisma.ProductInclude;

export type AdminProductFormRecord = Prisma.ProductGetPayload<{
  include: typeof productFormInclude;
}>;

export type AdminProductListFilters = {
  q?: string;
  status?: ProductStatus;
  categoryId?: string;
};

export const getAdminProductCategories = () =>
  db.category.findMany({
    where: {
      isActive: true,
    },
    include: {
      group: true,
    },
    orderBy: [{ group: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
  });

export const getAdminProducts = (filters: AdminProductListFilters = {}) =>
  db.product.findMany({
    where: {
      status: filters.status,
      categoryId: filters.categoryId,
      OR: filters.q
        ? [
            {
              name: {
                contains: filters.q,
                mode: 'insensitive',
              },
            },
            {
              slug: {
                contains: filters.q,
                mode: 'insensitive',
              },
            },
            {
              excerpt: {
                contains: filters.q,
                mode: 'insensitive',
              },
            },
          ]
        : undefined,
    },
    include: {
      category: true,
      models: {
        select: {
          id: true,
        },
      },
      images: {
        select: {
          id: true,
        },
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
  });

export const getAdminProductById = (id: string) =>
  db.product.findUnique({
    where: {
      id,
    },
    include: productFormInclude,
  });

export const getProductStatusFromSearch = (status?: string) =>
  Object.values(ProductStatus).includes(status as ProductStatus)
    ? (status as ProductStatus)
    : undefined;
