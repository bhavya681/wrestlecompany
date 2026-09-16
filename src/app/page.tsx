import Link from "next/link";
import Image from "next/image";

import { Hero } from "@/components/hero/Hero";
import { NextEventSection } from "@/components/events/NextEventSection";
import { WrestlerCard } from "@/components/wrestlers/WrestlerCard";
import { ChampionshipCard } from "@/components/championships/ChampionshipCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { NewsCard } from "@/components/news/NewsCard";
import { ResultCard } from "@/components/results/ResultCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

import {
  matches,
  wrestlers,
  championships,
  articles,
  stories,
} from "@/data";

/* ─────────────────────────────────────────────
   HOME PAGE DATA
───────────────────────────────────────────── */

const rosterPreview = wrestlers
  .filter((wrestler) => wrestler.status === "active")
  .slice(0, 4);

const activeStories = stories
  .filter((story) => story.status === "active")
  .slice(0, 3);

const featuredArticle = articles.find((article) => article.featured);

const secondaryArticles = articles
  .filter((article) => !article.featured)
  .slice(0, 2);

const recentResults = matches.filter(
  (match) =>
    match.result.winner !== "" &&
    match.rating !== undefined &&
    match.rating > 0
);

const resultsToShow = recentResults.slice(0, 3);

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════
          SECTION 01 — HERO
      ═══════════════════════════════════════ */}

      <Hero />

      {/* ═══════════════════════════════════════
          SECTION 02 — NEXT EVENT
          
          The upcoming event contains the main
          event matchup and wrestler photography.
          
          We intentionally DO NOT render another
          Featured Match section afterward.
      ═══════════════════════════════════════ */}

      <NextEventSection />

      {/* ═══════════════════════════════════════
          SECTION 03 — CHAMPIONSHIPS
      ═══════════════════════════════════════ */}

      <section className="relative overflow-hidden border-y border-border py-20 md:py-32">
        {/* Cinematic background layers */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/championship_bg.jpg"
            alt=""
            fill
            className="object-cover opacity-15 saturate-50 mix-blend-luminosity"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />

          {/* Top / bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

          {/* Gold atmospheric glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_var(--tw-gradient-stops))] from-accent-gold/8 via-transparent to-transparent" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
linear - gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px),
  linear - gradient(90deg, rgba(212, 175, 55, 0.4) 1px, transparent 1px)
    `,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* Large background number */}
        <div
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-display text-[20rem] font-black leading-none text-foreground/[0.015] sm:text-[28rem]"
          aria-hidden="true"
        >
          03
        </div>

        <div className="container-wide relative z-10">
          {/* Header */}
          <div className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="im-section-number">
                  03
                </span>

                <span className="h-px w-8 bg-accent-gold/40" />

                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent-gold">
                  Championships
                </span>
              </div>

              <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
                The
                <br className="hidden sm:block" />
                <span className="im-gold-gradient-text">
                  {" "}
                  Titles
                </span>
              </h2>

              <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent-gold to-transparent" />

              <p className="mt-4 max-w-md font-body text-sm text-foreground-muted md:text-base">
                Four championships. Four stories. One legacy.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="shrink-0"
            >
              <Link href="/championships">
                All Championships
              </Link>
            </Button>
          </div>

          {/* Championship cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {championships.map((championship) => (
              <ChampionshipCard
                key={championship.id}
                championship={championship}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 04 — ROSTER
      ═══════════════════════════════════════ */}

      <section className="relative overflow-hidden border-y border-border bg-background-secondary py-16 md:py-28">
        {/* Cinematic roster background */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/hero-wrestler.png"
            alt=""
            fill
            className="object-cover opacity-10 saturate-50 mix-blend-screen"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-background-secondary/90 to-background-secondary/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-background-secondary/60 via-transparent to-background-secondary/60" />
        </div>

        <div className="container-wide relative z-10">
          {/* Header */}
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              variant="editorial"
              number="04"
              overline="The Roster"
              title={
                <>
                  Meet The
                  <br className="hidden sm:block" />
                  {" "}
                  Athletes
                </>
              }
              subtitle="Real competitors. Real rivalries."
              className="mb-0"
            />

            <Button
              variant="outline"
              size="sm"
              asChild
              className="shrink-0"
            >
              <Link href="/roster">
                Full Roster
              </Link>
            </Button>
          </div>

          {/* Roster grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {rosterPreview.map((wrestler) => (
              <WrestlerCard
                key={wrestler.id}
                wrestler={wrestler}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 05 — STORIES
      ═══════════════════════════════════════ */}

      {activeStories.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-wide">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                variant="editorial"
                number="05"
                overline="Rivalries"
                title={
                  <>
                    The
                    <br className="hidden sm:block" />
                    {" "}
                    Stories
                  </>
                }
                subtitle="Every rivalry has a beginning."
                className="mb-0"
              />

              <Button
                variant="outline"
                size="sm"
                asChild
                className="shrink-0"
              >
                <Link href="/stories">
                  All Stories
                </Link>
              </Button>
            </div>

            {/* Stories */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {activeStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          SECTION 06 — LATEST NEWS
      ═══════════════════════════════════════ */}

      <section className="border-y border-border bg-background-secondary py-16 md:py-24">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              variant="editorial"
              number="06"
              overline="News"
              title={
                <>
                  Latest
                  <br className="hidden sm:block" />
                  {" "}
                  News
                </>
              }
              subtitle="Editorial coverage from across the IM universe."
              className="mb-0"
            />

            <Button
              variant="outline"
              size="sm"
              asChild
              className="shrink-0"
            >
              <Link href="/news">
                All News
              </Link>
            </Button>
          </div>

          {/* News grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticle && (
              <div className="md:col-span-2 lg:col-span-1">
                <NewsCard
                  article={featuredArticle}
                  variant="featured"
                />
              </div>
            )}

            {secondaryArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 07 — RESULTS
      ═══════════════════════════════════════ */}

      {resultsToShow.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-wide">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                variant="editorial"
                number="07"
                overline="Results"
                title={
                  <>
                    Recent
                    <br className="hidden sm:block" />
                    {" "}
                    Results
                  </>
                }
                subtitle="The latest outcomes from across India."
                className="mb-0"
              />

              <Button
                variant="outline"
                size="sm"
                asChild
                className="shrink-0"
              >
                <Link href="/results">
                  All Results
                </Link>
              </Button>
            </div>

            {/* Results */}
            <div className="space-y-3">
              {resultsToShow.map((match) => (
                <ResultCard
                  key={match.id}
                  match={match}
                  wrestlers={wrestlers}
                  expanded={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          SECTION 08 — ABOUT
      ═══════════════════════════════════════ */}

      <section className="relative overflow-hidden border-t border-border bg-background-secondary py-20 md:py-28">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: `
linear - gradient(rgba(193, 39, 45, 0.4) 1px, transparent 1px),
  linear - gradient(90deg, rgba(193, 39, 45, 0.4) 1px, transparent 1px)
    `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Red atmospheric glow */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red/5 blur-[120px]"
          aria-hidden="true"
        />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* About copy */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent-red">
                08 — About
              </p>

              <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Wrestling From India.
                <br />
                <span className="text-foreground-muted">
                  Built For The World.
                </span>
              </h2>

              <div
                className="mt-6 h-0.5 w-12 bg-accent-red"
                aria-hidden="true"
              />

              <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-foreground-muted md:text-base">
                Indus Matworks is India's premier international
                professional wrestling promotion — forged in the
                tradition of the{" "}
                <em className="not-italic text-foreground">
                  akhara
                </em>
                , built for the arena, and destined for the world
                stage.
              </p>

              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-foreground-muted md:text-base">
                We represent the next generation of Indian athletes —
                competitors who carry the weight of a nation and the
                ambition of champions.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="md"
                  asChild
                >
                  <Link href="/roster">
                    Meet The Roster
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  asChild
                >
                  <Link href="/championships">
                    The Championships
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 self-center">
              {[
                {
                  number: "4",
                  label: "Championships",
                },
                {
                  number: "5+",
                  label: "Live Events",
                },
                {
                  number: "20+",
                  label: "Athletes",
                },
                {
                  number: "2026",
                  label: "Founded",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border bg-background p-6 transition-colors duration-300 hover:border-accent-red/40"
                >
                  <p className="font-display text-4xl font-black text-foreground sm:text-5xl">
                    {stat.number}
                  </p>

                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 09 — NEWSLETTER
      ═══════════════════════════════════════ */}

      <section className="border-t border-border py-16">
        <div className="container-wide">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            {/* Copy */}
            <div className="flex-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent-red">
                Join The Universe
              </p>

              <h2 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
                Stay In The Fight.
              </h2>

              <p className="mt-2 text-sm text-foreground-muted">
                Early ticket access, exclusive content, and never
                miss a match.
              </p>
            </div>

            {/* Newsletter form */}
            <form
              className="flex w-full max-w-sm flex-col gap-2 sm:flex-row md:max-w-md"
              action="#"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email address"
                className="flex-1 border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder-foreground-muted/40 focus:border-accent-red focus:outline-none"
              />

              <button
                type="submit"
                className="bg-accent-red px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent-red-hover"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
