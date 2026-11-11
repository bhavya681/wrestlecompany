import Link from "next/link";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";
import { wrestlers } from "@/data";
import { isReferee } from "@/lib/roster";

export const metadata = {
  title: "Officials",
  description: "Officials and referees of Indus Matworks.",
};

export default function OfficialsPage() {
  const officials = wrestlers.filter((w) => isReferee(w));

  return (
    <>
      <PageHeader
        overline="Officials"
        title={
          <>
            The
            <br />
            Officiating Crew
          </>
        }
        subtitle="The officials responsible for enforcing the rules and maintaining order in Indus Matworks competition."
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#C1272D]">
            Officiating Department
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
            {officials.length} officials listed
          </p>
        </div>
      </section>

      <section className="bg-[var(--im-page)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <div
            className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <div>
              <p className="im-eyebrow">Inside The Ring</p>
              <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
                Authority In Motion
              </h2>
            </div>
            <p className="max-w-sm font-body text-sm leading-6 text-[var(--im-muted)]">
              The crew that keeps every match within the rules and every decision accountable.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {officials.map((official, index) => (
              <Link
                key={official.id}
                href={`/roster/${official.id}`}
                className="group overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/45"
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as CSSProperties}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--im-page-2)]">
                  <WrestlerPortrait
                    wrestler={official}
                    mask="poster"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="im-bw h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                    <span className="inline-flex border border-white/20 bg-black/55 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      {official.weightClass}
                    </span>
                    <span className="font-display text-2xl font-black text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#DC2626]">
                      Official
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-none text-white">
                      {official.ringName}
                    </h3>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  {official.nickname && (
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.04em] text-[var(--im-muted)]">
                      {official.nickname}
                    </p>
                  )}
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--im-border)] pt-4">
                    <div>
                      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">
                        From
                      </dt>
                      <dd className="mt-1 font-body text-xs leading-5 text-[var(--im-ink)]">
                        {official.from}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">
                        Style
                      </dt>
                      <dd className="mt-1 font-body text-xs leading-5 text-[var(--im-ink)]">
                        {official.style}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--im-border)] pt-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                      Since {official.debut}
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#C1272D]">
                      Profile →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!officials.length && (
            <p className="border border-[var(--im-border)] bg-[var(--im-surface)] p-6 font-body text-sm text-[var(--im-muted)]">
              No officials listed.
            </p>
          )}
        </div>
      </section>

      <section className="im-cinematic border-t border-white/10 py-12 md:py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div data-reveal>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              The Standard
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.92] text-white">
              Rules enforced.
              <br />
              Decisions respected.
            </h2>
            <p className="mt-4 max-w-lg font-body text-sm leading-7 text-white/55">
              Officiating is central to the credibility of every contest, championship match and
              event on the Indus Matworks calendar.
            </p>
          </div>
          <div className="grid gap-px border border-white/12 bg-white/10 sm:grid-cols-3" data-reveal>
            {[
              { title: "Rule Enforcement", copy: "Consistent application of the rules." },
              { title: "Match Control", copy: "Order maintained under pressure." },
              { title: "Title Integrity", copy: "Decisive calls on the biggest stage." },
            ].map((item) => (
              <div key={item.title} className="bg-[#0d0d0d] p-5">
                <p className="font-display text-base font-bold uppercase leading-tight text-white">
                  {item.title}
                </p>
                <p className="mt-2 font-body text-xs leading-5 text-white/45">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
