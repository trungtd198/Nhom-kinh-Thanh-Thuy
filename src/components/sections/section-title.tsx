import { cn } from '@/lib/utils';

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionTitleProps) => (
  <div
    className={cn('max-w-4xl', align === 'center' && 'text-left', className)}
  >
    {eyebrow ? (
      <p className="mb-3 text-sm font-semibold uppercase text-champagne-500">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl">{title}</h2>
    {description ? (
      <p className="mt-4 text-base leading-7 text-silver-500 sm:text-lg">
        {description}
      </p>
    ) : null}
  </div>
);
