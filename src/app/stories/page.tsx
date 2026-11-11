import { PageHeader } from "@/components/layout/PageHeader";
import { StoryCard } from "@/components/stories/StoryCard";
import { stories } from "@/data";

export const metadata = { title: "Stories", description: "Rivalries, narratives, and editorial storylines from Indus Matworks." };

export default function StoriesPage() {
  const active = stories.filter((s) => s.status === "active");
  const past = stories.filter((s) => s.status !== "active");
  return (
    <>
      <PageHeader overline="Editorial" title={<>Stories &<br />Rivalries</>} subtitle="The narratives, conflicts, and moments shaping Indus Matworks." dark />
      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide grid grid-cols-2 gap-px bg-[var(--im-border)] sm:grid-cols-3">
          {[
            { value: String(stories.length), label: "Editorial Stories" },
            { value: String(active.length), label: "Active Narratives" },
            { value: String(past.length), label: "Archived" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--im-page)] px-4 py-6 sm:px-6">
              <p className="font-display text-3xl font-black leading-none text-[var(--im-ink)] sm:text-4xl">{stat.value}</p>
              <p className="mt-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--im-page)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          {active.length > 0 && (
            <div data-reveal>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="im-eyebrow">Active Storylines</p>
                  <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">Now Unfolding</h2>
                </div>
                <p className="max-w-sm font-body text-sm leading-6 text-[var(--im-muted)]">Conflicts, alliances and championship ambitions shaping the current era.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{active.map((s) => <StoryCard key={s.id} story={s} />)}</div>
            </div>
          )}
          {past.length > 0 && (
            <div className="mt-14" data-reveal>
              <p className="im-eyebrow text-[var(--im-muted)]">Archive</p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">Completed Stories</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{past.map((s) => <StoryCard key={s.id} story={s} />)}</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
