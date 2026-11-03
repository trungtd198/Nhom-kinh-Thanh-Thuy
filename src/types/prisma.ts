/**
 * Re-export Prisma types for convenience
 * Usage: import type { Product, Category, ... } from '@/types/prisma'
 */
export type {
  AdminUser,
  Category,
  CategoryGroup,
  Prisma,
  Product,
  ProductFaq,
  ProductImage,
  ProductModel,
  ProductPricing,
  ProductSpec,
} from '@prisma/client';
export { AdminRole, ProductStatus } from '@prisma/client';
