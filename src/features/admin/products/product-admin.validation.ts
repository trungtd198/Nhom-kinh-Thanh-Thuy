import { ProductStatus } from '@prisma/client';

const TECHNICAL_SPEC_KEYS = [
  'material',
  'thickness',
  'glass',
  'accessories',
  'colors',
  'sizes',
] as const;

type TechnicalSpecKey = (typeof TECHNICAL_SPEC_KEYS)[number];

export type ProductAdminFormPayload = {
  categoryId: string;
  slug: string;
  name: string;
  heroTitle: string;
  subtitle: string | null;
  excerpt: string;
  description: string;
  coverImageUrl: string | null;
  overviewDescription: string | null;
  overviewValue: string | null;
  overviewTargetUsers: string | null;
  overviewReasons: string[];
  highlights: string[];
  advantages: string[];
  applications: string[];
  technicalSpecs: Record<TechnicalSpecKey, string>;
  priceNote: string | null;
  status: ProductStatus;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  seoImageUrl: string | null;
  specs: { label: string; value: string; sortOrder: number }[];
  pricing: { type: string; price: string; sortOrder: number }[];
  faqs: { question: string; answer: string; sortOrder: number }[];
};

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

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const parsePairs = (value: string) =>
  parseLines(value).map((line, index) => {
    const [firstValue, ...secondParts] = line.split('|');
    const secondValue = secondParts.join('|');

    return {
      firstValue: firstValue?.trim() ?? '',
      secondValue: secondValue.trim(),
      sortOrder: index,
    };
  });

const parseSpecs = (value: string) =>
  parsePairs(value)
    .map((item) => ({
      label: item.firstValue,
      value: item.secondValue,
      sortOrder: item.sortOrder,
    }))
    .filter((item) => item.label && item.value);

const parsePricing = (value: string) =>
  parsePairs(value)
    .map((item) => ({
      type: item.firstValue,
      price: item.secondValue,
      sortOrder: item.sortOrder,
    }))
    .filter((item) => item.type && item.price);

const parseFaqs = (value: string) =>
  parsePairs(value)
    .map((item) => ({
      question: item.firstValue,
      answer: item.secondValue,
      sortOrder: item.sortOrder,
    }))
    .filter((item) => item.question && item.answer);

export const parseProductAdminFormData = (
  formData: FormData,
): ProductAdminFormPayload => {
  const statusValue = getRequiredString(formData, 'status');

  if (!Object.values(ProductStatus).includes(statusValue as ProductStatus)) {
    throw new Error('Invalid product status');
  }

  return {
    categoryId: getRequiredString(formData, 'categoryId'),
    slug: getRequiredString(formData, 'slug'),
    name: getRequiredString(formData, 'name'),
    heroTitle: getRequiredString(formData, 'heroTitle'),
    subtitle: getOptionalString(formData, 'subtitle'),
    excerpt: getRequiredString(formData, 'excerpt'),
    description: getRequiredString(formData, 'description'),
    coverImageUrl: getOptionalString(formData, 'coverImageUrl'),
    overviewDescription: getOptionalString(formData, 'overviewDescription'),
    overviewValue: getOptionalString(formData, 'overviewValue'),
    overviewTargetUsers: getOptionalString(formData, 'overviewTargetUsers'),
    overviewReasons: parseLines(getString(formData, 'overviewReasons')),
    highlights: parseLines(getString(formData, 'highlights')),
    advantages: parseLines(getString(formData, 'advantages')),
    applications: parseLines(getString(formData, 'applications')),
    technicalSpecs: {
      material: getString(formData, 'technicalSpecMaterial'),
      thickness: getString(formData, 'technicalSpecThickness'),
      glass: getString(formData, 'technicalSpecGlass'),
      accessories: getString(formData, 'technicalSpecAccessories'),
      colors: getString(formData, 'technicalSpecColors'),
      sizes: getString(formData, 'technicalSpecSizes'),
    },
    priceNote: getOptionalString(formData, 'priceNote'),
    status: statusValue as ProductStatus,
    sortOrder: getInt(formData, 'sortOrder'),
    seoTitle: getOptionalString(formData, 'seoTitle'),
    seoDescription: getOptionalString(formData, 'seoDescription'),
    seoImageUrl: getOptionalString(formData, 'seoImageUrl'),
    specs: parseSpecs(getString(formData, 'specsText')),
    pricing: parsePricing(getString(formData, 'pricingText')),
    faqs: parseFaqs(getString(formData, 'faqsText')),
  };
};
