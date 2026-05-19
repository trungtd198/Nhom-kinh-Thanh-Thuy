import type { CategoryId } from '@/data/categories';

export type ProductModel = {
  slug: string;
  name: string;
  type: string;
  image: string;
  images: string[];
};

export type Product = {
  slug: string;
  name: string;
  heroTitle: string;
  subtitle: string;
  categoryId: CategoryId;
  category: string;
  excerpt: string;
  description: string;
  image: string;
  overview: {
    description: string;
    value: string;
    targetUsers: string;
    reasons: string[];
  };
  models: ProductModel[];
  highlights: string[];
  advantages: string[];
  specs: { label: string; value: string }[];
  technicalSpecs: {
    material: string;
    thickness: string;
    glass: string;
    accessories: string;
    colors: string;
    sizes: string;
  };
  applications: string[];
  pricing: { type: string; price: string }[];
  priceNote: string;
  faqs: { question: string; answer: string }[];
};

export type ProductCategorySection = {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
};
