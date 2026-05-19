import { ArrowRight, LayoutGrid, Phone } from 'lucide-react';
import Link from 'next/link';

import { ProductShowcaseCard } from '@/components/cards/product-showcase-card';
import { CTASection } from '@/components/sections/cta-section';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { getProductCategorySections } from '@/features/products/product.repository';
import { createMetadata } from '@/lib/seo';
import { formatPhoneHref } from '@/lib/utils';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Danh mục sản phẩm',
  description:
    'Danh mục cửa nhôm, cửa cuốn, cửa thép vân gỗ, lan can - cầu thang kính, cửa nhựa composite và cửa kính cường lực.',
  path: '/san-pham',
});

const ProductsPage = async () => {
  const productSections = await getProductCategorySections();

  // Flatten all products for the showcase, grouped by section
  const allProducts = productSections.flatMap((section) => section.products);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-navy-950 pb-20 pt-32 text-white">
        {/* Decorative grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full bg-champagne-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-[400px] rounded-full bg-champagne-400/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-champagne-400/30 bg-champagne-400/10 px-4 py-1.5">
            <LayoutGrid className="size-3.5 text-champagne-300" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-champagne-300">
              Sản phẩm
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Danh mục{' '}
            <span className="bg-gradient-to-r from-champagne-300 to-champagne-500 bg-clip-text text-transparent">
              cửa &amp; kính
            </span>{' '}
            công trình
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-silver-300 sm:text-lg">
            Đa dạng hệ cửa nhôm, cửa cuốn, cửa thép vân gỗ, lan can kính, cửa
            composite và kính cường lực — tư vấn theo công trình thực tế, báo
            giá theo hạng mục.
          </p>

          {/* Quick stats */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { value: `${allProducts.length}+`, label: 'Dòng sản phẩm' },
              {
                value: `${allProducts.reduce((sum, p) => sum + p.models.length, 0)}+`,
                label: 'Loại cửa & kính',
              },
              { value: '10+', label: 'Năm kinh nghiệm' },
              { value: '100%', label: 'Khảo sát miễn phí' },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-2xl font-bold text-champagne-300 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-silver-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="champagne" size="lg">
              <Link href="/lien-he">
                Nhận tư vấn ngay
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="light" size="lg">
              <a href={formatPhoneHref(siteConfig.hotline)}>
                <Phone className="size-5" />
                {siteConfig.hotline}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Category nav pills ─── */}
      <div className="sticky top-0 z-10 border-b border-silver-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3">
            {productSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="bg-silver-50 hover:bg-champagne-50 hover:text-champagne-600 shrink-0 rounded-full border border-silver-200 px-4 py-1.5 text-xs font-semibold text-navy-700 transition-all hover:border-champagne-400"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Product sections ─── */}
      <div className="bg-silver-50">
        {productSections.map((section, sectionIdx) => (
          <section
            key={section.id}
            id={section.id}
            className="border-b border-silver-200 py-16 last:border-b-0 sm:py-24"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-base font-bold uppercase tracking-[0.15em] text-champagne-500">
                    Nhóm sản phẩm {sectionIdx + 1}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-navy-950 sm:text-3xl">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="mt-2 max-w-xl text-sm leading-6 text-silver-500">
                      {section.description}
                    </p>
                  )}
                </div>
                <p className="shrink-0 text-sm font-semibold text-silver-400">
                  {section.products.length} sản phẩm
                </p>
              </div>

              {/* Product showcase cards */}
              <div className="mt-10 flex flex-col gap-8">
                {section.products.map((product, productIdx) => (
                  <ProductShowcaseCard
                    key={product.slug}
                    product={product}
                    index={sectionIdx * 10 + productIdx}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <CTASection />
    </>
  );
};

export default ProductsPage;
