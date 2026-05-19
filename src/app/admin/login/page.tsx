import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getCurrentAdminUser } from '@/features/admin/auth/guards';

import { loginAdmin } from './actions';

type AdminLoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

const AdminLoginPage = async ({ searchParams }: AdminLoginPageProps) => {
  const adminUser = await getCurrentAdminUser();

  if (adminUser) {
    redirect('/admin');
  }

  let errorMessage: string | null = null;

  if (searchParams?.error === 'locked') {
    errorMessage =
      'Dang nhap tam thoi bi khoa do sai qua nhieu lan. Hay thu lai sau.';
  }

  if (searchParams?.error === 'invalid') {
    errorMessage = 'Email hoac mat khau khong dung.';
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-navy-950 px-4 py-8 text-navy-950 sm:px-6">
      <Image
        src="/assets/images/cua-kinh-cuong-luc/cua-lua/cua-lua-1.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-950/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center">
        <form
          action={loginAdmin}
          className="w-full max-w-md rounded-lg border border-white/15 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8"
        >
          <div>
            <p className="text-sm font-semibold uppercase text-champagne-500">
              Nam Thanh Admin
            </p>
            <h1 className="mt-2 text-2xl font-bold text-navy-950">
              Dang nhap quan tri
            </h1>
          </div>

          {errorMessage ? (
            <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <label className="mt-6 block">
            <span className="text-sm font-semibold">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-md border border-silver-300 px-3 py-2 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold">Mat khau</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-md border border-silver-300 px-3 py-2 text-sm outline-none transition focus:border-champagne-500 focus:ring-2 focus:ring-champagne-200"
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-navy-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-navy-800"
          >
            Dang nhap
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLoginPage;
