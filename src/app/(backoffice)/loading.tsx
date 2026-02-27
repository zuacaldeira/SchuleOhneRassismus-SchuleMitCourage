export default function BackofficeLoading() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse">
      <div className="mb-4 h-8 w-48 rounded bg-light" />
      <div className="mb-2 h-4 w-64 rounded bg-light" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-light" />
        ))}
      </div>
    </div>
  );
}
