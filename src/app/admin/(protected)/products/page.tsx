import { ProductStatus } from '@prisma/client';
import { Archive, Eye, Pencil, Plus, Search } from 'lucide-react';
import Link from 'next/link';

import { updateAdminProductStatus } from '@/features/admin/products/product-admin.actions';
import {
  getAdminProductCategories,
  getAdminProducts,
  getProductStatusFromSearch,
} from '@/features/admin/products/product-admin.queries';

type AdminProductsPageProps = {
  searchParams?: {
    q?: string;
    status?: string;
    categoryId?: string;
  };
};

const statusClassNames = {
  DRAFT: 'bg-silver-100 text-silver-700',
  PUBLISHED: 'bg-green-50 text-green-700',
  ARCHIVED: 'bg-red-50 text-red-700',
} satisfies Record<ProductStatus, string>;

const AdminProductsPage = async ({ searchParams }: AdminProductsPageProps) => {
  const filters = {
    q: searchParams?.q?.trim() || undefined,
    status: getProductStatusFromSearch(searchParams?.status),
    categoryId: searchParams?.categoryId || undefined,
  };
  const [products, categories] = await Promise.all([
    getAdminProducts(filters),
    getAdminProductCategories(),
  ]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-champagne-500">
            San pham
          </p>
          <h1 className="mt-2 text-3xl font-bold">Quan ly san pham</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
        >
          <Plus className="size-4" />
          Tao san pham
        </Link>
      </div>

      <form className="mt-6 grid gap-3 rounded-lg border border-silver-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_220px_220px_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-silver-500" />
          <input
            name="q"
            defaultValue={searchParams?.q ?? ''}
            placeholder="Tim theo ten, slug, mo ta"
            className="h-11 w-full rounded-md border border-silver-300 pl-9 pr-3 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200"
          />
        </label>
        <select
          name="status"
          defaultValue={searchParams?.status ?? ''}
          className="h-11 rounded-md border border-silver-300 px-3 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200"
        >
          <option value="">Tat ca trang thai</option>
          {Object.values(ProductStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          name="categoryId"
          defaultValue={searchParams?.categoryId ?? ''}
          className="h-11 rounded-md border border-silver-300 px-3 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200"
        >
          <option value="">Tat ca danh muc</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-11 rounded-md border border-silver-300 bg-white px-4 text-sm font-semibold transition hover:bg-silver-100"
        >
          Loc
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-lg border border-silver-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-silver-200 text-sm">
            <thead className="bg-silver-100 text-left text-xs font-bold uppercase text-silver-500">
              <tr>
                <th className="px-4 py-3">San pham</th>
                <th className="px-4 py-3">Danh muc</th>
                <th className="px-4 py-3">Trang thai</th>
                <th className="px-4 py-3">Noi dung</th>
                <th className="px-4 py-3">Cap nhat</th>
                <th className="px-4 py-3 text-right">Thao tac</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver-200">
              {products.map((product) => (
                <tr key={product.id} className="align-top">
                  <td className="p-4">
                    <p className="font-bold text-navy-950">{product.name}</p>
                    <p className="mt-1 text-xs text-silver-500">
                      /san-pham/{product.slug}
                    </p>
                  </td>
                  <td className="text-silver-700 p-4">
                    {product.category.name}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${statusClassNames[product.status]}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="text-silver-700 p-4">
                    {product.models.length} model, {product.images.length} anh
                  </td>
                  <td className="text-silver-700 p-4">
                    {product.updatedAt.toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/san-pham/${product.slug}`}
                        className="text-silver-700 inline-flex size-9 items-center justify-center rounded-md border border-silver-300 transition hover:bg-silver-100"
                        title="Xem public"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-silver-700 inline-flex size-9 items-center justify-center rounded-md border border-silver-300 transition hover:bg-silver-100"
                        title="Sua"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      {product.status !== ProductStatus.ARCHIVED ? (
                        <form action={updateAdminProductStatus}>
                          <input
                            type="hidden"
                            name="productId"
                            value={product.id}
                          />
                          <input
                            type="hidden"
                            name="status"
                            value={ProductStatus.ARCHIVED}
                          />
                          <button
                            type="submit"
                            className="text-silver-700 inline-flex size-9 items-center justify-center rounded-md border border-silver-300 transition hover:bg-silver-100"
                            title="Archive"
                          >
                            <Archive className="size-4" />
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-silver-500">
            Khong co san pham phu hop.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminProductsPage;
