export default function Loading() {
  return (
    <div className="bg-[var(--im-page)]">
      <div className="border-b border-[#27272A] bg-[#080808]">
        <div className="container-wide py-16 md:py-24">
          <div className="h-4 w-24 animate-pulse bg-[#27272A]" />
          <div className="mt-6 h-16 w-full max-w-xl animate-pulse bg-[#27272A]" />
          <div className="mt-4 h-6 w-64 animate-pulse bg-[#27272A]" />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse border border-[#27272A] bg-[#141414]" />
            ))}
          </div>
        </div>
      </div>
      <div className="container-wide py-12">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="h-48 animate-pulse border border-[var(--im-border)] bg-[var(--im-surface)]" />
          <div className="h-48 animate-pulse border border-[var(--im-border)] bg-[var(--im-surface)]" />
        </div>
      </div>
    </div>
  );
}
