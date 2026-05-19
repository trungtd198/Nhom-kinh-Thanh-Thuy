'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { FloatingCTA } from '@/components/layout/floating-cta';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

type PublicShellProps = {
  children: ReactNode;
};

export const PublicShell = ({ children }: PublicShellProps) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingCTA />
    </>
  );
};
