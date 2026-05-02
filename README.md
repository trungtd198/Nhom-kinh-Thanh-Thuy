# NHÔM KÍNH THÀNH THUỲ

Website giới thiệu sản phẩm và dịch vụ của **CÔNG TY TNHH THƯƠNG MẠI & XÂY DỰNG THÀNH THUỲ** — chuyên thi công cửa nhôm, cửa cuốn, cửa thép vân gỗ, lan can - cầu thang kính, cửa nhựa composite và cửa kính cường lực.

## Thông tin doanh nghiệp

- **Tên công ty:** CÔNG TY TNHH THƯƠNG MẠI & XÂY DỰNG THÀNH THUỲ

## Sản phẩm

| # | Nhóm sản phẩm | Các mẫu |
|---|---|---|
| 1 | Cửa nhôm | Cửa nhôm mở quay, Cửa nhôm mở lùa, Cửa sổ nhôm kính |
| 2 | Cửa cuốn | Cửa cuốn khe thoáng, Cửa cuốn tấm liền |
| 3 | Cửa thép vân gỗ | Cửa thép 1 cánh, Cửa thép 2 cánh, Cửa thép ô kính, Cửa sổ |
| 4 | Lan can - cầu thang kính | Lan can kính ban công, Cầu thang kính tay vịn, Lan can kính không trụ |
| 5 | Cửa nhựa composite | Cửa composite, Cửa composite chỉ nổi, Cửa composite ô kính |
| 6 | Cửa kính cường lực | Cửa bản lề sàn, Cửa lùa, Cửa 2 cánh |

## Công nghệ

- [Next.js 14](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Resend](https://resend.com) (gửi email liên hệ)

## Cài đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Xuất static site
npm run build-prod
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## Cấu trúc dự án

```
.
├── public/
│   ├── assets/images/         # Ảnh sản phẩm
│   │   ├── cua-nhom/          # Ảnh cửa nhôm
│   │   ├── cua-cuon/          # Ảnh cửa cuốn
│   │   ├── cua-van-go/        # Ảnh cửa thép vân gỗ
│   │   ├── cua-composite/     # Ảnh cửa nhựa composite
│   │   ├── cua-kinh-cuong-luc/# Ảnh cửa kính cường lực
│   │   └── lan-can-cau-thang-kinh/ # Ảnh lan can cầu thang
│   ├── favicon.png
│   └── Page1.png
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Trang chủ
│   │   ├── san-pham/          # Trang sản phẩm
│   │   ├── du-an/             # Trang dự án
│   │   ├── gioi-thieu/        # Trang giới thiệu
│   │   ├── lien-he/           # Trang liên hệ
│   │   ├── tin-tuc/           # Trang tin tức
│   │   └── api/contact/       # API gửi form liên hệ
│   ├── components/            # UI components
│   │   ├── cards/             # Card components
│   │   ├── layout/            # Header, Footer, FloatingCTA
│   │   ├── sections/          # Các section dùng chung
│   │   └── ui/                # Button, Card, ImageSlider
│   ├── config/                # Cấu hình site & navigation
│   ├── data/                  # Dữ liệu sản phẩm, bài viết, dự án
│   ├── lib/                   # Utilities, SEO, email
│   └── styles/                # Global CSS
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## Cấu hình

- `src/config/site.ts` — Thông tin doanh nghiệp, hotline, địa chỉ, logo
- `src/config/navigation.ts` — Menu điều hướng
- `src/data/products.ts` — Dữ liệu 6 nhóm sản phẩm
- `src/data/projects.ts` — Dữ liệu dự án đã thi công
- `src/data/posts.ts` — Bài viết tin tức
- `.env.local` — Biến môi trường (Resend API key, email)
