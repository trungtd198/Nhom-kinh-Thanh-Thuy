import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProductGallery } from '@/components/products/product-gallery';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import {
  getProductCategory,
  getProductItem,
  productCategories,
} from '@/constants/products';
import { createMetadata } from '@/lib/seo';

type ProductDetailPageProps = {
  params: { category: string; product: string };
};

export const generateStaticParams = () =>
  productCategories.flatMap((category) =>
    category.products.map((product) => ({
      category: category.category,
      product: product.slug,
    })),
  );

export const generateMetadata = ({ params }: ProductDetailPageProps) => {
  const category = getProductCategory(params.category);
  const product = getProductItem(params.category, params.product);

  if (!category || !product) {
    return createMetadata({ title: 'Product detail' });
  }

  return createMetadata({
    title: product.label,
    description: `${product.label} thuộc nhóm ${category.label}.`,
    path: `/products/${category.category}/${product.slug}`,
    image: product.thumbnail,
  });
};

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const category = getProductCategory(params.category);
  const product = getProductItem(params.category, params.product);

  if (!category || !product) {
    notFound();
  }

  return (
    <>
      <section className="bg-navy-950 pt-32 text-white">
        <Container className="py-16">
          <Link
            href={`/products/${category.category}`}
            className="text-sm font-semibold text-champagne-300"
          >
            Quay lại {category.label}
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase text-champagne-300">
            {category.label}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
            {product.label}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-200">
            Mô tả cơ bản cho {product.label.toLowerCase()}. Nội dung chi tiết có
            thể được mở rộng từ dữ liệu sản phẩm khi cần.
          </p>
        </Container>
      </section>
      <Section className="bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <ProductGallery images={product.images} title={product.label} />
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase text-champagne-500">
                Chi tiết sản phẩm
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950">
                {product.label}
              </h2>
              <p className="mt-4 text-base leading-7 text-silver-500">
                Đây là mô tả placeholder cho {product.label.toLowerCase()}. Sản
                phẩm thuộc nhóm {category.label.toLowerCase()}, hình ảnh được
                đồng bộ tự động từ thư mục public.
              </p>
              <div className="mt-6 rounded-lg border border-silver-200 bg-silver-100 p-5">
                <p className="text-sm font-semibold text-navy-950">
                  Số lượng hình ảnh
                </p>
                <p className="mt-2 text-sm text-silver-500">
                  {product.images.length} hình trong thư mục sản phẩm.
                </p>
              </div>
              <Button asChild variant="champagne" size="lg" className="mt-6">
                <Link href="/lien-he">Liên hệ nhận báo giá</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ProductDetailPage;
