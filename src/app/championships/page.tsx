import Link from "next/link";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChampionshipCard } from "@/components/championships/ChampionshipCard";
import { championships } from "@/data";

export const metadata = {
  title: "Championships",
  description:
    "The official championships of Indus Matworks — current champions, reigns, defenses, and title history.",
};

export default function ChampionshipsPage() {
  const activeTitles = championships.filter((championship) => championship.currentChampion).length;
  const totalDefenses = championships.reduce((sum, championship) => sum + championship.defenses, 0);
  const longestReign = [...championships].sort((a, b) => b.daysHeld - a.daysHeld)[0];

  return (
    <>
      <PageHeader
        overline="Championship Division"
        title={
          <>
            The Gold
            <br />
            Standard
          </>
        }
        subtitle="Prestige, legacy and the highest honors in the promotion. Every championship represents the standard every competitor is chasing."
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide grid grid-cols-2 gap-px bg-[var(--im-border)] sm:grid-cols-4">
          {[
            { value: String(championships.length), label: "Sanctioned Titles" },
            { value: String(activeTitles), label: "Active Champions" },
            { value: String(totalDefenses), label: "Recorded Defenses" },
            { value: longestReign ? `${longestReign.daysHeld}` : "—", label: "Longest Current Reign" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--im-page)] px-4 py-6 sm:px-6">
              <p className="font-display text-3xl font-black leading-none text-[var(--im-ink)] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div>
              <p className="im-eyebrow">Current Champions</p>
              <h2 className="mt-2 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
                The Titleholders
              </h2>
            </div>
            <p className="max-w-md font-body text-sm leading-6 text-[var(--im-muted)]">
              Six championships. One standard. Meet the athletes carrying the gold into the next
              chapter of Indus Matworks.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {championships.map((championship, index) => (
              <div
                key={championship.id}
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 80}ms` } as CSSProperties}
              >
                <ChampionshipCard championship={championship} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--im-surface)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <div className="mb-8" data-reveal>
            <p className="im-eyebrow">Title History</p>
            <h2 className="mt-2 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
              Recorded Reigns
            </h2>
          </div>

          <div className="space-y-6">
            {championships.map((championship) => (
              <article
                key={championship.id}
                id={`${championship.id}-history`}
                className="scroll-mt-28 border border-[var(--im-border)] bg-[var(--im-page)]"
                data-reveal
              >
                <div className="flex flex-col gap-2 border-b border-[var(--im-border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <h3 className="font-display text-xl font-bold uppercase text-[var(--im-ink)]">
                    {championship.name}
                  </h3>
                  <Link
                    href={`/championships/${championship.id}`}
                    className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#C1272D] hover:text-[var(--im-ink)]"
                  >
                    Title Page →
                  </Link>
                </div>
                <div className="divide-y divide-[var(--im-border)]">
                  {championship.history.map((reign, index) => (
                    <div
                      key={`${championship.id}-${index}`}
                      className="grid gap-2 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6"
                    >
                      <div>
                        <p className="font-display text-xl font-bold uppercase text-[var(--im-ink)]">
                          {reign.champion}{" "}
                          <span className="font-mono text-[9px] font-normal tracking-[0.12em] text-[var(--im-muted)]">
                            — Reign {reign.reign}
                          </span>
                        </p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                          {reign.from} {reign.to ? `to ${reign.to}` : "to Present"}
                        </p>
                      </div>
                      <div className="flex gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                        <span>
                          <strong className="text-[var(--im-ink)]">{reign.days}</strong> days
                        </span>
                        <span>
                          <strong className="text-[var(--im-ink)]">{reign.defenses}</strong> defenses
                        </span>
                      </div>
                    </div>
                  ))}
                  {championship.history.length === 0 ? (
                    <p className="px-5 py-4 font-body text-sm text-[var(--im-muted)]">
                      No recorded title history.
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#C1272D] py-12 text-white md:py-16">
        <div className="container-wide flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
              Chase The Gold
            </p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase leading-none sm:text-4xl">
              Every reign starts with a challenge.
            </h2>
          </div>
          <Link href="/roster" className="im-btn im-btn-light shrink-0">
            Meet The Challengers
          </Link>
        </div>
      </section>
    </>
  );
}
