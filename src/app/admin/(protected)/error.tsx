'use client';

type AdminErrorPageProps = {
  error: Error;
  reset: () => void;
};

const AdminErrorPage = ({ error, reset }: AdminErrorPageProps) => (
  <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
    <p className="text-sm font-semibold uppercase">Admin error</p>
    <h1 className="mt-2 text-2xl font-bold">Khong the tai du lieu admin</h1>
    <p className="mt-3 text-sm">{error.message}</p>
    <button
      type="button"
      onClick={reset}
      className="mt-5 rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-800"
    >
      Thu lai
    </button>
  </div>
);

export default AdminErrorPage;
