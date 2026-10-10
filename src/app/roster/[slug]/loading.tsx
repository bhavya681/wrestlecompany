export default function RosterProfileLoading() {
  return (
    <section
      className="relative overflow-hidden border-b border-border bg-background-secondary/40 py-14 md:py-20"
      aria-busy="true"
      aria-label="Loading wrestler profile"
    >
      <div className="container-wide">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-12">
          <div className="space-y-6">
            <div className="profile-skeleton h-8 w-40" />
            <div className="profile-skeleton h-6 w-24" />
            <div className="profile-skeleton h-16 w-full max-w-lg sm:h-24" />
            <div className="profile-skeleton h-5 w-56" />
            <div className="profile-skeleton h-24 w-full max-w-2xl" />
            <div className="flex gap-3">
              <div className="profile-skeleton h-11 w-40" />
              <div className="profile-skeleton h-11 w-32" />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none">
            <div className="profile-skeleton aspect-[4/5] w-full" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:mt-14 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="profile-skeleton h-20 bg-background-secondary/60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}