import { ProductStatus } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  updateAdminProduct,
  updateAdminProductStatus,
} from '@/features/admin/products/product-admin.actions';
import {
  getAdminProductById,
  getAdminProductCategories,
} from '@/features/admin/products/product-admin.queries';
import { ProductAdminForm } from '@/features/admin/products/product-admin-form';
import { ProductMediaManager } from '@/features/admin/products/product-media-manager';

type EditAdminProductPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    saved?: string;
  };
};

const statusActions = [
  { label: 'Chuyen Draft', status: ProductStatus.DRAFT },
  { label: 'Publish', status: ProductStatus.PUBLISHED },
  { label: 'Archive', status: ProductStatus.ARCHIVED },
];

const EditAdminProductPage = async ({
  params,
  searchParams,
}: EditAdminProductPageProps) => {
  const [product, categories] = await Promise.all([
    getAdminProductById(params.id),
    getAdminProductCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-champagne-500">
            San pham
          </p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-1 text-sm text-silver-500">
            /san-pham/{product.slug}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/san-pham/${product.slug}`}
            className="rounded-md border border-silver-300 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-silver-100"
          >
            Xem public
          </Link>
          {statusActions
            .filter((item) => item.status !== product.status)
            .map((item) => (
              <form key={item.status} action={updateAdminProductStatus}>
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="status" value={item.status} />
                <button
                  type="submit"
                  className="rounded-md border border-silver-300 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-silver-100"
                >
                  {item.label}
                </button>
              </form>
            ))}
        </div>
      </div>

      <ProductAdminForm
        action={updateAdminProduct}
        categories={categories}
        product={product}
        saved={searchParams?.saved === '1'}
      />
      <ProductMediaManager product={product} />
    </div>
  );
};

export default EditAdminProductPage;
