import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { formatPhoneHref } from '@/lib/utils';

export const CTASection = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-navy-950 p-6 text-white sm:p-10 lg:flex lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-champagne-300">
            Tư vấn trong ngày
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Gửi bản vẽ hoặc kích thước sơ bộ để nhận cấu hình phù hợp
          </h2>
          <p className="mt-4 text-silver-300">
            Đội kỹ thuật sẽ tư vấn phương án mở cửa, chủng loại kính, phụ kiện
            và ngân sách thi công theo từng hạng mục.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
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
    </div>
  </section>
);
