import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export const createMetadata = ({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.ogImage,
}: SeoInput = {}): Metadata => {
  const pageTitle = title
    ? `${title} | ${siteConfig.displayName}`
    : `${siteConfig.displayName} | Nhôm kính cao cấp`;
  const url = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    alternates: { canonical: url },
    icons: {
      icon: siteConfig.logo,
      shortcut: siteConfig.logo,
      apple: siteConfig.logo,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.displayName,
      locale: 'vi_VN',
      type: 'website',
      images: [{ url: image, width: 1414, height: 2000, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
    },
  };
};
