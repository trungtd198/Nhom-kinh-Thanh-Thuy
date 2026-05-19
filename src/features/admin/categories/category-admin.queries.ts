import { db } from '@/lib/db';

export const getAdminCategoryGroups = () =>
  db.categoryGroup.findMany({
    include: {
      categories: {
        include: {
          products: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
    orderBy: {
      sortOrder: 'asc',
    },
  });

export const getAdminCategoryGroupOptions = () =>
  db.categoryGroup.findMany({
    orderBy: {
      sortOrder: 'asc',
    },
  });
