import Image from 'next/image';

const gallery = [
  { title: 'Mặt dựng kính', className: 'md:row-span-2' },
  { title: 'Cửa nhôm hệ', className: '' },
  { title: 'Lan can kính', className: '' },
  { title: 'Vách kính văn phòng', className: 'md:col-span-2' },
];

export const GalleryMasonry = () => (
  <section className="bg-silver-100 py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid auto-rows-[260px] gap-5 md:grid-cols-3">
        {gallery.map((item) => (
          <div
            key={item.title}
            className={`group relative overflow-hidden rounded-lg ${item.className}`}
          >
            <Image
              src="/Page1.png"
              alt={item.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
            <p className="absolute bottom-5 left-5 text-xl font-bold text-white">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
