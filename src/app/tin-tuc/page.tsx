import { BlogCard } from '@/components/cards/blog-card';
import { CTASection } from '@/components/sections/cta-section';
import { SectionTitle } from '@/components/sections/section-title';
import { posts } from '@/data/posts';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Tin tức nhôm kính',
  description:
    'Kinh nghiệm chọn cửa nhôm, kính cường lực, phụ kiện và báo giá nhôm kính minh bạch.',
  path: '/tin-tuc',
});

const NewsPage = () => (
  <>
    <section className="bg-navy-950 pt-32 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-champagne-300">
          Tin tức
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
          Kiến thức vật tư và kinh nghiệm thi công nhôm kính
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-200">
          Khu vực nội dung hỗ trợ SEO dài hạn và giúp khách hàng hiểu rõ hơn về
          cấu hình trước khi quyết định.
        </p>
      </div>
    </section>
    <section className="bg-silver-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Bài viết mới"
          description="Dữ liệu bài viết đang nằm trong src/data/posts.ts để đội ngũ có thể cập nhật nhanh."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
    <CTASection />
  </>
);

export default NewsPage;
