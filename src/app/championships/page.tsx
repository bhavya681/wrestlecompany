
import type { Metadata } from "next";

import { championships } from "@/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChampionshipCard } from "@/components/championships/ChampionshipCard";

export const metadata: Metadata = {
  title: "Championships",
  description:
    "Enter the championship throne room of Indus Matworks. Discover the titles, reigning champions, and historic legacies of professional wrestling.",
};

export default function ChampionshipsPage() {
  const totalReigns = championships.reduce(
    (total, championship) => total + championship.history.length,
    0,
  );

  const activeChampions = championships.filter((championship) =>
    championship.history.some((reign) => !reign.to),
  ).length;

  return (
    <>
      <PageHeader
        title="Championships"
        subtitle="Every title has a story. Every reign leaves a legacy."
        overline="The Titles"
        accentColor="gold"
      />

      {/* Championship throne room */}
      <section
        aria-labelledby="championship-showcase-heading"
        className="relative isolate overflow-hidden border-b border-border bg-[#080808] py-14 sm:py-20 lg:py-24"
      >
        {/* Cinematic atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.13),transparent_48%)]" />

          <div className="absolute left-1/2 top-0 h-[450px] w-[900px] max-w-none -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_35deg,rgba(212,175,55,0.045)_55deg,transparent_75deg,transparent_105deg,rgba(193,39,45,0.035)_125deg,transparent_145deg)]" />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/60 to-transparent" />

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="absolute -bottom-48 left-1/2 h-96 w-[800px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(193,39,45,0.10),transparent_68%)] blur-3xl" />
        </div>

        <div className="container-wide">
          {/* Showcase masthead */}
          <div className="relative mx-auto mb-12 max-w-4xl text-center sm:mb-16">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-accent-gold/70 sm:w-14"
              />
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-accent-gold sm:text-[10px] sm:tracking-[0.35em]">
                The Ultimate Prize
              </p>
              <span
                aria-hidden="true"
                className="h-px w-8 bg-accent-gold/70 sm:w-14"
              />
            </div>

            <h2
              id="championship-showcase-heading"
              className="font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              The Throne
              <span className="block text-accent-gold">Awaits.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl px-2 text-sm leading-7 text-foreground-muted sm:mt-6 sm:text-base">
              Five divisions of ambition. One stage for greatness. These are
              the championships every competitor dreams of holding.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-1 w-1 rotate-45 bg-accent-gold"
              />
              <span
                aria-hidden="true"
                className="h-px w-12 bg-accent-gold/40 sm:w-20"
              />
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rotate-45 border border-accent-gold"
              />
              <span
                aria-hidden="true"
                className="h-px w-12 bg-accent-gold/40 sm:w-20"
              />
              <span
                aria-hidden="true"
                className="h-1 w-1 rotate-45 bg-accent-gold"
              />
            </div>
          </div>

          {/* Championship statistics */}
          <div className="mx-auto mb-10 grid max-w-3xl grid-cols-3 border-y border-accent-gold/20 sm:mb-14">
            <div className="px-2 py-4 text-center sm:py-5">
              <p className="font-display text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                {String(championships.length).padStart(2, "0")}
              </p>
              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground-muted sm:text-[10px] sm:tracking-[0.2em]">
                Championships
              </p>
            </div>

            <div className="border-x border-accent-gold/20 px-2 py-4 text-center sm:py-5">
              <p className="font-display text-2xl font-black tabular-nums text-accent-gold sm:text-3xl">
                {String(activeChampions).padStart(2, "0")}
              </p>
              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground-muted sm:text-[10px] sm:tracking-[0.2em]">
                Active Reigns
              </p>
            </div>

            <div className="px-2 py-4 text-center sm:py-5">
              <p className="font-display text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                {String(totalReigns).padStart(2, "0")}
              </p>
              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground-muted sm:text-[10px] sm:tracking-[0.2em]">
                Recorded Reigns
              </p>
            </div>
          </div>

          {/* Individual championship displays */}
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 xl:gap-8">
            {championships.map((championship, index) => (
              <article
                key={championship.id}
                id={championship.id}
                className="group relative min-w-0 scroll-mt-24"
              >
                {/* Outer metallic frame */}
                <div className="relative h-full border border-accent-gold/25 bg-[#0c0c0d] p-2 transition-colors duration-500 group-hover:border-accent-gold/60 sm:p-3">
                  {/* Corner details */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 z-20 h-5 w-5 border-l-2 border-t-2 border-accent-gold/80 transition-all duration-300 group-hover:h-7 group-hover:w-7"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 z-20 h-5 w-5 border-r-2 border-t-2 border-accent-gold/80 transition-all duration-300 group-hover:h-7 group-hover:w-7"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 z-20 h-5 w-5 border-b-2 border-l-2 border-accent-gold/80 transition-all duration-300 group-hover:h-7 group-hover:w-7"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 z-20 h-5 w-5 border-b-2 border-r-2 border-accent-gold/80 transition-all duration-300 group-hover:h-7 group-hover:w-7"
                  />

                  {/* Display lighting */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 overflow-hidden sm:inset-3"
                  >
                    <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.13),transparent_75%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-accent-gold/[0.04] to-transparent" />

                    <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />
                  </div>

                  {/* Championship number and status */}
                  <div className="relative z-10 flex items-center justify-between gap-3 px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] font-bold tabular-nums text-accent-gold/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        aria-hidden="true"
                        className="h-3 w-px bg-accent-gold/30"
                      />

                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-foreground-muted sm:text-[9px] sm:tracking-[0.22em]">
                        Indus Matworks
                      </span>
                    </div>

                    <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-accent-gold/80 sm:text-[9px] sm:tracking-[0.16em]">
                      Official Title
                    </span>
                  </div>

                  {/* Existing championship component */}
                  <div className="relative z-10 min-w-0">
                    <ChampionshipCard
                      championship={championship}
                      variant="default"
                    />
                  </div>

                  {/* Bottom display plinth */}
                  <div
                    aria-hidden="true"
                    className="relative mx-3 mt-3 h-1 overflow-hidden bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent sm:mx-4"
                  >
                    <span className="absolute inset-y-0 left-1/2 w-1/4 -translate-x-1/2 bg-accent-gold/60 blur-sm" />
                  </div>

                  <div className="px-3 pb-2 pt-3 text-center sm:px-4 sm:pb-3">
                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-foreground-muted/80 sm:text-[9px] sm:tracking-[0.3em]">
                      Wrestling From India. Built For The World.
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Closing statement */}
          <div className="mt-12 text-center sm:mt-16">
            <p className="font-display text-lg font-black uppercase tracking-wide text-foreground sm:text-xl">
              Earn Your Place.
              <span className="text-accent-gold"> Claim Your Legacy.</span>
            </p>

            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
              The road to championship glory starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Title history */}
      <section
        aria-labelledby="title-history-heading"
        className="relative border-t border-border bg-background-secondary py-12 sm:py-16 md:py-20"
      >
        <div className="container-wide">
          <div className="mb-10 sm:mb-12">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-foreground-muted sm:text-[10px]">
              <span className="mr-2 text-accent-gold">02</span>
              The Record Books
            </p>

            <h2
              id="title-history-heading"
              className="mt-2 font-display text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Title History
              <span className="text-accent-gold">.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-muted">
              Every reign. Every title change. The history behind the gold.
            </p>

            <span
              aria-hidden="true"
              className="mt-4 block h-px w-12 bg-accent-gold"
            />
          </div>

          <div className="mb-10 grid grid-cols-2 border-y border-border sm:mb-12 sm:grid-cols-3">
            <div className="border-r border-border px-3 py-4 sm:px-5 sm:py-5">
              <p className="font-display text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                {String(championships.length).padStart(2, "0")}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-foreground-muted sm:text-[9px] sm:tracking-[0.2em]">
                Title Lineages
              </p>
            </div>

            <div className="px-3 py-4 sm:border-r sm:border-border sm:px-5 sm:py-5">
              <p className="font-display text-2xl font-black tabular-nums text-accent-gold sm:text-3xl">
                {String(totalReigns).padStart(2, "0")}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-foreground-muted sm:text-[9px] sm:tracking-[0.2em]">
                Recorded Reigns
              </p>
            </div>

            <div className="col-span-2 hidden px-5 py-5 sm:col-span-1 sm:block">
              <p className="font-display text-2xl font-black uppercase text-foreground sm:text-3xl">
                IM<span className="text-accent-gold">.</span>
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
                History in the Making
              </p>
            </div>
          </div>

          {/* Timeline grouped by championship */}
          <div className="space-y-10 sm:space-y-14">
            {championships.map((championship, championshipIndex) => (
              <article
                key={`history-${championship.id}`}
                className="min-w-0"
              >
                <div className="mb-4 flex min-w-0 items-start justify-between gap-3 border-b border-border pb-4 sm:mb-6 sm:items-center">
                  <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                    <span className="shrink-0 font-mono text-[10px] font-bold text-accent-gold/70 sm:text-xs">
                      {String(championshipIndex + 1).padStart(2, "0")}
                    </span>

                    <h3 className="min-w-0 font-display text-base font-bold uppercase leading-snug tracking-wide text-foreground sm:text-lg md:text-xl">
                      {championship.name}
                    </h3>
                  </div>

                  <span className="shrink-0 border border-accent-gold/20 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-accent-gold sm:px-2.5 sm:text-[9px] sm:tracking-[0.15em]">
                    {championship.history.length}{" "}
                    {championship.history.length === 1 ? "Reign" : "Reigns"}
                  </span>
                </div>

                {championship.history.length > 0 ? (
                  <ol className="im-timeline-line relative ml-1 space-y-0 pl-5 sm:ml-2 sm:pl-7">
                    {championship.history.map((reign) => (
                      <li
                        key={`${championship.id}-${reign.reign}`}
                        className="relative border-b border-border/50 py-4 last:border-0 sm:py-5"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -left-[25px] top-6 h-2.5 w-2.5 rounded-full border-2 border-accent-gold bg-background-secondary sm:-left-[33px]"
                        />

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                          <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                            <span className="shrink-0 pt-0.5 font-display text-lg font-black tabular-nums text-accent-gold/60 sm:text-xl">
                              #{reign.reign}
                            </span>

                            <div className="min-w-0">
                              <p className="break-words font-display text-sm font-bold uppercase leading-snug text-foreground sm:text-base">
                                {reign.champion}
                              </p>

                              <p className="mt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-foreground-muted sm:text-[10px] sm:tracking-[0.15em]">
                                <time>{reign.from}</time>
                                {reign.to ? (
                                  <>
                                    {" "}
                                    – <time>{reign.to}</time>
                                  </>
                                ) : (
                                  <span className="text-accent-gold">
                                    {" "}
                                    – Present
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-5 pl-9 sm:shrink-0 sm:gap-6 sm:pl-0">
                            <div>
                              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-foreground-muted sm:text-[9px] sm:tracking-[0.15em]">
                                Duration
                              </p>
                              <p className="mt-1 font-mono text-[10px] font-bold tabular-nums text-accent-gold sm:text-xs">
                                {reign.days.toLocaleString()} days
                              </p>
                            </div>

                            <span
                              aria-hidden="true"
                              className="h-7 w-px bg-border"
                            />

                            <div>
                              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-foreground-muted sm:text-[9px] sm:tracking-[0.15em]">
                                Defenses
                              </p>
                              <p className="mt-1 font-mono text-[10px] font-bold tabular-nums text-foreground sm:text-xs">
                                {reign.defenses.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="border border-dashed border-border px-4 py-6 sm:px-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground-muted">
                      No title history recorded yet.
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-6 sm:mt-16 sm:pt-8">
            <p className="font-mono text-[9px] uppercase leading-6 tracking-[0.16em] text-foreground-muted sm:text-[10px] sm:tracking-[0.22em]">
              Indus Matworks
              <span className="mx-2 text-accent-gold">/</span>
              Wrestling From India. Built For The World.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
