import Link from "next/link";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";
import { wrestlers } from "@/data";
import { isTagTeam } from "@/lib/roster";

export const metadata = {
  title: "Tag Teams & Factions",
  description: "Tag teams and factions of Indus Matworks.",
};

export default function TagTeamsPage() {
  const teams = wrestlers.filter((w) => isTagTeam(w));
  const activeTeams = teams.filter((team) => team.status === "active");
  const titleholdingTeams = teams.filter((team) => team.championships.length > 0);
  const representedMembers = teams.reduce((total, team) => total + (team.members?.length ?? 0), 0);

  return (
    <>
      <PageHeader
        overline="Teams & Factions"
        title={
          <>
            Tag Teams
            <br />
            &amp; Factions
          </>
        }
        subtitle="Distinct team identities, member combinations, and group presence across the Indus Matworks roster."
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide grid grid-cols-2 gap-px bg-[var(--im-border)] lg:grid-cols-4">
          {[
            { label: "Teams Listed", value: teams.length },
            { label: "Active Units", value: activeTeams.length },
            { label: "Members Represented", value: representedMembers },
            { label: "Titleholding Units", value: titleholdingTeams.length },
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

      <section className="bg-[var(--im-page)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <div
            className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <div>
              <p className="im-eyebrow">The Team Division</p>
              <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
                Unit By Unit
              </h2>
            </div>
            <p className="max-w-sm font-body text-sm leading-6 text-[var(--im-muted)]">
              Duos and factions competing across the men&rsquo;s and women&rsquo;s tag team divisions.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {teams.map((team, index) => (
              <Link
                key={team.id}
                href={`/roster/${team.id}`}
                className="group grid overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/45 sm:grid-cols-[230px_1fr]"
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 70}ms` } as CSSProperties}
              >
                <div className="relative min-h-[270px] overflow-hidden border-b border-[var(--im-border)] bg-[var(--im-page-2)] sm:border-b-0 sm:border-r">
                  <WrestlerPortrait
                    wrestler={team}
                    mask="poster"
                    sizes="(max-width: 640px) 100vw, 230px"
                    className="im-bw h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex border border-white/20 bg-black/55 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      {team.division}
                    </span>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#C1272D]">
                      Tag Team / Faction
                    </p>
                    <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                      {team.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold uppercase leading-[0.95] text-[var(--im-ink)] transition-colors group-hover:text-[#C1272D]">
                    {team.ringName}
                  </h3>
                  {team.nickname && (
                    <p className="mt-1.5 font-display text-sm font-semibold uppercase tracking-[0.04em] text-[var(--im-muted)]">
                      {team.nickname}
                    </p>
                  )}

                  {team.members?.length ? (
                    <div className="mt-5">
                      <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">
                        Members
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {team.members.map((member) => (
                          <span
                            key={member}
                            className="border border-[var(--im-border)] bg-[var(--im-page)] px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-[0.04em] text-[var(--im-ink)]"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-[var(--im-border)] pt-4">
                    <div className="grid grid-cols-2 gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                      <p>
                        From
                        <strong className="mt-1 block font-body text-xs font-medium normal-case tracking-normal text-[var(--im-ink)]">
                          {team.from}
                        </strong>
                      </p>
                      <p>
                        Style
                        <strong className="mt-1 block font-body text-xs font-medium normal-case tracking-normal text-[var(--im-ink)]">
                          {team.style}
                        </strong>
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#C1272D]">
                      Profile →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!teams.length && (
            <p className="border border-[var(--im-border)] bg-[var(--im-surface)] p-6 font-body text-sm text-[var(--im-muted)]">
              No tag teams listed.
            </p>
          )}
        </div>
      </section>

      <section className="im-cinematic border-t border-white/10 py-12 md:py-16">
        <div className="container-wide grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div data-reveal>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              Explore The Roster
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.92] text-white">
              Every competitor has a story.
            </h2>
            <p className="mt-3 max-w-xl font-body text-sm leading-7 text-white/55">
              Browse singles athletes, champions, teams and officials across the full Indus
              Matworks roster.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Link href="/roster" className="im-btn im-btn-light">
              Full Roster
            </Link>
            <Link href="/championships" className="im-btn im-btn-outline">
              Championships
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
