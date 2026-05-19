import {
  createAdminCategory,
  createAdminCategoryGroup,
  deleteAdminCategory,
  deleteAdminCategoryGroup,
  updateAdminCategory,
  updateAdminCategoryGroup,
} from '@/features/admin/categories/category-admin.actions';
import {
  getAdminCategoryGroupOptions,
  getAdminCategoryGroups,
} from '@/features/admin/categories/category-admin.queries';

type AdminCategoriesPageProps = {
  searchParams?: {
    status?: string;
  };
};

const fieldClassName =
  'mt-2 w-full rounded-md border border-silver-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200';

const primaryButtonClassName =
  'rounded-md bg-navy-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-navy-800';

const secondaryButtonClassName =
  'rounded-md border border-silver-300 bg-white px-3 py-2 text-sm font-semibold transition hover:bg-silver-100';

const getStatusMessage = (status?: string) => {
  if (status === 'group-has-categories') {
    return 'Khong the xoa group dang co danh muc.';
  }

  if (status === 'category-has-products') {
    return 'Khong the xoa danh muc dang co san pham. Hay chuyen san pham sang danh muc khac hoac inactive danh muc.';
  }

  if (status === 'saved') {
    return 'Da luu thay doi danh muc.';
  }

  return null;
};

const AdminCategoriesPage = async ({
  searchParams,
}: AdminCategoriesPageProps) => {
  const [groups, groupOptions] = await Promise.all([
    getAdminCategoryGroups(),
    getAdminCategoryGroupOptions(),
  ]);
  const statusMessage = getStatusMessage(searchParams?.status);
  const isError =
    searchParams?.status === 'group-has-categories' ||
    searchParams?.status === 'category-has-products';

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-champagne-500">
            Danh muc
          </p>
          <h1 className="mt-2 text-3xl font-bold">Quan ly danh muc san pham</h1>
        </div>
      </div>

      {statusMessage ? (
        <p
          className={`mt-6 rounded-md border px-3 py-2 text-sm font-semibold ${
            isError
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-green-200 bg-green-50 text-green-700'
          }`}
        >
          {statusMessage}
        </p>
      ) : null}

      <section className="mt-6 rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Them group moi</h2>
        <form
          action={createAdminCategoryGroup}
          className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_120px_auto]"
        >
          <label className="block">
            <span className="text-sm font-semibold">Ten group</span>
            <input name="title" required className={fieldClassName} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Slug</span>
            <input name="slug" required className={fieldClassName} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Thu tu</span>
            <input
              name="sortOrder"
              type="number"
              defaultValue={groups.length}
              className={fieldClassName}
            />
          </label>
          <label className="block lg:col-span-3">
            <span className="text-sm font-semibold">Mo ta</span>
            <textarea name="description" required className={fieldClassName} />
          </label>
          <div className="flex items-end">
            <button type="submit" className={primaryButtonClassName}>
              Them group
            </button>
          </div>
        </form>
      </section>

      <section className="mt-6 rounded-lg border border-silver-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Them danh muc moi</h2>
        <form
          action={createAdminCategory}
          className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_120px_auto]"
        >
          <label className="block">
            <span className="text-sm font-semibold">Group</span>
            <select name="groupId" required className={fieldClassName}>
              <option value="">Chon group</option>
              {groupOptions.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Ten danh muc</span>
            <input name="name" required className={fieldClassName} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Slug</span>
            <input name="slug" required className={fieldClassName} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Thu tu</span>
            <input
              name="sortOrder"
              type="number"
              defaultValue={0}
              className={fieldClassName}
            />
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
          <label className="block lg:col-span-4">
            <span className="text-sm font-semibold">Mo ta</span>
            <textarea name="description" className={fieldClassName} />
          </label>
          <div className="flex items-end">
            <button type="submit" className={primaryButtonClassName}>
              Them danh muc
            </button>
          </div>
        </form>
      </section>

      <div className="mt-8 space-y-6">
        {groups.map((group) => (
          <section
            key={group.id}
            className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <form
                action={updateAdminCategoryGroup}
                className="grid flex-1 gap-4 lg:grid-cols-[1fr_1fr_120px]"
              >
                <input type="hidden" name="groupId" value={group.id} />
                <label className="block">
                  <span className="text-sm font-semibold">Ten group</span>
                  <input
                    name="title"
                    defaultValue={group.title}
                    required
                    className={fieldClassName}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Slug</span>
                  <input
                    name="slug"
                    defaultValue={group.slug}
                    required
                    className={fieldClassName}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Thu tu</span>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={group.sortOrder}
                    className={fieldClassName}
                  />
                </label>
                <label className="block lg:col-span-3">
                  <span className="text-sm font-semibold">Mo ta</span>
                  <textarea
                    name="description"
                    defaultValue={group.description}
                    required
                    className={fieldClassName}
                  />
                </label>
                <div className="lg:col-span-3">
                  <button type="submit" className={primaryButtonClassName}>
                    Luu group
                  </button>
                </div>
              </form>
              <form action={deleteAdminCategoryGroup}>
                <input type="hidden" name="groupId" value={group.id} />
                <button type="submit" className={secondaryButtonClassName}>
                  Xoa group
                </button>
              </form>
            </div>

            <div className="mt-6 space-y-4">
              {group.categories.map((category) => (
                <form
                  key={category.id}
                  action={updateAdminCategory}
                  className="rounded-lg border border-silver-200 bg-silver-100 p-4"
                >
                  <input type="hidden" name="categoryId" value={category.id} />
                  <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_100px_100px]">
                    <label className="block">
                      <span className="text-sm font-semibold">
                        Ten danh muc
                      </span>
                      <input
                        name="name"
                        defaultValue={category.name}
                        required
                        className={fieldClassName}
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold">Slug</span>
                      <input
                        name="slug"
                        defaultValue={category.slug}
                        required
                        className={fieldClassName}
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold">Group</span>
                      <select
                        name="groupId"
                        defaultValue={group.id}
                        required
                        className={fieldClassName}
                      >
                        {groupOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold">Thu tu</span>
                      <input
                        name="sortOrder"
                        type="number"
                        defaultValue={category.sortOrder}
                        className={fieldClassName}
                      />
                    </label>
                    <label className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                      <input
                        name="isActive"
                        type="checkbox"
                        defaultChecked={category.isActive}
                        className="size-4"
                      />
                      Active
                    </label>
                    <label className="block lg:col-span-4">
                      <span className="text-sm font-semibold">Mo ta</span>
                      <textarea
                        name="description"
                        defaultValue={category.description ?? ''}
                        className={fieldClassName}
                      />
                    </label>
                    <div className="text-silver-700 mt-8 text-sm font-semibold">
                      {category.products.length} san pham
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button type="submit" className={secondaryButtonClassName}>
                      Luu
                    </button>
                    <button
                      formAction={deleteAdminCategory}
                      type="submit"
                      className={secondaryButtonClassName}
                    >
                      Xoa
                    </button>
                  </div>
                </form>
              ))}
              {group.categories.length === 0 ? (
                <p className="rounded-lg border border-silver-200 px-4 py-6 text-sm text-silver-500">
                  Group nay chua co danh muc.
                </p>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
