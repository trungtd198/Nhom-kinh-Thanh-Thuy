import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatPhoneHref = (phone: string) =>
  `tel:${phone.replace(/\s/g, '')}`;
