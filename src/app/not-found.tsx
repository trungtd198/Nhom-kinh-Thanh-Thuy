import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFound = () => (
  <section className="min-h-screen bg-navy-950 px-4 pt-32 text-white">
    <div className="mx-auto max-w-3xl py-24 text-center">
      <p className="text-sm font-semibold uppercase text-champagne-300">404</p>
      <h1 className="mt-4 text-4xl font-bold">Không tìm thấy trang</h1>
      <p className="mt-4 text-silver-200">
        Đường dẫn có thể đã thay đổi hoặc nội dung chưa được cập nhật.
      </p>
      <Button asChild variant="champagne" size="lg" className="mt-8">
        <Link href="/">Về trang chủ</Link>
      </Button>
    </div>
  </section>
);

export default NotFound;
