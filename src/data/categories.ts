import type { Product } from '@/features/products/product.types';

export const CATEGORIES = {
  'cua-nhom': {
    label: 'Cửa nhôm',
    group: 'cua-nhom-kinh',
  },
  'cua-kinh': {
    label: 'Cửa kính cường lực',
    group: 'cua-nhom-kinh',
  },
  'cua-an-ninh': {
    label: 'Cửa an ninh',
    group: 'cua-an-ninh',
  },
  'cua-thep': {
    label: 'Cửa thép vân gỗ',
    group: 'cua-an-ninh',
  },
  'cua-noi-that': {
    label: 'Cửa nội thất',
    group: 'noi-that-lan-can',
  },
  'kinh-lan-can': {
    label: 'Kính & lan can',
    group: 'noi-that-lan-can',
  },
} as const;

export type CategoryId = keyof typeof CATEGORIES;

export const PRODUCT_CATEGORY_SECTIONS = [
  {
    id: 'cua-nhom-kinh',
    title: 'Cửa nhôm & kính',
    description:
      'Các hệ cửa lấy sáng, cách âm và tạo mặt tiền hiện đại cho nhà phố, showroom, văn phòng.',
    categoryIds: ['cua-nhom', 'cua-kinh'],
  },
  {
    id: 'cua-an-ninh',
    title: 'Cửa an ninh & thép',
    description:
      'Nhóm cửa ưu tiên độ chắc chắn, bảo vệ mặt tiền, gara và khu vực cần kiểm soát ra vào.',
    categoryIds: ['cua-an-ninh', 'cua-thep'],
  },
  {
    id: 'noi-that-lan-can',
    title: 'Nội thất & lan can kính',
    description:
      'Giải pháp hoàn thiện không gian bên trong và các khu vực cầu thang, ban công cần sự thoáng sáng.',
    categoryIds: ['cua-noi-that', 'kinh-lan-can'],
  },
] as const satisfies readonly {
  id: string;
  title: string;
  description: string;
  categoryIds: readonly CategoryId[];
}[];

export const getProductCategoryLabel = (categoryId: CategoryId) =>
  CATEGORIES[categoryId].label;

export const getProductCategorySections = (products: Product[]) =>
  PRODUCT_CATEGORY_SECTIONS.map((section) => {
    const sectionProducts = products.filter((product) =>
      (section.categoryIds as readonly CategoryId[]).includes(
        product.categoryId,
      ),
    );

    return {
      ...section,
      image: sectionProducts[0]?.image ?? '',
      products: sectionProducts,
    };
  }).filter((section) => section.products.length > 0);
