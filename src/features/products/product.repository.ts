import { type Prisma, ProductStatus } from '@prisma/client';

import type { CategoryId } from '@/data/categories';
import { getProductCategoryLabel } from '@/data/categories';
import {
  createModelSlug,
  getProductModelImages as getStaticProductModelImages,
} from '@/data/products';
import { db } from '@/lib/db';

import type {
  Product,
  ProductCategorySection,
  ProductModel,
} from './product.types';

export { createModelSlug, getProductCategoryLabel };

const DEFAULT_PRODUCT_IMAGE = '/Page1.png';

const productInclude = {
  category: {
    include: {
      group: true,
    },
  },
  models: {
    where: {
      isActive: true,
    },
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
  images: {
    orderBy: {
      sortOrder: 'asc',
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

type ProductRecord = Prisma.ProductGetPayload<{
  include: typeof productInclude;
}>;

const productOrderBy = [
  { sortOrder: 'asc' },
  { createdAt: 'asc' },
] satisfies Prisma.ProductOrderByWithRelationInput[];

const asStringArray = (value: Prisma.JsonValue | null | undefined) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const asTechnicalSpecs = (value: Prisma.JsonValue | null | undefined) => {
  const specs =
    value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const getValue = (key: string) => {
    const item = (specs as Record<string, unknown>)[key];

    return typeof item === 'string' ? item : '';
  };

  return {
    material: getValue('material'),
    thickness: getValue('thickness'),
    glass: getValue('glass'),
    accessories: getValue('accessories'),
    colors: getValue('colors'),
    sizes: getValue('sizes'),
  };
};

const getProductCoverImage = (product: ProductRecord) =>
  product.coverImageUrl ??
  product.images.find((image) => image.isCover)?.publicUrl ??
  product.images[0]?.publicUrl ??
  product.models.find((model) => model.coverImageUrl)?.coverImageUrl ??
  product.models[0]?.images[0]?.publicUrl ??
  DEFAULT_PRODUCT_IMAGE;

const getModelCoverImage = (model: ProductRecord['models'][number]) =>
  model.coverImageUrl ??
  model.images.find((image) => image.isCover)?.publicUrl ??
  model.images[0]?.publicUrl ??
  DEFAULT_PRODUCT_IMAGE;

const mapProduct = (product: ProductRecord): Product => ({
  slug: product.slug,
  name: product.name,
  heroTitle: product.heroTitle,
  subtitle: product.subtitle ?? '',
  categoryId: product.category.slug as CategoryId,
  category: product.category.name,
  excerpt: product.excerpt,
  description: product.description,
  image: getProductCoverImage(product),
  overview: {
    description: product.overviewDescription ?? '',
    value: product.overviewValue ?? '',
    targetUsers: product.overviewTargetUsers ?? '',
    reasons: asStringArray(product.overviewReasons),
  },
  models: product.models.map((model) => {
    const image = getModelCoverImage(model);
    const images = model.images.map((item) => item.publicUrl);

    return {
      slug: model.slug,
      name: model.name,
      type: model.type,
      image,
      images: images.length > 0 ? images : getStaticProductModelImages(image),
    };
  }),
  highlights: asStringArray(product.highlights),
  advantages: asStringArray(product.advantages),
  specs: product.specs.map((spec) => ({
    label: spec.label,
    value: spec.value,
  })),
  technicalSpecs: asTechnicalSpecs(product.technicalSpecs),
  applications: asStringArray(product.applications),
  pricing: product.pricing.map((price) => ({
    type: price.type,
    price: price.price,
  })),
  priceNote: product.priceNote ?? '',
  faqs: product.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  })),
});

const findPublishedProducts = () =>
  db.product.findMany({
    where: {
      status: ProductStatus.PUBLISHED,
      category: {
        isActive: true,
      },
    },
    include: productInclude,
    orderBy: productOrderBy,
  });

export const getPublishedProducts = async () => {
  const products = await findPublishedProducts();

  return products.map(mapProduct);
};

export const getProducts = getPublishedProducts;

export const getProductBySlug = async (slug: string) => {
  const product = await db.product.findFirst({
    where: {
      slug,
      status: ProductStatus.PUBLISHED,
      category: {
        isActive: true,
      },
    },
    include: productInclude,
  });

  return product ? mapProduct(product) : undefined;
};

export const getProductModelBySlug = async (
  productSlug: string,
  modelSlug: string,
) => {
  const product = await getProductBySlug(productSlug);
  const model = product?.models.find((item) => item.slug === modelSlug);

  return { product, model };
};

export const getProductModelImages = (model: ProductModel | string) => {
  if (typeof model === 'string') {
    return getStaticProductModelImages(model);
  }

  return model.images.length > 0
    ? model.images
    : getStaticProductModelImages(model.image);
};

export const getProductCategorySections = async (): Promise<
  ProductCategorySection[]
> => {
  const categoryGroups = await db.categoryGroup.findMany({
    include: {
      categories: {
        where: {
          isActive: true,
        },
        include: {
          products: {
            where: {
              status: ProductStatus.PUBLISHED,
            },
            include: productInclude,
            orderBy: productOrderBy,
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

  return categoryGroups
    .map((group) => {
      const products = group.categories.flatMap((category) =>
        category.products.map(mapProduct),
      );

      return {
        id: group.slug,
        title: group.title,
        description: group.description,
        image: products[0]?.image ?? '',
        products,
      };
    })
    .filter((section) => section.products.length > 0);
};
