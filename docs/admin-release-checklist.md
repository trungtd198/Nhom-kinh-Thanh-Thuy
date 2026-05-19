# Admin product release checklist

Ngay tao: 2026-05-19

## Automated checks

Chay truoc moi lan release:

```bash
npm run db:generate
npm run type-check
npm run lint
npm run build
```

Trang thai lan check gan nhat:

- `npm run db:generate`: pass.
- `npm run type-check`: pass.
- `npm run lint`: pass.
- `npm run build`: pass.
- Local smoke test sau seed DB: pass.

Route smoke test da kiem tra:

- `/`: 200.
- `/san-pham`: 200.
- `/san-pham/cua-nhom`: 200.
- `/san-pham/cua-nhom/cua-nhom-mo-quay`: 200.
- `/sitemap.xml`: 200.
- `/robots.txt`: 200.
- `/admin`: 307 -> `/admin/login` khi chua login.
- `/admin/login`: 200.
- `/admin/products`: 307 -> `/admin/login` khi chua login.

Khong chay tu dong tren production:

- `npm run db:migrate`: chi chay khi da review migration va dung database target.
- `npm run db:seed`: khong chay tren production sau khi admin da cap nhat du lieu that, vi seed hien tai co the ghi de child records theo data static.

Ghi chu lan smoke test gan nhat:

- DB local/Supabase target dang dung cho development da duoc seed bang `npm run db:seed` vi truoc do khong co product published.

## Environment checklist

- `DATABASE_URL` dung connection string production/staging.
- `DIRECT_URL` dung direct connection string dung cho Prisma migration.
- `NEXT_PUBLIC_SUPABASE_URL` da set.
- `SUPABASE_SERVICE_ROLE_KEY` chi set o server runtime, khong expose ra client.
- `SUPABASE_STORAGE_BUCKET` ton tai, mac dinh `product-images`.
- `ADMIN_SESSION_SECRET` la chuoi random dai, khong dung lai gia tri development.
- `RESEND_API_KEY` va `COMPANY_EMAIL` da set neu can contact form.
- `env.example` khong chua secret that.

## Manual admin QA

### Auth

- Vao `/admin` khi chua login bi redirect den `/admin/login`.
- Login sai hien loi chung, khong tiet lo email co ton tai hay khong.
- Login sai qua 5 lan bi khoa tam thoi.
- Login dung vao dashboard.
- Logout xoa session va quay ve `/admin/login`.

### Product CRUD

- Tao draft product moi tai `/admin/products/new`.
- Sua product va thay thong bao da luu.
- Chuyen Draft -> Published.
- Product published hien tren `/san-pham`.
- Product detail `/san-pham/[slug]` hien noi dung moi.
- Chuyen Published -> Archived.
- Product archived bien mat khoi public site nhung van thay trong admin.
- Doi slug product va link public moi hoat dong.

### Product content

- Cap nhat hero/listing: `name`, `heroTitle`, `subtitle`, `excerpt`, `description`.
- Cap nhat overview, highlights, advantages, applications.
- Cap nhat technical specs.
- Cap nhat pricing/specs/FAQ bang format moi dong `label | value`.
- Cap nhat SEO title/description/image.

### Models and images

- Tao model moi trong trang edit product.
- Sua model name/type/slug/sortOrder/isActive.
- Upload image cho product.
- Set product cover va kiem tra card/detail public thay anh.
- Upload image cho model.
- Set model cover va kiem tra `/san-pham/[slug]/[model]`.
- Xoa image va kiem tra public khong bi broken image.
- Xoa model khong con can dung.

### Categories

- Tao CategoryGroup moi.
- Sua CategoryGroup title/slug/description/sortOrder.
- Tao Category moi.
- Sua Category name/slug/group/description/sortOrder/isActive.
- Category inactive khong lam public category section tao link loi.
- Khong xoa duoc CategoryGroup dang co Category.
- Khong xoa duoc Category dang co Product.

### Public pages

- `/` load duoc va hien product section.
- `/san-pham` load duoc theo group/category DB.
- `/san-pham/[slug]` load duoc product published.
- `/san-pham/[slug]/[model]` load duoc gallery model.
- `/sitemap.xml` co route product published.
- `/robots.txt` load duoc.

## Release decision

Release duoc khi:

- Tat ca automated checks pass.
- Manual admin QA khong con loi block.
- Storage upload test thanh cong tren bucket target.
- Admin account production da tao va password duoc ban giao qua kenh rieng.
- Secret trong `.env.local`/platform env khong commit vao git.
