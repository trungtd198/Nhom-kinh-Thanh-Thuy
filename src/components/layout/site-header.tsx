'use client';

import { Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { mainNav, productMenuGroups } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn, formatPhoneHref } from '@/lib/utils';

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b transition',
        scrolled
          ? 'border-silver-200 bg-white/95 shadow-sm backdrop-blur'
          : 'border-white/10 bg-navy-950/70 text-white backdrop-blur',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={siteConfig.displayName}
        >
          <span className="relative size-11 overflow-hidden rounded-md bg-white">
            <Image
              src={siteConfig.logo}
              alt=""
              fill
              sizes="44px"
              className="object-contain p-1"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold">
              {siteConfig.displayName}
            </span>
            <span
              className={cn(
                'block text-xs',
                scrolled ? 'text-silver-500' : 'text-silver-200',
              )}
            >
              {siteConfig.domain}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  'inline-flex h-11 items-center whitespace-nowrap rounded-md px-2 text-sm font-semibold transition lg:px-2.5 xl:px-3',
                  scrolled
                    ? 'text-navy-900 hover:bg-silver-100'
                    : 'text-white hover:bg-white/10',
                )}
              >
                {item.title}
              </Link>
              {item.hasMegaMenu ? (
                <div className="invisible absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-3 gap-5 rounded-lg border border-silver-200 bg-white p-5 text-navy-950 shadow-2xl">
                    {productMenuGroups.map((group) => (
                      <div key={group.title}>
                        <p className="mb-3 text-sm font-bold text-champagne-500">
                          {group.title}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((menuItem) => (
                            <Link
                              key={menuItem.href}
                              href={menuItem.href}
                              className="block rounded-md px-3 py-2 text-sm text-silver-500 transition hover:bg-silver-100 hover:text-navy-950"
                            >
                              {menuItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={formatPhoneHref(siteConfig.hotline)}
            className={cn(
              'inline-flex items-center gap-2 text-sm font-bold',
              scrolled ? 'text-navy-950' : 'text-white',
            )}
          >
            <Phone className="size-4 text-champagne-400" />
            {siteConfig.hotline}
          </a>
          <Button asChild variant="champagne">
            <Link href="/lien-he">Nhận báo giá</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden',
            scrolled ? 'bg-silver-100 text-navy-950' : 'bg-white/10 text-white',
          )}
          onClick={() => setOpen((value) => !value)}
          aria-label="Mở menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-silver-200 bg-white px-4 py-5 text-navy-950 shadow-xl lg:hidden">
          <div className="space-y-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md p-3 text-base font-semibold hover:bg-silver-100"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="mt-5 border-t border-silver-200 pt-5">
            {productMenuGroups.map((group) => (
              <div key={group.title} className="mb-4">
                <p className="px-3 text-sm font-bold text-champagne-500">
                  {group.title}
                </p>
                {group.items.map((menuItem) => (
                  <Link
                    key={menuItem.href}
                    href={menuItem.href}
                    className="block rounded-md px-3 py-2 text-sm text-silver-500 hover:bg-silver-100"
                    onClick={() => setOpen(false)}
                  >
                    {menuItem.title}
                  </Link>
                ))}
              </div>
            ))}
            <Button
              asChild
              variant="champagne"
              size="lg"
              className="mt-2 w-full"
            >
              <a href={formatPhoneHref(siteConfig.hotline)}>
                Gọi {siteConfig.hotline}
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
};
