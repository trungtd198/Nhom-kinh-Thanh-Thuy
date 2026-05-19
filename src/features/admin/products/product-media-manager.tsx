import Image from 'next/image';

import {
  createAdminProductModel,
  deleteAdminProductImage,
  deleteAdminProductModel,
  setAdminProductImageCover,
  updateAdminProductModel,
  uploadAdminProductImage,
} from './product-admin.actions';
import type { AdminProductFormRecord } from './product-admin.queries';

type ProductMediaManagerProps = {
  product: AdminProductFormRecord;
};

const fieldClassName =
  'mt-2 w-full rounded-md border border-silver-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200';

const smallButtonClassName =
  'rounded-md border border-silver-300 bg-white px-3 py-2 text-xs font-semibold transition hover:bg-silver-100';

const primaryButtonClassName =
  'rounded-md bg-navy-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-navy-800';

const ImageTile = ({
  image,
  productId,
}: {
  image: AdminProductFormRecord['images'][number];
  productId: string;
}) => (
  <div className="overflow-hidden rounded-lg border border-silver-200 bg-white">
    <div className="relative aspect-[4/3] bg-silver-100">
      <Image
        src={image.publicUrl}
        alt={image.alt ?? ''}
        fill
        sizes="240px"
        className="object-cover"
      />
      {image.isCover ? (
        <span className="absolute left-2 top-2 rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
          Cover
        </span>
      ) : null}
    </div>
    <div className="space-y-2 p-3">
      <p className="line-clamp-1 text-xs font-semibold text-navy-950">
        {image.alt || image.caption || image.publicUrl}
      </p>
      <div className="flex flex-wrap gap-2">
        {!image.isCover ? (
          <form action={setAdminProductImageCover}>
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="imageId" value={image.id} />
            <button type="submit" className={smallButtonClassName}>
              Set cover
            </button>
          </form>
        ) : null}
        <form action={deleteAdminProductImage}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="imageId" value={image.id} />
          <button type="submit" className={smallButtonClassName}>
            Xoa
          </button>
        </form>
      </div>
    </div>
  </div>
);

const UploadImageForm = ({
  productId,
  modelId,
}: {
  productId: string;
  modelId?: string;
}) => (
  <form
    action={uploadAdminProductImage}
    className="grid gap-3 rounded-lg border border-silver-200 bg-silver-100 p-4 lg:grid-cols-[1fr_1fr_120px_auto_auto]"
  >
    <input type="hidden" name="productId" value={productId} />
    {modelId ? <input type="hidden" name="modelId" value={modelId} /> : null}
    <label className="block">
      <span className="text-xs font-semibold uppercase text-silver-500">
        Anh
      </span>
      <input
        name="image"
        type="file"
        accept="image/*"
        required
        className={fieldClassName}
      />
    </label>
    <label className="block">
      <span className="text-xs font-semibold uppercase text-silver-500">
        Alt
      </span>
      <input name="alt" className={fieldClassName} />
    </label>
    <label className="block">
      <span className="text-xs font-semibold uppercase text-silver-500">
        Thu tu
      </span>
      <input
        name="sortOrder"
        type="number"
        defaultValue={0}
        className={fieldClassName}
      />
    </label>
    <label className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
      <input name="isCover" type="checkbox" className="size-4" />
      Cover
    </label>
    <button
      type="submit"
      className="mt-6 h-10 rounded-md bg-navy-950 px-4 text-sm font-bold text-white"
    >
      Upload
    </button>
  </form>
);

export const ProductMediaManager = ({ product }: ProductMediaManagerProps) => {
  const productImages = product.images.filter((image) => !image.modelId);

  return (
    <section id="media" className="mt-10 space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase text-champagne-500">
          Media & model
        </p>
        <h2 className="mt-2 text-2xl font-bold">Quan ly anh va mau san pham</h2>
      </div>

      <div className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold">Anh san pham</h3>
        <div className="mt-4">
          <UploadImageForm productId={product.id} />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productImages.map((image) => (
            <ImageTile key={image.id} image={image} productId={product.id} />
          ))}
        </div>
        {productImages.length === 0 ? (
          <p className="mt-4 text-sm text-silver-500">Chua co anh san pham.</p>
        ) : null}
      </div>

      <div className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold">Them model moi</h3>
        <form
          action={createAdminProductModel}
          className="mt-4 grid gap-4 lg:grid-cols-4"
        >
          <input type="hidden" name="productId" value={product.id} />
          <label className="block">
            <span className="text-sm font-semibold">Ten model</span>
            <input name="name" required className={fieldClassName} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Slug</span>
            <input name="slug" className={fieldClassName} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Loai/ung dung</span>
            <input name="type" required className={fieldClassName} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Thu tu</span>
            <input
              name="sortOrder"
              type="number"
              defaultValue={product.models.length}
              className={fieldClassName}
            />
          </label>
          <label className="block lg:col-span-3">
            <span className="text-sm font-semibold">Mo ta</span>
            <input name="description" className={fieldClassName} />
          </label>
          <label className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
            <input
              name="isActive"
              type="checkbox"
              defaultChecked
              className="size-4"
            />
            Active
          </label>
          <div className="lg:col-span-4">
            <button type="submit" className={primaryButtonClassName}>
              Them model
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-5">
        {product.models.map((model) => (
          <div
            key={model.id}
            className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <form
                action={updateAdminProductModel}
                className="grid flex-1 gap-4 lg:grid-cols-4"
              >
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="modelId" value={model.id} />
                <label className="block">
                  <span className="text-sm font-semibold">Ten model</span>
                  <input
                    name="name"
                    defaultValue={model.name}
                    required
                    className={fieldClassName}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Slug</span>
                  <input
                    name="slug"
                    defaultValue={model.slug}
                    required
                    className={fieldClassName}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Loai/ung dung</span>
                  <input
                    name="type"
                    defaultValue={model.type}
                    required
                    className={fieldClassName}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Thu tu</span>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={model.sortOrder}
                    className={fieldClassName}
                  />
                </label>
                <label className="block lg:col-span-3">
                  <span className="text-sm font-semibold">Mo ta</span>
                  <input
                    name="description"
                    defaultValue={model.description ?? ''}
                    className={fieldClassName}
                  />
                </label>
                <label className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={model.isActive}
                    className="size-4"
                  />
                  Active
                </label>
                <div className="lg:col-span-4">
                  <button type="submit" className={primaryButtonClassName}>
                    Luu model
                  </button>
                </div>
              </form>
              <form action={deleteAdminProductModel}>
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="modelId" value={model.id} />
                <button type="submit" className={smallButtonClassName}>
                  Xoa model
                </button>
              </form>
            </div>

            <div className="mt-5">
              <UploadImageForm productId={product.id} modelId={model.id} />
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {model.images.map((image) => (
                  <ImageTile
                    key={image.id}
                    image={image}
                    productId={product.id}
                  />
                ))}
              </div>
              {model.images.length === 0 ? (
                <p className="mt-4 text-sm text-silver-500">
                  Chua co anh cho model nay.
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
