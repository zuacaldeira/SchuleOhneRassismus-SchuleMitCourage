export default function ChatLoading() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse">
      <div className="mb-6 h-8 w-24 rounded bg-light" />
      <div className="mb-6 h-10 w-full rounded-lg bg-light" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 rounded-lg bg-light" />
        ))}
      </div>
    </div>
  );
}
