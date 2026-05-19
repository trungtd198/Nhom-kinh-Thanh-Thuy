import Link from 'next/link';
import type { ReactNode } from 'react';

import { requireAdminUser } from '@/features/admin/auth/guards';

type AdminProtectedLayoutProps = {
  children: ReactNode;
};

const navigationItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'San pham' },
  { href: '/admin/categories', label: 'Danh muc' },
  { href: '/admin/media', label: 'Media' },
];

const AdminProtectedLayout = async ({
  children,
}: AdminProtectedLayoutProps) => {
  const adminUser = await requireAdminUser();

  return (
    <div className="min-h-screen bg-silver-100 text-navy-950">
      <header className="border-b border-silver-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Link href="/admin" className="text-lg font-bold">
              Nam Thanh Admin
            </Link>
            <p className="mt-1 text-sm text-silver-500">
              {adminUser.name} - {adminUser.role}
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-navy-900 transition hover:bg-silver-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/logout"
              className="rounded-md bg-navy-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              Dang xuat
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default AdminProtectedLayout;
