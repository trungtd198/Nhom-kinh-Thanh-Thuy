import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Gem,
  Layers,
  Maximize2,
  Palette,
  Phone,
  Ruler,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FAQAccordion } from '@/components/sections/faq-accordion';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { createModelSlug, getProductBySlug, products } from '@/data/products';
import { createMetadata } from '@/lib/seo';
import { formatPhoneHref } from '@/lib/utils';

type ProductDetailPageProps = {
  params: { slug: string };
};

const specLabels = {
  material: 'Chất liệu',
  thickness: 'Độ dày',
  glass: 'Kính sử dụng',
  accessories: 'Phụ kiện',
  colors: 'Màu sắc',
  sizes: 'Kích thước',
};

const specIcons: Record<string, LucideIcon> = {
  material: Layers,
  thickness: Ruler,
  glass: Gem,
  accessories: Wrench,
  colors: Palette,
  sizes: Maximize2,
};

export const generateStaticParams = () =>
  products.map((product) => ({ slug: product.slug }));

export const generateMetadata = ({ params }: ProductDetailPageProps) => {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return createMetadata({ title: 'Sản phẩm' });
  }

  return createMetadata({
    title: product.heroTitle,
    description: product.excerpt,
    path: `/san-pham/${product.slug}`,
    image: product.image,
  });
};

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.heroTitle,
    description: product.excerpt,
    image: product.image,
    brand: { '@type': 'Brand', name: siteConfig.displayName },
    category: product.category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      offerCount: product.pricing.length,
    },
  };

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-navy-950 pt-28 text-white">
        <Image
          src={product.image}
          alt={product.heroTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/25" />
        <div className="relative mx-auto flex min-h-[calc(88vh-112px)] max-w-[1440px] items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-champagne-300 backdrop-blur">
              <BadgeCheck className="size-4" />
              {product.category}
            </p>
            <h1 className="mt-6 text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
              {product.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-medium leading-8 text-silver-100">
              {product.subtitle}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-silver-200">
              {product.excerpt}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="champagne" size="lg">
                <Link href="/lien-he">
                  Nhận báo giá ngay
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
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-champagne-500">
              Tổng quan
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              Giải pháp phù hợp công trình cần hiệu quả sử dụng lâu dài
            </h2>
            <p className="mt-5 text-base leading-7 text-silver-500">
              {product.overview.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-silver-200 p-5">
              <p className="text-sm font-semibold text-champagne-500">
                Giá trị sử dụng
              </p>
              <p className="mt-3 text-sm leading-6 text-navy-900">
                {product.overview.value}
              </p>
            </div>
            <div className="rounded-lg border border-silver-200 p-5">
              <p className="text-sm font-semibold text-champagne-500">
                Đối tượng phù hợp
              </p>
              <p className="mt-3 text-sm leading-6 text-navy-900">
                {product.overview.targetUsers}
              </p>
            </div>
            <div className="rounded-lg border border-silver-200 p-5 sm:col-span-2">
              <p className="text-sm font-semibold text-champagne-500">
                Lý do nên chọn
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {product.overview.reasons.map((reason) => (
                  <div
                    key={reason}
                    className="flex gap-2 text-sm text-navy-900"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne-500" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-silver-100 py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-champagne-500">
              Mẫu nổi bật
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              Gallery mẫu thi công được khách hàng quan tâm
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {product.models.map((model) => (
              <Link
                key={model.name}
                href={`/san-pham/${product.slug}/${createModelSlug(model.name)}`}
                className="group overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-navy-950">
                    {model.name}
                  </h3>
                  <p className="mt-2 text-sm text-silver-500">{model.type}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
                    Xem chi tiết
                    <ArrowRight className="size-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-champagne-500">
                Ưu điểm nổi bật
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                Tối ưu đồng thời độ bền, an toàn và tính thẩm mỹ
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.advantages.map((advantage) => (
                <div
                  key={advantage}
                  className="flex gap-3 rounded-lg border border-silver-200 p-5"
                >
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-champagne-500" />
                  <p className="text-sm font-semibold leading-6 text-navy-900">
                    {advantage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-champagne-300">
              Thông số kỹ thuật
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Cấu hình được chốt sau khảo sát hiện trạng
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(product.technicalSpecs).map(([key, value]) => {
              const Icon = specIcons[key] ?? Ruler;
              return (
                <div
                  key={key}
                  className="rounded-lg border border-white/10 p-5"
                >
                  <Icon className="size-5 text-champagne-300" />
                  <p className="mt-4 text-sm font-semibold text-champagne-300">
                    {specLabels[key as keyof typeof specLabels]}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-silver-200">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-silver-100 py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase text-champagne-500">
              Ứng dụng thực tế
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              Phù hợp nhiều loại hình công trình
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {product.applications.map((item) => (
              <span
                key={item}
                className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-champagne-500">
              Báo giá tham khảo
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              Giá phụ thuộc cấu hình và hiện trạng công trình
            </h2>
            <p className="mt-4 text-base leading-7 text-silver-500">
              {product.priceNote}
            </p>
            <Button asChild variant="champagne" size="lg" className="mt-6">
              <Link href="/lien-he">
                Liên hệ để nhận báo giá chính xác
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-silver-200">
            {product.pricing.map((price, index) => (
              <div
                key={price.type}
                className={`grid gap-3 p-5 sm:grid-cols-[1fr_220px] ${
                  index === 0 ? '' : 'border-t border-silver-200'
                }`}
              >
                <p className="font-bold text-navy-950">{price.type}</p>
                <p className="text-champagne-600 text-sm font-semibold">
                  {price.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-silver-100 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase text-champagne-500">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950">
              Câu hỏi thường gặp
            </h2>
          </div>
          <div className="mt-10">
            <FAQAccordion items={product.faqs} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-navy-950 p-6 text-center text-white sm:p-10">
            <p className="text-sm font-semibold uppercase text-champagne-300">
              Tư vấn miễn phí
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">
              Nhận tư vấn và báo giá miễn phí
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-silver-300">
              Gửi kích thước sơ bộ, bản vẽ hoặc hình ảnh hiện trạng để đội kỹ
              thuật tư vấn phương án phù hợp và báo giá nhanh.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="champagne" size="lg">
                <Link href="/lien-he">
                  Liên hệ ngay
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
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
};

export default ProductDetailPage;
