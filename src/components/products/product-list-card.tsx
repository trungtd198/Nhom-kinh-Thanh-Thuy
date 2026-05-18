import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import type { ProductItem } from '@/constants/products';

type ProductListCardProps = {
  category: string;
  product: ProductItem;
};

export const ProductListCard = ({
  category,
  product,
}: ProductListCardProps) => (
  <Link href={`/products/${category}/${product.slug}`} className="group block">
    <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-silver-100">
        <Image
          src={product.thumbnail}
          alt={product.label}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-navy-950">{product.label}</h3>
        <ArrowRight className="size-5 shrink-0 text-champagne-500 transition group-hover:translate-x-1" />
      </CardContent>
    </Card>
  </Link>
);
