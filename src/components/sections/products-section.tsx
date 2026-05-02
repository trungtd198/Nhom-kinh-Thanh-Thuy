import Link from 'next/link';

import { ProductCard } from '@/components/cards/product-card';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

import { SectionTitle } from './section-title';

export const ProductsSection = () => (
  <section className="bg-silver-100 py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionTitle
          eyebrow="Danh mục sản phẩm"
          title="Hệ nhôm kính cho công trình cần độ hoàn thiện cao"
          description="Các nhóm sản phẩm được cấu trúc sẵn để dễ chỉnh sửa nội dung, SEO từng trang và mở rộng danh mục khi cần."
        />
        <Button asChild variant="outline">
          <Link href="/san-pham">Xem tất cả sản phẩm</Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  </section>
);
