import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const Section = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => (
  <section className={cn('py-16 sm:py-20', className)} {...props} />
);
