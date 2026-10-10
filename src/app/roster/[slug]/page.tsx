import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { VideoCard } from "@/components/media/VideoCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";

import {
  cn,
  calculateWinRate,
  formatDate,
  getMatchTypeLabel,
} from "@/lib/utils";

import {
  getNameLines,
  getRecord,
  getWinRate,
  hasValue,
  isChampion,
} from "@/lib/roster";

import {
  wrestlers,
  matches,
  events,
  championships,
  stories,
  mediaItems,
} from "@/data";

import type { Championship, Match, Wrestler } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return wrestlers.map((wrestler) => ({
    slug: wrestler.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const wrestler = wrestlers.find((item) => item.id === slug);

  if (!wrestler) {
    return {
      title: "Not Found",
    };
  }

  const imageUrl = wrestler.imageFull || wrestler.image;

  return {
    title: wrestler.ringName,
    description: wrestler.bio,
    openGraph: {
      title: wrestler.ringName,
      description: wrestler.bio,
      images: imageUrl
        ? [
            {
              url: imageUrl,
            },
          ]
        : [],
    },
  };
}

export default async function WrestlerProfile({ params }: PageProps) {
  const { slug } = await params;

  const wrestler = wrestlers.find((item) => item.id === slug);

  if (!wrestler) {
    notFound();
  }

  const record = getRecord(wrestler);
  const winRate = getWinRate(wrestler);
  const winRateLabel = record.total > 0 ? `${winRate}%` : "N/A";
  const champion = isChampion(wrestler);

  const roleLabel =
    wrestler.role === "manager"
      ? "MANAGER"
      : wrestler.role === "tag-team"
        ? "TAG TEAM"
        : wrestler.role === "referee"
          ? "REFEREE"
          : wrestler.role === "announcer"
            ? "RING ANNOUNCER"
            : wrestler.role === "commentator" ||
                wrestler.role === "commentators"
              ? "COMMENTATOR"
              : "WRESTLER";

  const divisionLabel =
    wrestler.role === "manager" || wrestler.role === "tag-team"
      ? roleLabel
      : wrestler.weightClass;

  const nameLines = getNameLines(wrestler.ringName);

  const wrestlerMatches = matches
    .filter(
      (match) =>
        match.competitors.some(
          (competitor) => competitor.wrestlerId === wrestler.id
        ) && match.result.winner !== ""
    )
    .sort((first, second) =>
      second.date.localeCompare(first.date)
    );

  const wrestlerChampionships = championships.filter((championship) =>
    wrestler.championships.includes(championship.id)
  );

  const relatedStories = stories.filter((story) =>
    story.participants.includes(wrestler.id)
  );

  const rivals = wrestler.rivalries
    .map((id) => wrestlers.find((rival) => rival.id === id))
    .filter(
      (rival): rival is Wrestler =>
        Boolean(rival)
    );

  /* Athlete facts — only fields that carry real data. */
  const attributes = [
    { label: "Ring Name", value: wrestler.ringName },
    { label: "Real Name", value: wrestler.name },
    { label: "Billed From", value: wrestler.from },
    { label: "Height", value: wrestler.height },
    { label: "Weight", value: wrestler.weight },
    { label: "Division", value: wrestler.division },
    { label: "Weight Class", value: wrestler.weightClass },
    { label: "Style", value: wrestler.style },
    { label: "Finisher", value: wrestler.finisher },
    { label: "Debut", value: wrestler.debut },
    { label: "Status", value: wrestler.status },
  ].filter(
    (attribute) =>
      hasValue(attribute.value) &&
      attribute.value !== wrestler.ringName
  );

  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="profile-enter relative isolate overflow-hidden border-b border-border bg-background">
        {/* ── BACKGROUND LAYERS ── */}

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(170deg,#0e0e0f_0%,#080808_55%,#0a0a0b_100%)]" />

          {/* Oversized blurred athlete atmosphere */}
          {(wrestler.imageFull || wrestler.image) && (
            <div
              className={cn(
                "absolute inset-y-[-10%] right-[-6%] w-[58%]",
                "opacity-[0.16] blur-3xl grayscale"
              )}
            >
              <WrestlerPortrait
                wrestler={wrestler}
                mask="none"
                fit="contain"
                className="h-full w-full"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_10%,transparent_35%,rgba(8,8,8,0.85)_100%)]" />

          <div className="im-hairline-grid absolute inset-0" />

          <div className="profile-glow absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent-red/10 blur-3xl" />

          <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent-gold/[0.06] blur-3xl" />

          <div className="im-grain absolute inset-0" />
        </div>

        {/* ── CONTENT ── */}

        <div className="container-wide relative py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]">
            {/* TEXT COLUMN */}

            <div className="min-w-0">
              <BackToRoster />

              {/* Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <Badge
                  variant={wrestler.status === "active" ? "red" : "muted"}
                  size="sm"
                  className="profile-reveal"
                >
                  {wrestler.status}
                </Badge>

                <Badge
                  variant={
                    wrestler.role === "manager" ||
                    wrestler.role === "tag-team"
                      ? "gold"
                      : "red"
                  }
                  size="sm"
                  className="profile-reveal"
                >
                  {roleLabel}
                </Badge>

                {champion && (
                  <span className="inline-flex items-center gap-2 border border-accent-gold/40 bg-accent-gold/[0.08] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent-gold">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent-gold"
                      aria-hidden="true"
                    />
                    Champion
                  </span>
                )}

                <span className="inline-flex items-center gap-2 border border-border bg-background-secondary/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent-red"
                    aria-hidden="true"
                  />
                  {divisionLabel}
                </span>
              </div>

              {/* NAME — editorial display type */}

              <h1 className="mt-6 font-display font-black uppercase leading-[0.84] tracking-[-0.04em] text-foreground">
                {nameLines.kicker && (
                  <span className="profile-reveal mb-1 block text-[clamp(0.85rem,1.9vw,1.5rem)] font-medium tracking-[0.3em] text-foreground-muted">
                    {nameLines.kicker}
                  </span>
                )}

                <span className="profile-reveal block break-words text-[clamp(2.6rem,8.4vw,6.4rem)]">
                  {nameLines.display}
                </span>
              </h1>

              {wrestler.nickname && (
                <p className="profile-reveal mt-4 font-display text-base font-medium italic text-accent-gold sm:text-lg md:text-xl">
                  &ldquo;{wrestler.nickname}&rdquo;
                </p>
              )}

              {wrestler.members && wrestler.members.length > 0 && (
                <p className="profile-reveal mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent-gold sm:text-[10px]">
                  Team: {wrestler.members.join(" / ")}
                </p>
              )}

              <span
                aria-hidden="true"
                className="im-hero-rule mt-6 block h-px w-40 bg-[linear-gradient(90deg,var(--accent-red),transparent)]"
              />

              {wrestler.bio && (
                <p className="profile-reveal mt-5 max-w-2xl font-body text-sm leading-7 text-foreground-muted md:text-[15px]">
                  {wrestler.bio}
                </p>
              )}

              {/* Actions */}
              <div className="profile-reveal mt-7 flex flex-wrap gap-3">
                <Link
                  href="#match-history"
                  className="inline-flex items-center gap-2 border border-accent-red bg-accent-red/10 px-4 py-3 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-accent-red transition-all duration-200 hover:bg-accent-red hover:text-background sm:px-5 sm:text-xs"
                >
                  View match history
                  <span aria-hidden="true">↓</span>
                </Link>

                {wrestlerChampionships.length > 0 && (
                  <Link
                    href="#championships"
                    className="inline-flex items-center gap-2 border border-border bg-background-secondary/80 px-4 py-3 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-foreground transition-all duration-200 hover:border-accent-gold hover:text-accent-gold sm:px-5 sm:text-xs"
                  >
                    View titles
                    <span aria-hidden="true">↓</span>
                  </Link>
                )}
              </div>
            </div>

            {/* ── ATHLETE CUTOUT ── */}

            <div className="profile-reveal relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none">
              {/* Stage light behind the athlete */}
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-[-14%] bottom-[6%] top-[10%] rounded-full blur-3xl",
                  champion
                    ? "bg-[radial-gradient(circle,rgba(212,175,55,0.28),transparent_66%)]"
                    : "bg-[radial-gradient(circle,rgba(193,39,45,0.32),transparent_66%)]"
                )}
              />

              <div className="relative aspect-[4/5] w-full">
                <WrestlerPortrait
                  wrestler={wrestler}
                  mask="hero"
                  fit="cover"
                  sizes="(max-width: 1024px) 70vw, 420px"
                  priority
                  className={cn(
                    "h-full w-full object-cover object-[50%_22%]",
                    "grayscale-[0.3] contrast-[1.06]",
                    "drop-shadow-[0_28px_50px_rgba(0,0,0,0.85)]"
                  )}
                />
              </div>

              {/* Poster frame accents */}
              <span
                aria-hidden="true"
                className="absolute inset-y-[6%] left-0 w-px bg-[linear-gradient(180deg,transparent,var(--accent-red)_35%,transparent)]"
              />

              <span
                aria-hidden="true"
                className="absolute inset-x-[18%] bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent-gold),transparent)] opacity-70"
              />

              {/* Record plate */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-white/10 bg-background/70 px-4 py-3 backdrop-blur-sm">
                <div className="min-w-0">
                  <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
                    {roleLabel}
                  </span>

                  <span className="mt-1 block truncate font-display text-sm font-bold text-foreground">
                    {divisionLabel}
                  </span>
                </div>

                <div className="shrink-0 text-right">
                  <span className="block font-display text-2xl font-black leading-none text-accent-gold sm:text-3xl">
                    {winRateLabel}
                  </span>

                  <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
                    win rate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Attribute rail */}
          {attributes.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:mt-14 lg:grid-cols-4">
              {attributes.map((attribute) => (
                <div
                  key={attribute.label}
                  className="group min-w-0 bg-background-secondary/60 p-4 transition-colors duration-300 hover:bg-background-tertiary/70"
                >
                  <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted sm:text-[9px]">
                    {attribute.label}
                  </dt>

                  <dd className="mt-2 break-words font-display text-sm font-bold leading-snug text-foreground">
                    {attribute.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* =========================================================
          THE STORY
      ========================================================= */}

      {wrestler.bio && (
        <section className="profile-enter relative overflow-hidden border-b border-border py-14 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 im-hairline-grid opacity-50"
          />

          <div className="container-wide relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:gap-16">
            {/* Editorial prose */}
            <div>
              <SectionTitle
                overline="The Story"
                title="BEYOND THE NICKNAME"
                accentColor="red"
              />

              <p className="im-drop-cap max-w-3xl font-body text-[15px] leading-[1.85] text-foreground-secondary/90 md:text-base">
                {wrestler.bio}
              </p>

              {wrestler.nickname && (
                <p className="mt-8 max-w-3xl font-display text-xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-2xl">
                  {wrestler.name}
                  <span className="text-accent-red">.</span>{" "}
                  <span className="text-foreground-muted">
                    A fighter. A personality. A threat.
                  </span>
                </p>
              )}
            </div>

            {/* Signature panel */}
            <aside className="self-start border border-border bg-background-secondary/40">
              <p className="border-b border-border px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-accent-red">
                Signature
              </p>

              <div className="divide-y divide-border/70">
                {[
                  { label: "Style", value: wrestler.style },
                  { label: "Finisher", value: wrestler.finisher },
                  { label: "From", value: wrestler.from },
                  { label: "Debut", value: wrestler.debut },
                  {
                    label: "Record",
                    value: `${record.wins}W · ${record.losses}L · ${record.draws}D`,
                  },
                ]
                  .filter((item) => hasValue(item.value))
                  .map((item) => (
                    <div key={item.label} className="px-5 py-4">
                      <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
                        {item.label}
                      </span>

                      <span className="mt-1.5 block break-words font-display text-sm font-bold text-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* =========================================================
          RECORD
      ========================================================= */}

      <section
        id="record"
        className="profile-enter relative border-b border-border bg-background-secondary/40 py-14 md:py-20"
      >
        <div className="container-wide relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,500px)]">
          <div>
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-accent-red sm:text-xs">
              Performance Index
            </span>

            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
              BUILT FOR THE LONG GAME
            </h2>

            <p className="mt-4 max-w-xl font-body text-sm leading-7 text-foreground-muted">
              A career measured in pressure, adaptation, and nights
              where the only way out is through.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
              <QuickStat
                value={record.total}
                label="documented bouts"
              />

              <QuickStat
                value={wrestlerChampionships.length}
                label="title pursuits"
                accent="gold"
              />

              <QuickStat
                value={rivals.length}
                label="defining rivalries"
                accent="muted"
              />
            </div>
          </div>

          <RecordPanel wrestler={wrestler} />
        </div>
      </section>

      {/* =========================================================
          CHAMPIONSHIPS
      ========================================================= */}

      {wrestlerChampionships.length > 0 && (
        <section
          id="championships"
          className="profile-enter border-b border-border py-16 md:py-20"
        >
          <div className="container-wide">
            <SectionTitle
              overline="Honors"
              title="CHAMPIONSHIPS"
              accentColor="gold"
              right={
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted sm:text-xs">
                  {wrestlerChampionships.length}{" "}
                  {wrestlerChampionships.length === 1
                    ? "title"
                    : "titles"}{" "}
                  held
                </span>
              }
            />

            <div className="grid gap-5 md:grid-cols-2">
              {wrestlerChampionships.map((championship) => (
                <ChampionshipCard
                  key={championship.id}
                  championship={championship}
                  isCurrentChampion={
                    championship.currentChampion?.wrestlerId ===
                    wrestler.id
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          RIVALRIES
      ========================================================= */}

      {rivals.length > 0 && (
        <section
          id="rivalries"
          className="profile-enter border-b border-border bg-background-secondary/30 py-16 md:py-20"
        >
          <div className="container-wide">
            <SectionTitle
              overline="Blood And Respect"
              title="KEY RIVALRIES"
              accentColor="red"
              right={
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted sm:text-xs">
                  The people who shaped the legacy
                </span>
              }
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rivals.map((rival) => (
                <Link
                  key={rival.id}
                  href={`/roster/${rival.id}`}
                  className="group relative flex items-center gap-4 overflow-hidden border border-border bg-background p-4 transition-all duration-300 hover:border-accent-red hover:bg-background-secondary"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent-red/0 transition-colors duration-300 group-hover:bg-accent-red/[0.03]"
                  />

                  <div className="relative z-10 h-20 w-16 shrink-0 overflow-hidden bg-background-secondary">
                    <WrestlerPortrait
                      wrestler={rival}
                      mask="thumb"
                      sizes="64px"
                      className="h-full w-full object-cover object-[50%_20%] grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>

                  <div className="relative z-10 min-w-0 flex-1">
                    <h3 className="truncate font-display text-sm font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent-red">
                      {rival.ringName}
                    </h3>

                    {rival.nickname && (
                      <p className="truncate font-body text-xs text-foreground-muted">
                        {rival.nickname}
                      </p>
                    )}

                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                      {rival.record.wins}W ·{" "}
                      {rival.record.losses}L ·{" "}
                      {rival.record.draws}D
                    </p>
                  </div>

                  <svg
                    aria-hidden="true"
                    className="relative z-10 h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          MATCH HISTORY
      ========================================================= */}

      <section
        id="match-history"
        className="profile-enter border-b border-border py-16 md:py-20"
      >
        <div className="container-wide">
          <SectionTitle
            overline="In The Ring"
            title="MATCH HISTORY"
            accentColor="red"
            right={
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted sm:text-xs">
                {wrestlerMatches.length} completed matches
              </span>
            }
          />

          {wrestlerMatches.length === 0 ? (
            <div className="border border-dashed border-border bg-background-secondary/40 p-8 text-center">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground-muted">
                No completed matches on record.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {wrestlerMatches.map((match) => (
                <MatchHistoryItem
                  key={match.id}
                  match={match}
                  wrestler={wrestler}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          RELATED STORIES
      ========================================================= */}

      {relatedStories.length > 0 && (
        <section className="profile-enter border-b border-border bg-background-secondary/30 py-16 md:py-20">
          <div className="container-wide">
            <SectionTitle
              overline="Beyond The Bell"
              title="RELATED STORIES"
              accentColor="gold"
              right={
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted sm:text-xs">
                  Read the storylines
                </span>
              }
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((story) => (
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

      {/* =========================================================
          RELATED MEDIA
      ========================================================= */}

      {wrestler.relatedMedia.length > 0 && (
        <section className="profile-enter border-t border-border py-16 md:py-20">
          <div className="container-wide">
            <SectionTitle
              overline="Watch"
              title="RELATED MEDIA"
              accentColor="red"
              right={
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted sm:text-xs">
                  Highlights · Interviews · Backstage
                </span>
              }
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wrestler.relatedMedia.map((id) => {
                const item = mediaItems.find(
                  (mediaItem) => mediaItem.id === id
                );

                return item ? (
                  <VideoCard
                    key={item.id}
                    item={item}
                    variant="compact"
                  />
                ) : null;
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          CLOSING NAVIGATION
      ========================================================= */}

      <div className="border-t border-border bg-background-secondary/40 py-12">
        <div className="container-wide flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-center font-mono text-[9px] uppercase tracking-[0.22em] text-foreground-muted sm:text-left">
            End of profile · Indus Matworks roster
          </p>

          <BackToRoster />
        </div>
      </div>
    </>
  );
}

/* ===============================================================
   BACK TO ROSTER
   =============================================================== */

function BackToRoster() {
  return (
    <Link
      href="/roster"
      className="group inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground-muted transition-colors duration-200 hover:text-accent-red focus-visible:outline-none focus-visible:text-accent-red"
    >
      <span className="grid h-8 w-8 place-items-center border border-border transition-all duration-300 group-hover:-translate-x-0.5 group-hover:border-accent-red">
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
      </span>

      Back to roster
    </Link>
  );
}

/* ===============================================================
   SECTION TITLE
   =============================================================== */

function SectionTitle({
  overline,
  title,
  accentColor,
  right,
}: {
  overline: string;
  title: string;
  accentColor: "red" | "gold";
  right?: React.ReactNode;
}) {
  const overlineClass =
    accentColor === "gold"
      ? "text-accent-gold"
      : "text-accent-red";

  const ruleClass =
    accentColor === "gold"
      ? "from-accent-gold"
      : "from-accent-red";

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
      <div>
        <span
          className={cn(
            "font-body text-[10px] font-bold uppercase tracking-[0.24em] sm:text-xs",
            overlineClass
          )}
        >
          {overline}
        </span>

        <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>

        <div
          aria-hidden="true"
          className={cn(
            "mt-3 h-px w-12 bg-gradient-to-r to-transparent",
            ruleClass
          )}
        />
      </div>

      {right}
    </div>
  );
}

/* ===============================================================
   QUICK STAT
   =============================================================== */

function QuickStat({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent?: "gold" | "muted";
}) {
  const valueClass =
    accent === "gold"
      ? "text-accent-gold"
      : accent === "muted"
        ? "text-foreground-muted"
        : "text-foreground";

  return (
    <div>
      <span
        className={cn(
          "block font-display text-2xl font-black",
          valueClass
        )}
      >
        {value}
      </span>

      <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </span>
    </div>
  );
}

/* ===============================================================
   RECORD PANEL
   =============================================================== */

function RecordPanel({
  wrestler,
}: {
  wrestler: Wrestler;
}) {
  const record = getRecord(wrestler);

  const winPercent = record.total > 0 ? (record.wins / record.total) * 100 : 0;
  const lossPercent =
    record.total > 0 ? (record.losses / record.total) * 100 : 0;
  const drawPercent =
    record.total > 0 ? (record.draws / record.total) * 100 : 0;

  const winRateLabel =
    record.total > 0
      ? `${calculateWinRate(wrestler.record)}%`
      : "N/A";

  return (
    <div className="relative overflow-hidden border border-border bg-background p-5 shadow-2xl shadow-black/30 sm:p-6 md:p-8">
      {/* Top line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-red via-accent-gold to-accent-red"
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-muted sm:text-[10px]">
            Career record
          </span>

          <p className="mt-2 font-display text-4xl font-black tracking-tight text-foreground">
            {record.wins}
            <span className="text-accent-red">-</span>
            {record.losses}
            <span className="text-foreground-muted">-</span>
            {record.draws}
          </p>
        </div>

        <div className="text-right">
          <span className="font-display text-4xl font-black leading-none text-accent-gold sm:text-5xl">
            {winRateLabel}
          </span>

          <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
            win rate
          </span>
        </div>
      </div>

      {/* W / L / D */}
      <div className="mt-7 grid grid-cols-3 gap-3 border-y border-border py-5">
        <div className="text-center">
          <span className="block font-display text-3xl font-black text-foreground">
            {record.wins}
          </span>

          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            wins
          </span>
        </div>

        <div className="text-center">
          <span className="block font-display text-3xl font-black text-foreground-muted">
            {record.losses}
          </span>

          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            losses
          </span>
        </div>

        <div className="text-center">
          <span className="block font-display text-3xl font-black text-accent-gold">
            {record.draws}
          </span>

          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            draws
          </span>
        </div>
      </div>

      {/* Distribution */}
      <div className="mt-6">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-muted sm:text-[10px]">
          <span>Outcome distribution</span>
          <span>{winRateLabel} win</span>
        </div>

        <div
          className="mt-3 flex h-2 overflow-hidden bg-foreground/10"
          aria-hidden="true"
        >
          <span
            className="h-full bg-accent-red transition-all duration-700"
            style={{
              width: `${winPercent}%`,
            }}
          />

          <span
            className="h-full bg-foreground-muted transition-all duration-700"
            style={{
              width: `${lossPercent}%`,
            }}
          />

          <span
            className="h-full bg-accent-gold transition-all duration-700"
            style={{
              width: `${drawPercent}%`,
            }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-muted">
          <span className="flex items-center gap-2">
            <span
              className="h-2 w-2 bg-accent-red"
              aria-hidden="true"
            />
            wins
          </span>

          <span className="flex items-center gap-2">
            <span
              className="h-2 w-2 bg-foreground-muted"
              aria-hidden="true"
            />
            losses
          </span>

          <span className="flex items-center gap-2">
            <span
              className="h-2 w-2 bg-accent-gold"
              aria-hidden="true"
            />
            draws
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   CHAMPIONSHIP CARD
   =============================================================== */

function ChampionshipCard({
  championship,
  isCurrentChampion,
}: {
  championship: Championship;
  isCurrentChampion: boolean;
}) {
  return (
    <div className="group relative overflow-hidden border border-accent-gold/20 bg-background p-5 transition-all duration-300 hover:border-accent-gold/60 hover:bg-background-secondary hover:shadow-xl hover:shadow-black/20 sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        {championship.image ? (
          <div className="relative h-14 w-36 shrink-0 sm:h-16 sm:w-44">
            <Image
              src={championship.image}
              alt={championship.name}
              fill
              sizes="11rem"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-tight text-accent-gold">
              {championship.name}
            </h3>
          </div>
        )}

        <Badge
          variant={isCurrentChampion ? "gold" : "default"}
          size="sm"
        >
          {isCurrentChampion ? "Current Reign" : "Title History"}
        </Badge>
      </div>

      <h3 className="relative z-10 mt-6 font-display text-lg font-bold leading-tight text-accent-gold">
        {championship.name}
      </h3>

      <div className="relative z-10 mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5 font-mono">
        <div>
          <span className="block text-[8px] uppercase tracking-[0.16em] text-foreground-muted sm:text-[9px]">
            reign
          </span>

          <span className="mt-1 block text-sm font-bold text-foreground">
            #{championship.reign}
          </span>
        </div>

        <div>
          <span className="block text-[8px] uppercase tracking-[0.16em] text-foreground-muted sm:text-[9px]">
            days held
          </span>

          <span className="mt-1 block text-sm font-bold text-foreground">
            {championship.daysHeld}
          </span>
        </div>

        <div>
          <span className="block text-[8px] uppercase tracking-[0.16em] text-foreground-muted sm:text-[9px]">
            defenses
          </span>

          <span className="mt-1 block text-sm font-bold text-foreground">
            {championship.defenses}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   MATCH HISTORY ITEM
   =============================================================== */

function MatchHistoryItem({
  match,
  wrestler,
}: {
  match: Match;
  wrestler: Wrestler;
}) {
  const opponent = match.competitors.find(
    (competitor) =>
      competitor.wrestlerId !== wrestler.id
  );

  const isWinner =
    match.result.winner === wrestler.id;

  const isDraw =
    match.result.winner === "draw";

  const event = events.find(
    (item) => item.id === match.eventId
  );

  const resultLabel = isDraw
    ? "DRAW"
    : isWinner
      ? "WIN"
      : "LOSS";

  const resultClasses = isWinner
    ? "border-accent-gold/40 bg-accent-gold/10 text-accent-gold"
    : isDraw
      ? "border-border bg-foreground/5 text-foreground-muted"
      : "border-foreground-muted/20 bg-foreground-muted/5 text-foreground-muted";

  return (
    <div className="group grid gap-5 border border-border bg-background p-4 transition-all duration-300 hover:border-accent-red hover:bg-background-secondary sm:p-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
      {/* Result */}
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "grid h-10 w-10 place-items-center border font-display text-lg font-black sm:h-11 sm:w-11",
            isWinner
              ? "border-accent-gold/40 bg-accent-gold/10 text-accent-gold"
              : isDraw
                ? "border-border bg-foreground/5 text-foreground-muted"
                : "border-foreground-muted/20 bg-foreground-muted/5 text-foreground-muted"
          )}
        >
          {isDraw ? "D" : isWinner ? "W" : "L"}
        </span>

        <div className="hidden min-w-[5.5rem] font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-muted sm:block">
          <span>result</span>

          <span
            className={cn(
              "mt-1 block font-bold",
              isWinner
                ? "text-accent-gold"
                : "text-foreground-muted"
            )}
          >
            {resultLabel}
          </span>
        </div>
      </div>

      {/* Match */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display">
          <span className="text-sm font-bold uppercase tracking-tight text-foreground sm:text-lg">
            {wrestler.ringName}
          </span>

          <span className="text-[10px] font-bold text-accent-red sm:text-xs">
            VS
          </span>

          <span className="text-sm font-bold uppercase tracking-tight text-foreground-muted sm:text-lg">
            {opponent?.wrestler || "Unknown opponent"}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-muted sm:text-[10px]">
          <span>{event?.name || match.eventName}</span>

          <span aria-hidden="true">•</span>

          <span>{match.city}</span>

          <span aria-hidden="true">•</span>

          <span>{formatDate(match.date)}</span>

          <span aria-hidden="true">•</span>

          <span>{getMatchTypeLabel(match.type)}</span>
        </div>
      </div>

      {/* Result detail */}
      <div className="flex items-center justify-between gap-4 border-t border-border pt-4 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-5 md:pt-0">
        <div className="text-right">
          <span
            className={cn(
              "inline-flex min-w-[4.5rem] justify-center border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em]",
              resultClasses
            )}
          >
            {resultLabel}
          </span>

          <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.12em] text-foreground-muted">
            {!isDraw && (
              <>
                {match.result.method} · {match.result.time}
              </>
            )}
          </span>
        </div>

        {match.rating ? (
          <RatingStars rating={match.rating} size="sm" />
        ) : (
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-muted/60">
            rating pending
          </span>
        )}
      </div>
    </div>
  );
}