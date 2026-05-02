import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/data/products';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => (
  <Link
    href={`/san-pham/${product.slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-lg border border-silver-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-silver-100">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
      <span className="absolute left-4 top-4 rounded-md bg-white/95 px-3 py-1 text-xs font-semibold uppercase text-navy-900">
        {product.category}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-navy-950">{product.name}</h3>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-champagne-500 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-silver-500">
        {product.excerpt}
      </p>
      <div className="mt-5 space-y-2">
        {product.highlights.slice(0, 2).map((item) => (
          <div key={item} className="flex gap-2 text-sm text-navy-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </Link>
);
