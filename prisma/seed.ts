/* eslint-disable no-await-in-loop, no-console, no-continue */
import { PrismaClient, ProductStatus } from '@prisma/client';

import { CATEGORIES, PRODUCT_CATEGORY_SECTIONS } from '../src/data/categories';
import { createModelSlug, products } from '../src/data/products';

const prisma = new PrismaClient();

const main = async () => {
  for (
    let groupIndex = 0;
    groupIndex < PRODUCT_CATEGORY_SECTIONS.length;
    groupIndex += 1
  ) {
    const group = PRODUCT_CATEGORY_SECTIONS[groupIndex];

    if (!group) {
      continue;
    }

    await prisma.categoryGroup.upsert({
      where: { slug: group.id },
      create: {
        slug: group.id,
        title: group.title,
        description: group.description,
        sortOrder: groupIndex,
      },
      update: {
        title: group.title,
        description: group.description,
        sortOrder: groupIndex,
      },
    });
  }

  const categoryEntries = Object.entries(CATEGORIES);

  for (
    let categoryIndex = 0;
    categoryIndex < categoryEntries.length;
    categoryIndex += 1
  ) {
    const categoryEntry = categoryEntries[categoryIndex];

    if (!categoryEntry) {
      continue;
    }

    const [slug, category] = categoryEntry;
    const group = await prisma.categoryGroup.findUniqueOrThrow({
      where: { slug: category.group },
      select: { id: true },
    });

    await prisma.category.upsert({
      where: { slug },
      create: {
        slug,
        name: category.label,
        groupId: group.id,
        sortOrder: categoryIndex,
      },
      update: {
        name: category.label,
        groupId: group.id,
        sortOrder: categoryIndex,
        isActive: true,
      },
    });
  }

  for (
    let productIndex = 0;
    productIndex < products.length;
    productIndex += 1
  ) {
    const product = products[productIndex];

    if (!product) {
      continue;
    }

    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.categoryId },
      select: { id: true },
    });

    const savedProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        categoryId: category.id,
        slug: product.slug,
        name: product.name,
        heroTitle: product.heroTitle,
        subtitle: product.subtitle,
        excerpt: product.excerpt,
        description: product.description,
        coverImageUrl: product.image,
        overviewDescription: product.overview.description,
        overviewValue: product.overview.value,
        overviewTargetUsers: product.overview.targetUsers,
        overviewReasons: product.overview.reasons,
        highlights: product.highlights,
        advantages: product.advantages,
        applications: product.applications,
        technicalSpecs: product.technicalSpecs,
        priceNote: product.priceNote,
        status: ProductStatus.PUBLISHED,
        sortOrder: productIndex,
        seoTitle: product.heroTitle,
        seoDescription: product.excerpt,
        seoImageUrl: product.image,
        publishedAt: new Date(),
      },
      update: {
        categoryId: category.id,
        name: product.name,
        heroTitle: product.heroTitle,
        subtitle: product.subtitle,
        excerpt: product.excerpt,
        description: product.description,
        coverImageUrl: product.image,
        overviewDescription: product.overview.description,
        overviewValue: product.overview.value,
        overviewTargetUsers: product.overview.targetUsers,
        overviewReasons: product.overview.reasons,
        highlights: product.highlights,
        advantages: product.advantages,
        applications: product.applications,
        technicalSpecs: product.technicalSpecs,
        priceNote: product.priceNote,
        status: ProductStatus.PUBLISHED,
        sortOrder: productIndex,
        seoTitle: product.heroTitle,
        seoDescription: product.excerpt,
        seoImageUrl: product.image,
      },
    });

    await prisma.productSpec.deleteMany({
      where: { productId: savedProduct.id },
    });
    await prisma.productPricing.deleteMany({
      where: { productId: savedProduct.id },
    });
    await prisma.productFaq.deleteMany({
      where: { productId: savedProduct.id },
    });
    await prisma.productImage.deleteMany({
      where: { productId: savedProduct.id },
    });
    await prisma.productModel.deleteMany({
      where: { productId: savedProduct.id },
    });

    await prisma.productSpec.createMany({
      data: product.specs.map((spec, specIndex) => ({
        productId: savedProduct.id,
        label: spec.label,
        value: spec.value,
        sortOrder: specIndex,
      })),
    });

    await prisma.productPricing.createMany({
      data: product.pricing.map((price, priceIndex) => ({
        productId: savedProduct.id,
        type: price.type,
        price: price.price,
        sortOrder: priceIndex,
      })),
    });

    await prisma.productFaq.createMany({
      data: product.faqs.map((faq, faqIndex) => ({
        productId: savedProduct.id,
        question: faq.question,
        answer: faq.answer,
        sortOrder: faqIndex,
      })),
    });

    await prisma.productImage.create({
      data: {
        productId: savedProduct.id,
        publicUrl: product.image,
        alt: product.name,
        sortOrder: 0,
        isCover: true,
      },
    });

    for (
      let modelIndex = 0;
      modelIndex < product.models.length;
      modelIndex += 1
    ) {
      const model = product.models[modelIndex];

      if (!model) {
        continue;
      }

      const savedModel = await prisma.productModel.create({
        data: {
          productId: savedProduct.id,
          slug: createModelSlug(model.name),
          name: model.name,
          type: model.type,
          coverImageUrl: model.image,
          sortOrder: modelIndex,
        },
      });

      await prisma.productImage.create({
        data: {
          productId: savedProduct.id,
          modelId: savedModel.id,
          publicUrl: model.image,
          alt: model.name,
          sortOrder: modelIndex,
          isCover: true,
        },
      });
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
