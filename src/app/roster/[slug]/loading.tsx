export default function RosterProfileLoading() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background-secondary to-background py-14 md:py-20" aria-busy="true" aria-label="Loading wrestler profile">
      <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(270px,360px)]">
        <div className="space-y-6">
          <div className="profile-skeleton h-7 w-36" />
          <div className="profile-skeleton h-20 w-full max-w-lg" />
          <div className="profile-skeleton h-6 w-56" />
          <div className="profile-skeleton h-24 w-full max-w-2xl" />
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
            <div className="profile-skeleton h-20 bg-background-secondary" />
            <div className="profile-skeleton h-20 bg-background-secondary" />
            <div className="profile-skeleton h-20 bg-background-secondary" />
            <div className="profile-skeleton h-20 bg-background-secondary" />
          </div>
          <div className="flex gap-3">
            <div className="profile-skeleton h-11 w-40" />
            <div className="profile-skeleton h-11 w-32" />
          </div>
        </div>
        <div className="lg:justify-self-end">
          <div className="profile-skeleton aspect-[3/4] w-full max-w-xs" />
        </div>
      </div>
    </section>
  );
}
