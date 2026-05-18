import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { SectionTitle } from '@/components/sections/section-title';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { productCategories } from '@/constants/products';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Products',
  description: 'Dynamic product categories generated from image folders.',
  path: '/products',
});

const ProductsPage = () => (
  <>
    <section className="bg-navy-950 pt-32 text-white">
      <Container className="py-16">
        <p className="text-sm font-semibold uppercase text-champagne-300">
          Products
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
          Danh mục sản phẩm
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-200">
          Các nhóm sản phẩm được tạo tự động từ thư mục hình ảnh trong public.
        </p>
      </Container>
    </section>
    <Section className="bg-silver-100">
      <Container>
        <SectionTitle
          title="Chọn nhóm sản phẩm"
          description="Thêm nhóm hoặc sản phẩm mới bằng cách thêm thư mục và hình ảnh vào public/assets/images."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => {
            const thumbnail = category.products[0]?.thumbnail;

            if (!thumbnail) {
              return null;
            }

            return (
              <Link
                key={category.category}
                href={`/products/${category.category}`}
                className="group block"
              >
                <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-silver-100">
                    <Image
                      src={thumbnail}
                      alt={category.label}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  </div>
                  <CardContent>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-navy-950">
                          {category.label}
                        </h2>
                        <p className="mt-2 text-sm text-silver-500">
                          {category.products.length} sản phẩm
                        </p>
                      </div>
                      <ArrowRight className="mt-1 size-5 shrink-0 text-champagne-500 transition group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  </>
);

export default ProductsPage;
