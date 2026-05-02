import { ProductCard } from '@/components/cards/product-card';
import { CTASection } from '@/components/sections/cta-section';
import { SectionTitle } from '@/components/sections/section-title';
import { products } from '@/data/products';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Danh mục sản phẩm',
  description:
    'Danh mục cửa nhôm, cửa cuốn, cửa thép vân gỗ, lan can - cầu thang kính, cửa nhựa composite và cửa kính cường lực.',
  path: '/san-pham',
});

const ProductsPage = () => (
  <>
    <section className="bg-navy-950 pt-32 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-champagne-300">
          Sản phẩm
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
          Danh mục cửa và kính công trình
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-200">
          Cấu trúc sản phẩm hỗ trợ SEO từng trang chi tiết, dễ chỉnh sửa trong
          thư mục dữ liệu và sẵn sàng mở rộng thêm danh mục.
        </p>
      </div>
    </section>
    <section className="bg-silver-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Chọn nhóm sản phẩm phù hợp công trình"
          description="Mỗi hạng mục có cấu hình vật tư và tiêu chuẩn thi công riêng, được tư vấn theo hiện trạng thực tế."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
    <CTASection />
  </>
);

export default ProductsPage;
