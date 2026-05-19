import { ProductStatus } from '@prisma/client';

import { db } from '@/lib/db';

const AdminDashboardPage = async () => {
  const [totalProducts, publishedProducts, draftProducts, archivedProducts] =
    await Promise.all([
      db.product.count(),
      db.product.count({ where: { status: ProductStatus.PUBLISHED } }),
      db.product.count({ where: { status: ProductStatus.DRAFT } }),
      db.product.count({ where: { status: ProductStatus.ARCHIVED } }),
    ]);

  const stats = [
    { label: 'Tong san pham', value: totalProducts },
    { label: 'Da publish', value: publishedProducts },
    { label: 'Draft', value: draftProducts },
    { label: 'Archived', value: archivedProducts },
  ];

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-champagne-500">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold">Quan tri san pham</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-silver-500">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-bold text-navy-950">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
