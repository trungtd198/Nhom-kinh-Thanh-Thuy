import { ProjectCard } from '@/components/cards/project-card';
import { CTASection } from '@/components/sections/cta-section';
import { GalleryMasonry } from '@/components/sections/gallery-masonry';
import { SectionTitle } from '@/components/sections/section-title';
import { projects } from '@/data/projects';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Dự án thực tế',
  description:
    'Hồ sơ dự án cửa nhôm, cửa cuốn, cửa thép vân gỗ, lan can - cầu thang kính, cửa nhựa composite và cửa kính cường lực do NHÔM KÍNH THÀNH THUỲ thi công.',
  path: '/du-an',
});

const ProjectsPage = () => (
  <>
    <section className="bg-navy-950 pt-32 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-champagne-300">
          Dự án
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
          Công trình thực tế đã thi công và nghiệm thu
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-200">
          Danh mục dự án giúp tăng độ tin cậy khi chạy quảng cáo và hỗ trợ khách
          hàng hình dung chất lượng hoàn thiện.
        </p>
      </div>
    </section>
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Dự án nổi bật" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
    <GalleryMasonry />
    <CTASection />
  </>
);

export default ProjectsPage;
