import { Quote } from 'lucide-react';

import { testimonials } from '@/data/testimonials';

import { SectionTitle } from './section-title';

export const TestimonialsSection = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Khách hàng"
        title="Niềm tin đến từ quy trình làm việc rõ ràng"
        align="center"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-lg border border-silver-200 bg-white p-6 shadow-sm"
          >
            <Quote className="size-7 text-champagne-500" />
            <p className="mt-5 text-base leading-7 text-navy-900">
              {item.quote}
            </p>
            <div className="mt-6 border-t border-silver-200 pt-4">
              <p className="font-bold text-navy-950">{item.name}</p>
              <p className="mt-1 text-sm text-silver-500">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
