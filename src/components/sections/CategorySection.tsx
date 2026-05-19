import Image from 'next/image';

import { ProductCard } from '@/components/cards/product-card';
import type { Product } from '@/features/products/product.types';
import { cn } from '@/lib/utils';

type CategorySectionProps = {
  title: string;
  description?: string;
  image: string;
  products: Product[];
  reverse?: boolean;
};

export const CategorySection = ({
  title,
  description,
  image,
  products,
  reverse = false,
}: CategorySectionProps) => {
  const visibleProducts = products.slice(0, 4);
  const productTileClasses = [
    'lg:row-span-4',
    'lg:row-span-3',
    'lg:row-span-4',
    'lg:row-span-3',
  ];

  return (
    <section className="border-t border-silver-200 bg-silver-100 py-14 first:border-t-0 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase text-champagne-500">
            Danh mục
          </p>
          <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-silver-500 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:auto-rows-[minmax(92px,auto)] lg:grid-cols-4">
          <div
            className={cn(
              'relative min-h-[280px] overflow-hidden rounded-lg bg-navy-950 shadow-lg sm:min-h-[340px] lg:row-span-4',
              reverse ? 'lg:order-last' : 'lg:order-first',
            )}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-sm font-semibold uppercase text-champagne-200">
                Nổi bật
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>
            </div>
          </div>

          {visibleProducts.map((product, index) => (
            <div
              key={product.slug}
              className={cn('min-h-[360px]', productTileClasses[index])}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
