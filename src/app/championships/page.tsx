import type { Metadata } from "next";
import { championships } from "@/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChampionshipCard } from "@/components/championships/ChampionshipCard";

export const metadata: Metadata = {
  title: "Championships",
  description:
    "The championships that define greatness in Indus Matworks. Four belts. Four legacies. One standard of excellence.",
};

export default function ChampionshipsPage() {
  return (
    <>
      <PageHeader
        title="Championships"
        subtitle="Four championships. Four legacies. One standard of excellence."
        overline="The Titles"
        accentColor="gold"
      />

      {/* Current Champions showcase */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="mb-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground-muted">
              Current Champions
            </p>
            <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
              Reigning Champions
            </h2>
            <span className="mt-2 block h-px w-8 bg-accent-gold" aria-hidden="true" />
          </div>

          <div className="space-y-5">
            {championships.map((champ) => (
              <div key={champ.id} id={champ.id}>
                <ChampionshipCard championship={champ} variant="default" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Title History */}
      <section className="border-t border-border bg-background-secondary py-16 md:py-20">
        <div className="container-wide">
          <div className="mb-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground-muted">
              Historical Record
            </p>
            <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
              Title History
            </h2>
            <span className="mt-2 block h-px w-8 bg-accent-gold" aria-hidden="true" />
          </div>

          <div className="space-y-12">
            {championships.map((champ) => (
              <div key={`history-${champ.id}`}>
                {/* Championship name header */}
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {champ.name}
                  </h3>
                  <span className="border border-accent-gold/20 bg-accent-gold/8 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-accent-gold">
                    {champ.history.length} {champ.history.length === 1 ? "Reign" : "Reigns"}
                  </span>
                </div>

                {/* Timeline */}
                <div className="relative pl-6 im-timeline-line">
                  <div className="space-y-0">
                    {champ.history.map((reign, idx) => (
                      <div
                        key={idx}
                        className="relative flex flex-col gap-2 border-b border-border/50 py-4 last:border-0 md:flex-row md:items-center md:justify-between"
                      >
                        {/* Timeline dot */}
                        <span
                          className="absolute -left-[23px] top-5 h-2.5 w-2.5 rounded-full border-2 border-accent-gold bg-background-secondary"
                          aria-hidden="true"
                        />

                        {/* Left — champion info */}
                        <div className="flex items-center gap-4">
                          <span className="font-display text-xl font-black text-accent-gold/60">
                            #{reign.reign}
                          </span>
                          <div>
                            <p className="font-display text-base font-bold uppercase text-foreground">
                              {reign.champion}
                            </p>
                            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground-muted">
                              {reign.from}
                              {reign.to ? ` – ${reign.to}` : " – Present"}
                            </p>
                          </div>
                        </div>

                        {/* Right — stats */}
                        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.15em]">
                          <span className="text-accent-gold font-bold">
                            {reign.days} days
                          </span>
                          <span className="text-foreground-muted">
                            {reign.defenses} def.
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
