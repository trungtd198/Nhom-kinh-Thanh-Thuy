import Image from 'next/image';

import { Card } from '@/components/ui/card';

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [featuredImage, ...galleryImages] = images;

  if (!featuredImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card className="relative aspect-[4/3] overflow-hidden bg-silver-100">
        <Image
          src={featuredImage}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </Card>
      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryImages.map((image, index) => (
            <Card
              key={image}
              className="relative aspect-square overflow-hidden bg-silver-100"
            >
              <Image
                src={image}
                alt={`${title} - hình ${index + 2}`}
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
};
