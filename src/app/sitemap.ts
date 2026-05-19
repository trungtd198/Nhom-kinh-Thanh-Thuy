import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { posts } from '@/data/posts';
import { getProducts } from '@/features/products/product.repository';

const staticRoutes = [
  '',
  '/gioi-thieu',
  '/san-pham',
  '/du-an',
  '/tin-tuc',
  '/lien-he',
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const now = new Date();
  const products = await getProducts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}/san-pham/${product.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/tin-tuc#${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
};

export default sitemap;
