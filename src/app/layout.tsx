import '@/styles/global.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { PublicShell } from '@/components/layout/public-shell';
import { siteConfig } from '@/config/site';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata();

const RootLayout = ({ children }: { children: ReactNode }) => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.companyName,
    alternateName: siteConfig.displayName,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.logo}`,
    telephone: siteConfig.hotline,
    email: siteConfig.email,
    taxID: siteConfig.taxCode,
    address: siteConfig.address,
    priceRange: '$$',
  };

  return (
    <html lang="vi">
      <body className="bg-white text-navy-950 antialiased">
        <PublicShell>{children}</PublicShell>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
