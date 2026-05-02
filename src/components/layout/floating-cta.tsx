'use client';

import { ArrowUp, MessageCircle, Phone } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { formatPhoneHref } from '@/lib/utils';

export const FloatingCTA = () => (
  <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3">
    <a
      href={`https://zalo.me/${siteConfig.zalo.replace(/\s/g, '')}`}
      className="flex size-12 items-center justify-center rounded-full bg-[#0068ff] text-xs font-bold text-white shadow-xl"
      aria-label="Chat Zalo"
    >
      Zalo
    </a>
    <a
      href={siteConfig.messengerUrl}
      className="flex size-12 items-center justify-center rounded-full bg-[#0084ff] text-white shadow-xl"
      aria-label="Chat Messenger"
    >
      <MessageCircle className="size-5" />
    </a>
    <a
      href={formatPhoneHref(siteConfig.hotline)}
      className="flex size-12 items-center justify-center rounded-full bg-champagne-400 text-navy-950 shadow-xl"
      aria-label="Gọi hotline"
    >
      <Phone className="size-5" />
    </a>
    <button
      type="button"
      className="flex size-12 items-center justify-center rounded-full bg-navy-950 text-white shadow-xl"
      aria-label="Lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="size-5" />
    </button>
  </div>
);
