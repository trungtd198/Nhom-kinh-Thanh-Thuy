import { ProductStatus } from '@prisma/client';
import Link from 'next/link';

import type { AdminProductFormRecord } from './product-admin.queries';

type CategoryOption = {
  id: string;
  name: string;
  group: {
    title: string;
  };
};

type ProductAdminFormProps = {
  action: (formData: FormData) => Promise<void>;
  categories: CategoryOption[];
  product?: AdminProductFormRecord;
  saved?: boolean;
};

const getJsonList = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const getTechnicalSpecs = (value: unknown) => {
  const specs =
    value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const getValue = (key: string) => {
    const item = (specs as Record<string, unknown>)[key];

    return typeof item === 'string' ? item : '';
  };

  return {
    material: getValue('material'),
    thickness: getValue('thickness'),
    glass: getValue('glass'),
    accessories: getValue('accessories'),
    colors: getValue('colors'),
    sizes: getValue('sizes'),
  };
};

const fieldClassName =
  'mt-2 w-full rounded-md border border-silver-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200';

const textareaClassName = `${fieldClassName} min-h-28`;

export const ProductAdminForm = ({
  action,
  categories,
  product,
  saved = false,
}: ProductAdminFormProps) => {
  const technicalSpecs = getTechnicalSpecs(product?.technicalSpecs);

  return (
    <form action={action} className="space-y-6">
      {product ? (
        <input type="hidden" name="productId" value={product.id} />
      ) : null}

      {saved ? (
        <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
          Da luu thay doi.
        </p>
      ) : null}

      <section className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Ten san pham</span>
            <input
              name="name"
              defaultValue={product?.name}
              required
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Slug</span>
            <input
              name="slug"
              defaultValue={product?.slug}
              required
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Danh muc</span>
            <select
              name="categoryId"
              defaultValue={product?.categoryId}
              required
              className={fieldClassName}
            >
              <option value="">Chon danh muc</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.group.title} - {category.name}
                </option>
              ))}
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold">Trang thai</span>
              <select
                name="status"
                defaultValue={product?.status ?? ProductStatus.DRAFT}
                className={fieldClassName}
              >
                {Object.values(ProductStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Thu tu</span>
              <input
                name="sortOrder"
                type="number"
                defaultValue={product?.sortOrder ?? 0}
                className={fieldClassName}
              />
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Noi dung hien thi</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Hero title</span>
            <input
              name="heroTitle"
              defaultValue={product?.heroTitle}
              required
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Subtitle</span>
            <input
              name="subtitle"
              defaultValue={product?.subtitle ?? ''}
              className={fieldClassName}
            />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold">Excerpt</span>
            <textarea
              name="excerpt"
              defaultValue={product?.excerpt}
              required
              className={textareaClassName}
            />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold">Description</span>
            <textarea
              name="description"
              defaultValue={product?.description}
              required
              className={textareaClassName}
            />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold">Cover image URL</span>
            <input
              name="coverImageUrl"
              defaultValue={product?.coverImageUrl ?? ''}
              className={fieldClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Tong quan</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold">Overview description</span>
            <textarea
              name="overviewDescription"
              defaultValue={product?.overviewDescription ?? ''}
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Gia tri su dung</span>
            <textarea
              name="overviewValue"
              defaultValue={product?.overviewValue ?? ''}
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Doi tuong phu hop</span>
            <textarea
              name="overviewTargetUsers"
              defaultValue={product?.overviewTargetUsers ?? ''}
              className={textareaClassName}
            />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold">Ly do nen chon</span>
            <textarea
              name="overviewReasons"
              defaultValue={getJsonList(product?.overviewReasons).join('\n')}
              className={textareaClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Danh sach noi dung</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold">Highlights</span>
            <textarea
              name="highlights"
              defaultValue={getJsonList(product?.highlights).join('\n')}
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Advantages</span>
            <textarea
              name="advantages"
              defaultValue={getJsonList(product?.advantages).join('\n')}
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Applications</span>
            <textarea
              name="applications"
              defaultValue={getJsonList(product?.applications).join('\n')}
              className={textareaClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Thong so ky thuat</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Chat lieu</span>
            <input
              name="technicalSpecMaterial"
              defaultValue={technicalSpecs.material}
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Do day</span>
            <input
              name="technicalSpecThickness"
              defaultValue={technicalSpecs.thickness}
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Kinh su dung</span>
            <input
              name="technicalSpecGlass"
              defaultValue={technicalSpecs.glass}
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Phu kien</span>
            <input
              name="technicalSpecAccessories"
              defaultValue={technicalSpecs.accessories}
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Mau sac</span>
            <input
              name="technicalSpecColors"
              defaultValue={technicalSpecs.colors}
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Kich thuoc</span>
            <input
              name="technicalSpecSizes"
              defaultValue={technicalSpecs.sizes}
              className={fieldClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Bang gia, specs, FAQ</h2>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <span className="text-sm font-semibold">Price note</span>
            <textarea
              name="priceNote"
              defaultValue={product?.priceNote ?? ''}
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Specs</span>
            <textarea
              name="specsText"
              defaultValue={product?.specs
                .map((spec) => `${spec.label} | ${spec.value}`)
                .join('\n')}
              placeholder="He cua | Cua di, cua so..."
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Pricing</span>
            <textarea
              name="pricingText"
              defaultValue={product?.pricing
                .map((price) => `${price.type} | ${price.price}`)
                .join('\n')}
              placeholder="Cua nhom pho thong | Lien he"
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">FAQ</span>
            <textarea
              name="faqsText"
              defaultValue={product?.faqs
                .map((faq) => `${faq.question} | ${faq.answer}`)
                .join('\n')}
              placeholder="Cau hoi? | Cau tra loi"
              className={textareaClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">SEO</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">SEO title</span>
            <input
              name="seoTitle"
              defaultValue={product?.seoTitle ?? ''}
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">SEO image URL</span>
            <input
              name="seoImageUrl"
              defaultValue={product?.seoImageUrl ?? ''}
              className={fieldClassName}
            />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold">SEO description</span>
            <textarea
              name="seoDescription"
              defaultValue={product?.seoDescription ?? ''}
              className={textareaClassName}
            />
          </label>
        </div>
      </section>

      <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-silver-200 bg-silver-100/95 py-4 backdrop-blur">
        <Link
          href="/admin/products"
          className="rounded-md border border-silver-300 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-silver-100"
        >
          Huy
        </Link>
        <button
          type="submit"
          className="rounded-md bg-navy-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
        >
          Luu san pham
        </button>
      </div>
    </form>
  );
};
