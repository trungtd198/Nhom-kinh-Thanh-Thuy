'use server';

import type { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdminUser } from '@/features/admin/auth/guards';
import { db } from '@/lib/db';

const getString = (formData: FormData, key: string) =>
  String(formData.get(key) ?? '').trim();

const getOptionalString = (formData: FormData, key: string) => {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
};

const getRequiredString = (formData: FormData, key: string) => {
  const value = getString(formData, key);

  if (!value) {
    throw new Error(`Missing required field: ${key}`);
  }

  return value;
};

const getInt = (formData: FormData, key: string) => {
  const value = Number.parseInt(getString(formData, key), 10);

  return Number.isFinite(value) ? value : 0;
};

const getBoolean = (formData: FormData, key: string) =>
  formData.get(key) === 'on' || formData.get(key) === 'true';

const redirectToCategories = (message = 'saved') => {
  redirect(`/admin/categories?status=${message}`);
};

const revalidateCategoryPaths = async ({
  categoryId,
  groupId,
}: {
  categoryId?: string;
  groupId?: string;
} = {}) => {
  revalidatePath('/');
  revalidatePath('/san-pham');
  revalidatePath('/sitemap.xml');

  const filters: Prisma.ProductWhereInput[] = [];

  if (categoryId) {
    filters.push({ categoryId });
  }

  if (groupId) {
    filters.push({ category: { groupId } });
  }

  const products = await db.product.findMany({
    where: {
      OR: filters.length > 0 ? filters : undefined,
    },
    select: {
      slug: true,
    },
  });

  products.forEach((product) => {
    revalidatePath(`/san-pham/${product.slug}`);
  });
};

const assertUniqueGroupSlug = async (slug: string, currentGroupId?: string) => {
  const existing = await db.categoryGroup.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (existing && existing.id !== currentGroupId) {
    throw new Error('Category group slug already exists');
  }
};

const assertUniqueCategorySlug = async (
  slug: string,
  currentCategoryId?: string,
) => {
  const existing = await db.category.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (existing && existing.id !== currentCategoryId) {
    throw new Error('Category slug already exists');
  }
};

export const createAdminCategoryGroup = async (formData: FormData) => {
  await requireAdminUser();

  const slug = getRequiredString(formData, 'slug');
  await assertUniqueGroupSlug(slug);

  await db.categoryGroup.create({
    data: {
      slug,
      title: getRequiredString(formData, 'title'),
      description: getRequiredString(formData, 'description'),
      sortOrder: getInt(formData, 'sortOrder'),
    },
  });

  await revalidateCategoryPaths();
  redirectToCategories();
};

export const updateAdminCategoryGroup = async (formData: FormData) => {
  await requireAdminUser();

  const groupId = getRequiredString(formData, 'groupId');
  const slug = getRequiredString(formData, 'slug');
  await assertUniqueGroupSlug(slug, groupId);

  await db.categoryGroup.update({
    where: {
      id: groupId,
    },
    data: {
      slug,
      title: getRequiredString(formData, 'title'),
      description: getRequiredString(formData, 'description'),
      sortOrder: getInt(formData, 'sortOrder'),
    },
  });

  await revalidateCategoryPaths({ groupId });
  redirectToCategories();
};

export const deleteAdminCategoryGroup = async (formData: FormData) => {
  await requireAdminUser();

  const groupId = getRequiredString(formData, 'groupId');
  const categoryCount = await db.category.count({
    where: {
      groupId,
    },
  });

  if (categoryCount > 0) {
    redirectToCategories('group-has-categories');
  }

  await db.categoryGroup.delete({
    where: {
      id: groupId,
    },
  });

  await revalidateCategoryPaths();
  redirectToCategories();
};

export const createAdminCategory = async (formData: FormData) => {
  await requireAdminUser();

  const slug = getRequiredString(formData, 'slug');
  await assertUniqueCategorySlug(slug);

  const category = await db.category.create({
    data: {
      groupId: getRequiredString(formData, 'groupId'),
      slug,
      name: getRequiredString(formData, 'name'),
      description: getOptionalString(formData, 'description'),
      sortOrder: getInt(formData, 'sortOrder'),
      isActive: getBoolean(formData, 'isActive'),
    },
    select: {
      id: true,
      groupId: true,
    },
  });

  await revalidateCategoryPaths({
    categoryId: category.id,
    groupId: category.groupId,
  });
  redirectToCategories();
};

export const updateAdminCategory = async (formData: FormData) => {
  await requireAdminUser();

  const categoryId = getRequiredString(formData, 'categoryId');
  const slug = getRequiredString(formData, 'slug');
  await assertUniqueCategorySlug(slug, categoryId);

  const category = await db.category.update({
    where: {
      id: categoryId,
    },
    data: {
      groupId: getRequiredString(formData, 'groupId'),
      slug,
      name: getRequiredString(formData, 'name'),
      description: getOptionalString(formData, 'description'),
      sortOrder: getInt(formData, 'sortOrder'),
      isActive: getBoolean(formData, 'isActive'),
    },
    select: {
      id: true,
      groupId: true,
    },
  });

  await revalidateCategoryPaths({
    categoryId: category.id,
    groupId: category.groupId,
  });
  redirectToCategories();
};

export const deleteAdminCategory = async (formData: FormData) => {
  await requireAdminUser();

  const categoryId = getRequiredString(formData, 'categoryId');
  const productCount = await db.product.count({
    where: {
      categoryId,
    },
  });

  if (productCount > 0) {
    redirectToCategories('category-has-products');
  }

  await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  await revalidateCategoryPaths();
  redirectToCategories();
};
