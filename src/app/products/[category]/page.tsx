import { notFound } from 'next/navigation';

import { ProductListCard } from '@/components/products/product-list-card';
import { SectionTitle } from '@/components/sections/section-title';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { getProductCategory, productCategories } from '@/constants/products';
import { createMetadata } from '@/lib/seo';

type ProductCategoryPageProps = {
  params: { category: string };
};

export const generateStaticParams = () =>
  productCategories.map((category) => ({
    category: category.category,
  }));

export const generateMetadata = ({ params }: ProductCategoryPageProps) => {
  const category = getProductCategory(params.category);

  if (!category) {
    return createMetadata({ title: 'Products' });
  }

  return createMetadata({
    title: category.label,
    description: `${category.label} - danh sách sản phẩm được tạo từ thư mục hình ảnh.`,
    path: `/products/${category.category}`,
    image: category.products[0]?.thumbnail,
  });
};

const ProductCategoryPage = ({ params }: ProductCategoryPageProps) => {
  const category = getProductCategory(params.category);

  if (!category) {
    notFound();
  }

  return (
    <>
      <section className="bg-navy-950 pt-32 text-white">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase text-champagne-300">
            Products
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
            {category.label}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-200">
            Danh sách sản phẩm trong nhóm {category.label.toLowerCase()}.
          </p>
        </Container>
      </section>
      <Section className="bg-silver-100">
        <Container>
          <SectionTitle
            title="Sản phẩm"
            description="Hình đại diện và tên sản phẩm được lấy trực tiếp từ thư mục hình ảnh."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <ProductListCard
                key={product.slug}
                category={category.category}
                product={product}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ProductCategoryPage;
