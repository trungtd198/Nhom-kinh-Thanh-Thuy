import Link from 'next/link';

import { createAdminProduct } from '@/features/admin/products/product-admin.actions';
import { getAdminProductCategories } from '@/features/admin/products/product-admin.queries';
import { ProductAdminForm } from '@/features/admin/products/product-admin-form';

const NewAdminProductPage = async () => {
  const categories = await getAdminProductCategories();

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-champagne-500">
            San pham
          </p>
          <h1 className="mt-2 text-3xl font-bold">Tao san pham moi</h1>
        </div>
        <Link
          href="/admin/products"
          className="rounded-md border border-silver-300 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-silver-100"
        >
          Quay lai danh sach
        </Link>
      </div>

      <ProductAdminForm action={createAdminProduct} categories={categories} />
    </div>
  );
};

export default NewAdminProductPage;
