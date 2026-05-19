const AdminLoadingPage = () => (
  <div className="space-y-4">
    <div className="h-8 w-56 animate-pulse rounded-md bg-silver-200" />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {['products', 'published', 'drafts', 'archived'].map((item) => (
        <div
          key={item}
          className="h-28 animate-pulse rounded-lg bg-silver-200"
        />
      ))}
    </div>
    <div className="h-72 animate-pulse rounded-lg bg-silver-200" />
  </div>
);

export default AdminLoadingPage;
