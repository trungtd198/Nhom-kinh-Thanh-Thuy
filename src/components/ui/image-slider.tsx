'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type ImageSliderProps = {
  images: { src: string; alt: string }[];
  className?: string;
};

export const ImageSlider = ({ images, className }: ImageSliderProps) => {
  const [active, setActive] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (index: number) => {
      const next = (index + images.length) % images.length;
      setActive(next);

      // scroll thumbnail into view
      const el = thumbRef.current?.children[next] as HTMLElement | undefined;
      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    },
    [images.length],
  );

  if (images.length === 0) return null;

  return (
    <div className={cn('overflow-hidden', className)}>
      {/* Main image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-silver-100">
        <Image
          src={images[active]!.src}
          alt={images[active]!.alt}
          fill
          priority={active === 0}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover transition-opacity duration-300"
        />

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(active - 1)}
              className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              aria-label="Ảnh tiếp"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <span className="absolute bottom-3 right-3 z-10 rounded-md bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          ref={thumbRef}
          className="no-scrollbar flex gap-2 overflow-x-auto p-2"
        >
          {images.map((img, index) => (
            <button
              key={`${img.src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                'relative aspect-square w-16 shrink-0 overflow-hidden rounded border-2 transition sm:w-20',
                index === active
                  ? 'border-champagne-500'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
