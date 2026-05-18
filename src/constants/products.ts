import { existsSync, readdirSync } from 'fs';
import path from 'path';

const IMAGE_ROOT = path.join(process.cwd(), 'public', 'assets', 'images');
const PUBLIC_IMAGE_ROOT = '/assets/images';
const IMAGE_EXTENSIONS = new Set([
  '.avif',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
]);

const labelTokens: Record<string, string> = {
  ban: 'Bản',
  can: 'Can',
  cau: 'Cầu',
  chi: 'Chỉ',
  composite: 'Composite',
  cuon: 'Cuốn',
  cua: 'Cửa',
  cuong: 'Cường',
  go: 'Gỗ',
  hai: 'Hai',
  khe: 'Khe',
  khong: 'Không',
  kinh: 'Kính',
  lan: 'Lan',
  lien: 'Liền',
  lua: 'Lùa',
  mo: 'Mở',
  mot: 'Một',
  noi: 'Nổi',
  nhom: 'Nhôm',
  o: 'Ô',
  quay: 'Quay',
  san: 'Sàn',
  so: 'Sổ',
  tam: 'Tấm',
  tay: 'Tay',
  thang: 'Thang',
  thoang: 'Thoáng',
  tru: 'Trụ',
  van: 'Vân',
  vin: 'Vịn',
};

export type ProductItem = {
  slug: string;
  label: string;
  images: string[];
  thumbnail: string;
};

export type ProductCategory = {
  category: string;
  label: string;
  products: ProductItem[];
};

const sortByName = (items: string[]) =>
  [...items].sort((first, second) =>
    first.localeCompare(second, 'vi', {
      numeric: true,
      sensitivity: 'base',
    }),
  );

export const kebabToLabel = (value: string) =>
  value
    .split('-')
    .filter(Boolean)
    .map((token) => {
      const mappedToken = labelTokens[token];

      if (mappedToken) {
        return mappedToken;
      }

      return `${token.charAt(0).toUpperCase()}${token.slice(1)}`;
    })
    .join(' ');

const getDirectoryNames = (directory: string) => {
  if (!existsSync(directory)) {
    return [];
  }

  return sortByName(
    readdirSync(directory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
  );
};

const getImageFileNames = (directory: string) => {
  if (!existsSync(directory)) {
    return [];
  }

  return sortByName(
    readdirSync(directory, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
      )
      .map((entry) => entry.name),
  );
};

const createProduct = (
  categorySlug: string,
  productSlug: string,
): ProductItem | null => {
  const productDirectory = path.join(IMAGE_ROOT, categorySlug, productSlug);
  const images = getImageFileNames(productDirectory).map(
    (fileName) =>
      `${PUBLIC_IMAGE_ROOT}/${categorySlug}/${productSlug}/${fileName}`,
  );
  const thumbnail = images[0];

  if (!thumbnail) {
    return null;
  }

  return {
    slug: productSlug,
    label: kebabToLabel(productSlug),
    images,
    thumbnail,
  };
};

export const productCategories: ProductCategory[] = getDirectoryNames(
  IMAGE_ROOT,
)
  .map((categorySlug) => {
    const products = getDirectoryNames(path.join(IMAGE_ROOT, categorySlug))
      .map((productSlug) => createProduct(categorySlug, productSlug))
      .filter((product): product is ProductItem => Boolean(product));

    return {
      category: categorySlug,
      label: kebabToLabel(categorySlug),
      products,
    };
  })
  .filter((category) => category.products.length > 0);

export const products = productCategories;

export const getProductCategory = (categorySlug: string) =>
  productCategories.find((item) => item.category === categorySlug);

export const getProductItem = (categorySlug: string, productSlug: string) =>
  getProductCategory(categorySlug)?.products.find(
    (product) => product.slug === productSlug,
  );
