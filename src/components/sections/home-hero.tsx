import { ArrowRight, BadgeCheck, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { brandMetrics, siteConfig } from '@/config/site';
import { formatPhoneHref } from '@/lib/utils';

export const HomeHero = () => (
  <section className="relative min-h-[92vh] overflow-hidden bg-navy-950 pt-24 text-white">
    <Image
      src="/Page1.png"
      alt="Công trình cửa và kính hiện đại"
      fill
      priority
      sizes="100vw"
      className="object-cover opacity-50"
    />
    <div className="via-navy-950/82 absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-950/20" />
    <div className="relative mx-auto flex min-h-[calc(92vh-96px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-silver-100 backdrop-blur">
          <BadgeCheck className="size-4 text-champagne-300" />
          Sản xuất và thi công nhôm kính cao cấp
        </div>
        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          NHÔM KÍNH THÀNH THUỲ
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-100">
          Giải pháp cửa nhôm, cửa cuốn, cửa thép vân gỗ, lan can - cầu thang
          kính, cửa nhựa composite và cửa kính cường lực cho nhà ở, showroom và
          công trình doanh nghiệp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="champagne" size="lg">
            <Link href="/lien-he">
              Nhận tư vấn báo giá
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="light" size="lg">
            <a href={formatPhoneHref(siteConfig.hotline)}>
              <Phone className="size-5" />
              Gọi {siteConfig.hotline}
            </a>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {brandMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur"
            >
              <p className="text-2xl font-bold text-champagne-300">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-silver-200">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
