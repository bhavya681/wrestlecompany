import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { wrestlers, championships, events } from "@/data";

export const metadata = {
  title: "About",
  description: "About Indus Matworks — wrestling from India, built for the world.",
};

const pillars = [
  {
    title: "Competition",
    copy: "Match cards, divisions and results are presented as sport — every fall and decision carries weight.",
  },
  {
    title: "Character",
    copy: "Athletes are stars with distinct identities, rivalries and stories that give every match meaning.",
  },
  {
    title: "Prestige",
    copy: "Championships are the highest honor in the promotion, defended and documented with intent.",
  },
  {
    title: "Identity",
    copy: "An Indian promotion with an international standard of presentation, built for a global audience.",
  },
];

export default function AboutPage() {
  const stats = [
    { label: "Athlete Profiles", value: wrestlers.length },
    { label: "Championships", value: championships.length },
    { label: "Events", value: events.length },
    { label: "Active Competitors", value: wrestlers.filter((wrestler) => wrestler.status === "active").length },
  ];

  return (
    <>
      <PageHeader
        overline="About the Promotion"
        title={
          <>
            Wrestling From India.
            <br />
            Built For The World.
          </>
        }
        subtitle="A professional wrestling promotion presenting athletes, championships, events and stories with international ambition."
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide grid grid-cols-2 gap-px bg-[var(--im-border)] lg:grid-cols-4">
          {stats.map((stat) => (
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

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-14 md:py-20 lg:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div data-reveal>
            <p className="im-eyebrow">Brand Story</p>
            <h2 className="mt-3 font-display text-[clamp(2.3rem,5.5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[var(--im-ink)]">
              A modern wrestling
              <br />
              identity from India.
            </h2>
            <div className="mt-6 space-y-4 font-body text-[15px] leading-8 text-[var(--im-muted)]">
              <p>
                Indus Matworks is a professional wrestling organization built around competition,
                character, championships and live-event spectacle. The promotion combines Indian
                identity with an international-standard presentation designed for modern wrestling
                audiences.
              </p>
              <p>
                From the roster and title divisions to event cards, results and editorial coverage,
                the platform showcases athletes as stars, championships as prestige, and every event
                as a meaningful chapter in the promotion&rsquo;s story.
              </p>
              <p>
                The digital experience is designed to make discovery clear: explore wrestlers, follow
                champions, track events and outcomes, and engage with the narratives that define
                Indus Matworks.
              </p>
            </div>
          </div>

          <div className="relative" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
              <Image
                src="/images/hero-wrestler.jpg"
                alt="Indus Matworks athlete in the ring"
                fill
                className="object-cover object-top grayscale-[0.15]"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" aria-hidden />
              <div className="absolute inset-x-0 top-0 h-[3px] bg-[#C1272D]" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#DC2626]">
                  The Standard
                </p>
                <p className="mt-2 font-display text-2xl font-bold uppercase leading-none text-white sm:text-3xl">
                  Built on competition.
                  <br />
                  Defined by character.
                </p>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 hidden h-28 w-28 border-b-2 border-r-2 border-[#C1272D] sm:block"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--im-border)] bg-[var(--im-surface)] py-14 md:py-20">
        <div className="container-wide">
          <div className="mb-8" data-reveal>
            <p className="im-eyebrow">What Defines Us</p>
            <h2 className="mt-2 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
              Four Principles
            </h2>
          </div>
          <div className="grid gap-px border border-[var(--im-border)] bg-[var(--im-border)] sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="bg-[var(--im-page)] p-5 sm:p-6"
                data-reveal
                style={{ "--reveal-delay": `${(index % 4) * 60}ms` } as CSSProperties}
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#C1272D]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase leading-none text-[var(--im-ink)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-6 text-[var(--im-muted)]">{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="im-cinematic border-b border-white/10 py-14 md:py-20">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div data-reveal>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              Explore The Promotion
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.3rem,5.5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-white">
              Every athlete.
              <br />
              Every title. Every event.
            </h2>
            <p className="mt-4 max-w-xl font-body text-sm leading-7 text-white/55">
              Start with the roster, follow the gold, or find the next live event.
            </p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2" data-reveal>
            <Link href="/roster" className="im-btn im-btn-light">
              Explore Roster
            </Link>
            <Link href="/championships" className="im-btn im-btn-outline">
              Championships
            </Link>
            <Link href="/events" className="im-btn im-btn-outline">
              Events Calendar
            </Link>
            <Link href="/news" className="im-btn im-btn-outline">
              Newsroom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
