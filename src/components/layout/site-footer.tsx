import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { productMenuGroups } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { formatPhoneHref } from '@/lib/utils';

const footerLinks = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dự án thực tế', href: '/du-an' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const SiteFooter = () => (
  <footer className="bg-navy-950 text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div>
        <div className="flex items-center gap-3">
          <span className="relative size-12 overflow-hidden rounded-md bg-white">
            <Image
              src={siteConfig.logo}
              alt=""
              fill
              sizes="48px"
              className="object-contain p-1"
            />
          </span>
          <div>
            <p className="font-bold">{siteConfig.displayName}</p>
            <p className="text-sm text-silver-300">{siteConfig.slogan}</p>
          </div>
        </div>
        <p className="mt-6 max-w-xl text-sm leading-6 text-silver-300">
          {siteConfig.companyName} cung cấp và thi công cửa nhôm, cửa cuốn, cửa
          thép vân gỗ, lan can - cầu thang kính, cửa nhựa composite và cửa kính
          cường lực.
        </p>
        <div className="mt-6 space-y-3 text-sm text-silver-200">
          <a
            href={formatPhoneHref(siteConfig.hotline)}
            className="flex items-center gap-3"
          >
            <Phone className="size-4 text-champagne-400" />
            {siteConfig.hotline}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3"
          >
            <Mail className="size-4 text-champagne-400" />
            {siteConfig.email}
          </a>
          <p className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-champagne-400" />
            {siteConfig.address}
          </p>
        </div>
      </div>

      <div>
        <p className="font-bold">Sản phẩm chủ lực</p>
        <div className="mt-4 grid gap-2">
          {productMenuGroups
            .flatMap((group) => group.items)
            .slice(0, 7)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-silver-300 transition hover:text-champagne-300"
              >
                {item.title}
              </Link>
            ))}
        </div>
      </div>

      <div>
        <p className="font-bold">Thông tin doanh nghiệp</p>
        <div className="mt-4 grid gap-2">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-silver-300 transition hover:text-champagne-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-champagne-300">
            Mã số doanh nghiệp
          </p>
          <p className="mt-2 text-sm text-silver-300">{siteConfig.taxCode}</p>
          <p className="mt-4 text-sm font-semibold text-champagne-300">
            Giám đốc
          </p>
          <p className="mt-2 text-sm text-silver-300">
            {siteConfig.legalRepresentative}
          </p>
          <p className="mt-4 text-sm font-semibold text-champagne-300">
            Giờ làm việc
          </p>
          <p className="mt-2 text-sm text-silver-300">
            {siteConfig.businessHours}
          </p>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-silver-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Copyright © 2026 {siteConfig.displayName}. All rights reserved.</p>
        <p>{siteConfig.domain}</p>
      </div>
    </div>
  </footer>
);
