import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ImageSlider } from '@/components/ui/image-slider';
import { siteConfig } from '@/config/site';
import {
  createModelSlug,
  getProductModelBySlug,
  getProductModelImages,
  products,
} from '@/data/products';
import { createMetadata } from '@/lib/seo';
import { formatPhoneHref } from '@/lib/utils';

type ProductModelPageProps = {
  params: { slug: string; model: string };
};

const specLabels = {
  material: 'Chất liệu',
  thickness: 'Độ dày',
  glass: 'Kính sử dụng',
  accessories: 'Phụ kiện',
  colors: 'Màu sắc',
  sizes: 'Kích thước',
};

export const generateStaticParams = () =>
  products.flatMap((product) =>
    product.models.map((model) => ({
      slug: product.slug,
      model: createModelSlug(model.name),
    })),
  );

export const generateMetadata = ({ params }: ProductModelPageProps) => {
  const { product, model } = getProductModelBySlug(params.slug, params.model);

  if (!product || !model) {
    return createMetadata({ title: 'Chi tiết sản phẩm' });
  }

  return createMetadata({
    title: model.name,
    description: `${model.name} - ${model.type}. ${product.excerpt}`,
    path: `/san-pham/${product.slug}/${createModelSlug(model.name)}`,
    image: model.image,
  });
};

const ProductModelPage = ({ params }: ProductModelPageProps) => {
  const { product, model } = getProductModelBySlug(params.slug, params.model);

  if (!product || !model) {
    notFound();
  }

  const galleryImages = getProductModelImages(model.image);

  const slideImages = galleryImages.map((src, index) => ({
    src,
    alt: `${model.name} - mẫu ${index + 1}`,
  }));

  const modelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: model.name,
    description: `${model.name} - ${model.type}. ${product.description}`,
    image: model.image,
    brand: { '@type': 'Brand', name: siteConfig.displayName },
    category: product.category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      offerCount: product.pricing.length,
    },
  };

  const articleSections = [
    {
      title: `${model.name} là gì?`,
      content: `${model.name} thuộc nhóm ${product.name.toLowerCase()}, phù hợp với ${model.type.toLowerCase()}. Hạng mục này được tư vấn theo hiện trạng công trình, kích thước ô chờ, nhu cầu sử dụng và ngân sách để chọn cấu hình vật tư hợp lý.`,
    },
    {
      title: 'Vì sao nên chọn mẫu này?',
      content: `${product.overview.value} Với mỗi công trình, đội kỹ thuật sẽ khảo sát, đo đạc và đề xuất phương án thi công giúp sản phẩm vận hành ổn định, thẩm mỹ và dễ bảo trì sau bàn giao.`,
    },
    {
      title: 'Báo giá được tính như thế nào?',
      content: `${product.priceNote} Vì vậy báo giá chính xác cần dựa trên kích thước thực tế, loại vật tư, phụ kiện, vị trí lắp đặt và khối lượng thi công.`,
    },
  ];

  return (
    <>
      <section className="bg-navy-950 pt-32 text-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Link
              href={`/san-pham/${product.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-champagne-300"
            >
              <ArrowLeft className="size-4" />
              Quay lại {product.name}
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase text-champagne-300">
              {product.category}
            </p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              {model.name}
            </h1>
            <p className="mt-4 text-xl font-medium text-silver-100">
              {model.type}
            </p>
            <p className="mt-5 text-base leading-7 text-silver-200">
              {product.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="champagne" size="lg">
                <Link href="/lien-he">
                  Nhận báo giá
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
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
            <Image
              src={model.image}
              alt={model.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-silver-100 py-10 sm:py-12">
        <article className="mx-auto max-w-6xl bg-white px-4 py-6 shadow-sm sm:px-8 lg:px-12">
          <div className="border-b border-silver-200 pb-5">
            <p className="text-xs font-semibold uppercase text-champagne-500">
              Chi tiết sản phẩm
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-950 sm:text-3xl">
              {model.name}: mô tả, thông số kỹ thuật, hình ảnh và báo giá
            </h2>
            <p className="mt-3 text-sm leading-6 text-silver-500">
              {model.type} - {product.category}
            </p>
          </div>

          <ImageSlider
            images={slideImages}
            className="mt-6 overflow-hidden rounded-lg border border-silver-200"
          />

          <div className="mt-6 space-y-5 text-[15px] leading-7 text-navy-900">
            <p>{product.overview.description}</p>
            <p>{product.description}</p>
            <p>{product.overview.targetUsers}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-2 text-sm text-navy-900">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne-500" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-8">
            {articleSections.map((section) => (
              <section key={section.title}>
                <h3 className="text-xl font-bold text-navy-950">
                  {section.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-navy-900">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-8">
            <h3 className="text-xl font-bold text-navy-950">
              Thông số kỹ thuật {model.name}
            </h3>
            <div className="mt-4 overflow-hidden border border-silver-200">
              {Object.entries(product.technicalSpecs).map(([key, value]) => (
                <div
                  key={key}
                  className="grid gap-2 border-b border-silver-200 px-4 py-3 last:border-b-0 sm:grid-cols-[180px_1fr]"
                >
                  <p className="text-sm font-bold text-navy-950">
                    {specLabels[key as keyof typeof specLabels]}
                  </p>
                  <p className="text-sm leading-6 text-silver-500">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-bold text-navy-950">
              Báo giá tham khảo
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-navy-900">
              {product.priceNote}
            </p>
            <div className="mt-4 overflow-hidden border border-silver-200">
              {product.pricing.map((price) => (
                <div
                  key={price.type}
                  className="grid gap-2 border-b border-silver-200 px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_220px]"
                >
                  <p className="text-sm font-bold text-navy-950">
                    {price.type}
                  </p>
                  <p className="text-champagne-600 text-sm font-semibold">
                    {price.price}
                  </p>
                </div>
              ))}
            </div>
            <Button asChild variant="champagne" size="lg" className="mt-5">
              <Link href="/lien-he">
                Liên hệ nhận báo giá chính xác
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </section>
        </article>
      </section>

      <section className="bg-silver-100 py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-navy-950 p-6 text-center text-white sm:p-10">
            <p className="text-sm font-semibold uppercase text-champagne-300">
              Tư vấn miễn phí
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase">
              Nhận tư vấn và báo giá miễn phí
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-silver-300">
              Gửi hình ảnh hiện trạng hoặc kích thước sơ bộ để được tư vấn cấu
              hình và báo giá nhanh cho {model.name}.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modelSchema) }}
      />
    </>
  );
};

export default ProductModelPage;
