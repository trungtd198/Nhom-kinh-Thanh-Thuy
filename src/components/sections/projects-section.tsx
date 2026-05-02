import Link from 'next/link';

import { ProjectCard } from '@/components/cards/project-card';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';

import { SectionTitle } from './section-title';

export const ProjectsSection = () => (
  <section className="bg-navy-950 py-16 text-white sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionTitle
          eyebrow="Dự án thực tế"
          title="Không gian kính lớn, đường nét sạch, hoàn thiện bền"
          description="Mỗi dự án tập trung vào tính đồng bộ vật tư, thẩm mỹ mặt tiền và độ kín khít sau lắp đặt."
          className="[&>h2]:text-white [&>p]:text-silver-300"
        />
        <Button asChild variant="light">
          <Link href="/du-an">Xem dự án</Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  </section>
);
