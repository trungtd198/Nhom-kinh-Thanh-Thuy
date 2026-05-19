'use client';

import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Product } from '@/features/products/product.types';

type ProductShowcaseCardProps = {
  product: Product;
  index?: number;
};

export const ProductShowcaseCard = ({
  product,
  index = 0,
}: ProductShowcaseCardProps) => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const activeModel = product.models[activeModelIndex];

  const isEven = index % 2 === 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-silver-200 bg-white shadow-sm transition-all duration-300 hover:border-champagne-300 hover:shadow-xl`}
    >
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-champagne-400 via-champagne-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        className={`grid lg:grid-cols-[1fr_1.1fr] ${isEven ? '' : 'lg:grid-cols-[1.1fr_1fr]'}`}
      >
        {/* ── Image panel ── */}
        <div
          className={`relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[420px] ${isEven ? 'lg:order-first' : 'lg:order-last'}`}
        >
          {activeModel ? (
            <Image
              key={activeModel.image}
              src={activeModel.image}
              alt={activeModel.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-all duration-700"
            />
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

          {/* Category badge */}
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900 shadow-sm">
            {product.category}
          </span>

          {/* Active model name overlay */}
          {activeModel && (
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-champagne-300">
                {activeModel.type}
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                {activeModel.name}
              </p>
            </div>
          )}
        </div>

        {/* ── Content panel ── */}
        <div
          className={`flex flex-col p-6 sm:p-8 lg:p-10 ${isEven ? 'lg:order-last' : 'lg:order-first'}`}
        >
          {/* Header */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-champagne-500">
              Sản phẩm
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy-950 sm:text-3xl">
              {product.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-silver-400">
              {product.subtitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-silver-500">
              {product.excerpt}
            </p>
          </div>

          {/* Models / Types */}
          {product.models.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-navy-700">
                Các loại {product.name}
              </p>
              <div className="flex flex-col gap-2">
                {product.models.map((model, i) => (
                  <button
                    key={model.slug ?? model.name}
                    onClick={() => setActiveModelIndex(i)}
                    className={`group/btn flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-all duration-200 ${
                      activeModelIndex === i
                        ? 'bg-champagne-50 border-champagne-400 shadow-sm'
                        : 'bg-silver-50 hover:bg-champagne-50/50 border-silver-200 hover:border-champagne-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Active indicator dot */}
                      <span
                        className={`size-2 shrink-0 rounded-full transition-colors ${
                          activeModelIndex === i
                            ? 'bg-champagne-500'
                            : 'bg-silver-300 group-hover/btn:bg-champagne-400'
                        }`}
                      />
                      <div>
                        <p
                          className={`text-sm font-semibold transition-colors ${
                            activeModelIndex === i
                              ? 'text-navy-950'
                              : 'text-navy-800 group-hover/btn:text-navy-950'
                          }`}
                        >
                          {model.name}
                        </p>
                        <p className="mt-0.5 text-xs text-silver-400">
                          {model.type}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`size-4 shrink-0 transition-all duration-200 ${
                        activeModelIndex === i
                          ? 'translate-x-0.5 text-champagne-500'
                          : 'text-silver-300 group-hover/btn:text-champagne-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {product.highlights.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.highlights.slice(0, 3).map((h) => (
                <span
                  key={h}
                  className="bg-silver-50 rounded-full border border-silver-200 px-3 py-1 text-xs font-medium text-navy-700"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto pt-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary: go to selected model detail */}
              {activeModel && (
                <Link
                  href={`/san-pham/${product.slug}/${activeModel.slug ?? ''}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-800"
                >
                  Xem {activeModel.name}
                  <ArrowRight className="size-4" />
                </Link>
              )}
              {/* Secondary: go to product overview */}
              <Link
                href={`/san-pham/${product.slug}`}
                className="text-champagne-600 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-champagne-500"
              >
                Tất cả {product.models.length} loại
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
