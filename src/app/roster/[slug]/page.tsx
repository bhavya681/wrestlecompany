import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { VideoCard } from "@/components/media/VideoCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { cn, formatDate, getMatchTypeLabel } from "@/lib/utils";
import { wrestlers, matches, events, championships, stories, mediaItems } from "@/data";
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

  if (!wrestler) return { title: "Not Found" };

  return {
    title: wrestler.ringName,
    description: wrestler.bio,
    openGraph: {
      title: wrestler.ringName,
      description: wrestler.bio,
      images: [
        {
          url: wrestler.imageFull || wrestler.image,
        },
      ],
    },
  };
}

export default async function WrestlerProfile({ params }: PageProps) {
  const { slug } = await params;
  const wrestler = wrestlers.find((item) => item.id === slug);

  if (!wrestler) notFound();

  const wrestlerMatches = matches
    .filter(
      (match) =>
        match.competitors.some((competitor) => competitor.wrestlerId === wrestler.id) &&
        match.result.winner !== ""
    )
    .sort((first, second) => second.date.localeCompare(first.date));

  const wrestlerChampionships = championships.filter((championship) =>
    wrestler.championships.includes(championship.id)
  );

  const relatedStories = stories.filter((story) =>
    story.participants.includes(wrestler.id)
  );

  const rivals = wrestler.rivalries
    .map((id) => wrestlers.find((rival) => rival.id === id))
    .filter((rival): rival is Wrestler => Boolean(rival));

  return (
    <>
      <section className="profile-enter relative overflow-hidden border-b border-border bg-gradient-to-b from-background-secondary to-background py-14 md:py-20">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={wrestler.imageFull || wrestler.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top opacity-[0.16] grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
          <div className="profile-grid-bg absolute inset-0" />
          <div className="profile-glow absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-accent-red/20 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-accent-gold/10 blur-3xl" />
        </div>

        <div className="container-wide relative z-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(270px,360px)]">
          <div className="lg:order-2">
            <Link
              href="/roster"
              className="group inline-flex items-center gap-2 font-body text-xs font-bold tracking-[0.22em] text-foreground-muted transition-colors duration-200 hover:text-accent-red"
            >
              <span className="grid h-7 w-7 place-items-center border border-border transition-colors duration-200 group-hover:border-accent-red group-hover:text-accent-red">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </span>
              BACK TO ROSTER
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge
                variant={wrestler.status === "active" ? "red" : "muted"}
                size="sm"
                className="profile-reveal"
              >
                {wrestler.status}
              </Badge>
              <span className="inline-flex items-center gap-2 border border-border bg-background-secondary/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
                {wrestler.division}
              </span>
            </div>

            <h1 className="profile-reveal mt-6 max-w-4xl font-display text-5xl font-black leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {wrestler.ringName}
            </h1>
            <p className="profile-reveal mt-4 font-display text-lg font-medium text-accent-gold md:text-2xl">
              &ldquo;{wrestler.nickname}&rdquo;
            </p>

            {wrestler.bio && (
              <p className="profile-reveal mt-6 max-w-2xl font-body text-sm leading-7 text-foreground-muted md:text-base">
                {wrestler.bio}
              </p>
            )}

            <div className="profile-reveal mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
              <ProfileStat label="HEIGHT" value={wrestler.height} />
              <ProfileStat label="WEIGHT" value={wrestler.weight} />
              <ProfileStat label="FROM" value={wrestler.from} />
              <ProfileStat label="DEBUT" value={wrestler.debut} />
              <ProfileStat label="STYLE" value={wrestler.style} className="sm:col-span-2" />
              <ProfileStat label="FINISHER" value={wrestler.finisher} className="sm:col-span-2" />
            </div>

            <div className="profile-reveal mt-8 flex flex-wrap gap-3">
              <Link
                href="#match-history"
                className="inline-flex items-center gap-2 border border-accent-red bg-accent-red/10 px-5 py-3 font-body text-xs font-bold uppercase tracking-[0.18em] text-accent-red transition-all duration-200 hover:bg-accent-red hover:text-background"
              >
                VIEW MATCH HISTORY
                <span aria-hidden="true">↓</span>
              </Link>
              {wrestlerChampionships.length > 0 && (
                <Link
                  href="#championships"
                  className="inline-flex items-center gap-2 border border-border bg-background-secondary/80 px-5 py-3 font-body text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-all duration-200 hover:border-accent-gold hover:text-accent-gold"
                >
                  VIEW TITLES
                  <span aria-hidden="true">↓</span>
                </Link>
              )}
            </div>
          </div>

          <div className="profile-reveal lg:order-1 lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
              <div className="profile-glow absolute -inset-3 rounded-full" aria-hidden="true" />
              <div className="profile-image-frame relative aspect-[3/4] overflow-hidden border border-foreground/10 bg-background-secondary/50 shadow-2xl shadow-black/50">
                <Image
                  src={wrestler.image}
                  alt={wrestler.name}
                  fill
                  sizes="(max-width: 1024px) 70vw, 22rem"
                  className="h-full w-full object-cover object-top grayscale transition-transform duration-700 hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-background/25" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
                      IM athlete
                    </span>
                    <span className="mt-1 block font-display text-sm font-bold text-foreground">
                      {wrestler.weightClass}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-display text-3xl font-black leading-none text-accent-gold">
                      {wrestler.winRate}%
                    </span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                      win rate
                    </span>
                  </div>
                </div>
                <div className="absolute inset-y-0 left-0 w-1 bg-accent-red" />
              </div>
              <div className="absolute -right-3 top-8 h-24 w-px bg-accent-red/60" aria-hidden="true" />
              <div className="absolute -bottom-3 left-8 h-px w-24 bg-accent-gold/60" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="record"
        className="profile-enter relative border-b border-border bg-background-secondary/40 py-12 md:py-16"
        style={{ animationDelay: "80ms" }}
      >
        <div className="container-wide grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)]">
          <div>
            <span className="font-body text-xs font-bold uppercase tracking-[0.24em] text-accent-red">
              PERFORMANCE INDEX
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
              BUILT FOR THE LONG GAME
            </h2>
            <p className="mt-4 max-w-xl font-body text-sm leading-7 text-foreground-muted">
              A career measured in pressure, adaptation, and nights where the only way out is through.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <span className="block font-display text-2xl font-black text-foreground">
                  {wrestler.record.wins + wrestler.record.losses + wrestler.record.draws}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                  documented bouts
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl font-black text-accent-gold">
                  {wrestler.championships.length}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                  title pursuits
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl font-black text-foreground-muted">
                  {rivals.length}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                  defining rivalries
                </span>
              </div>
            </div>
          </div>
          <RecordPanel wrestler={wrestler} />
        </div>
      </section>

      {wrestlerChampionships.length > 0 && (
        <section
          id="championships"
          className="profile-enter border-b border-border py-16 md:py-20"
          style={{ animationDelay: "120ms" }}
        >
          <div className="container-wide">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="font-body text-xs font-bold uppercase tracking-[0.24em] text-accent-gold">
                  HONORS
                </span>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  CHAMPIONSHIPS
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                {wrestlerChampionships.length}{" "}
                {wrestlerChampionships.length === 1 ? "title" : "titles"} held
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {wrestlerChampionships.map((championship) => (
                <ChampionshipCard
                  key={championship.id}
                  championship={championship}
                  isCurrentChampion={championship.currentChampion?.wrestlerId === wrestler.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {rivals.length > 0 && (
        <section
          id="rivalries"
          className="profile-enter border-b border-border bg-background-secondary/30 py-16 md:py-20"
          style={{ animationDelay: "140ms" }}
        >
          <div className="container-wide">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="font-body text-xs font-bold uppercase tracking-[0.24em] text-accent-red">
                  BLOOD AND RESPECT
                </span>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  KEY RIVALRIES
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                THE PEOPLE WHO SHAPED THE LEGACY
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rivals.map((rival) => (
                <Link
                  key={rival.id}
                  href={`/roster/${rival.id}`}
                  className="group flex items-center gap-4 border border-border bg-background p-4 transition-all duration-300 hover:border-accent-red hover:bg-background-secondary hover:shadow-lg hover:shadow-black/20"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border">
                    <Image
                      src={rival.image}
                      alt={rival.name}
                      fill
                      sizes="4rem"
                      className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-sm font-bold text-foreground group-hover:text-accent-red">
                      {rival.ringName}
                    </h3>
                    <p className="truncate font-body text-xs text-foreground-muted">
                      {rival.nickname}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                      {rival.record.wins}W · {rival.record.losses}L · {rival.record.draws}D
                    </p>
                  </div>
                  <svg
                    className="h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="match-history"
        className="profile-enter border-b border-border py-16 md:py-20"
        style={{ animationDelay: "160ms" }}
      >
        <div className="container-wide">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="font-body text-xs font-bold uppercase tracking-[0.24em] text-accent-red">
                IN THE RING
              </span>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                MATCH HISTORY
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
              {wrestlerMatches.length} completed matches
            </span>
          </div>

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

      {relatedStories.length > 0 && (
        <section
          id="stories"
          className="profile-enter border-b border-border bg-background-secondary/30 py-16 md:py-20"
          style={{ animationDelay: "180ms" }}
        >
          <div className="container-wide">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="font-body text-xs font-bold uppercase tracking-[0.24em] text-accent-gold">
                  BEYOND THE BELL
                </span>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  RELATED STORIES
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                READ THE STORYLINES
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((story) => (
                <StoryCard key={story.id} story={story} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}

      {wrestler.relatedMedia.length > 0 && (
        <section
          id="media"
          className="profile-enter border-t border-border py-16 md:py-20"
          style={{ animationDelay: "200ms" }}
        >
          <div className="container-wide">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="font-body text-xs font-bold uppercase tracking-[0.24em] text-accent-red">
                  WATCH
                </span>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  RELATED MEDIA
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                HIGHLIGHTS · INTERVIEWS · BACKSTAGE
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wrestler.relatedMedia.map((id) => {
                const item = mediaItems.find((mediaItem) => mediaItem.id === id);
                return item ? (
                  <VideoCard key={item.id} item={item} variant="compact" />
                ) : null;
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ProfileStat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 bg-background-secondary p-4", className)}>
      <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </span>
      <p className="mt-2 font-display text-sm font-bold leading-snug text-foreground">
        {value}
      </p>
    </div>
  );
}

function RecordPanel({ wrestler }: { wrestler: Wrestler }) {
  const total = wrestler.record.wins + wrestler.record.losses + wrestler.record.draws;
  const winPercent = total > 0 ? (wrestler.record.wins / total) * 100 : 0;
  const lossPercent = total > 0 ? (wrestler.record.losses / total) * 100 : 0;
  const drawPercent = total > 0 ? (wrestler.record.draws / total) * 100 : 0;

  return (
    <div className="relative overflow-hidden border border-border bg-background p-6 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-red via-accent-gold to-accent-red" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
            Career record
          </span>
          <p className="mt-2 font-display text-4xl font-black tracking-tight text-foreground">
            {wrestler.record.wins}<span className="text-accent-red">-</span>{wrestler.record.losses}<span className="text-foreground-muted">-</span>{wrestler.record.draws}
          </p>
        </div>
        <div className="text-right">
          <span className="font-display text-5xl font-black leading-none text-accent-gold">
            {wrestler.winRate}%
          </span>
          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            win rate
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-5">
        <div className="text-center">
          <span className="block font-display text-3xl font-black text-foreground">
            {wrestler.record.wins}
          </span>
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            wins
          </span>
        </div>
        <div className="text-center">
          <span className="block font-display text-3xl font-black text-foreground-muted">
            {wrestler.record.losses}
          </span>
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            losses
          </span>
        </div>
        <div className="text-center">
          <span className="block font-display text-3xl font-black text-accent-gold">
            {wrestler.record.draws}
          </span>
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            draws
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
          <span>Outcome distribution</span>
          <span>{wrestler.winRate}% win</span>
        </div>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-foreground/10" aria-hidden="true">
          <span className="h-full bg-accent-red" style={{ width: `${winPercent}%` }} />
          <span className="h-full bg-foreground-muted" style={{ width: `${lossPercent}%` }} />
          <span className="h-full bg-accent-gold" style={{ width: `${drawPercent}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-red" /> wins
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-foreground-muted" /> losses
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-gold" /> draws
          </span>
        </div>
      </div>
    </div>
  );
}

function ChampionshipCard({
  championship,
  isCurrentChampion,
}: {
  championship: Championship;
  isCurrentChampion: boolean;
}) {
  return (
    <div className="group relative overflow-hidden border border-accent-gold/20 bg-background p-6 transition-all duration-300 hover:border-accent-gold/60 hover:bg-background-secondary hover:shadow-xl hover:shadow-black/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent transition-all duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div className="relative h-16 w-44 shrink-0 overflow-hidden">
          <Image
            src={championship.image}
            alt={championship.name}
            fill
            sizes="11rem"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <Badge variant={isCurrentChampion ? "gold" : "default"} size="sm">
          {isCurrentChampion ? "CURRENT REIGN" : "TITLE HISTORY"}
        </Badge>
      </div>
      <h3 className="mt-6 font-display text-lg font-bold leading-tight text-accent-gold">
        {championship.name}
      </h3>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5 font-mono">
        <div>
          <span className="block text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            reign
          </span>
          <span className="mt-1 block font-bold text-foreground">#{championship.reign}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            days held
          </span>
          <span className="mt-1 block font-bold text-foreground">{championship.daysHeld}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-[0.16em] text-foreground-muted">
            defenses
          </span>
          <span className="mt-1 block font-bold text-foreground">{championship.defenses}</span>
        </div>
      </div>
    </div>
  );
}

function MatchHistoryItem({
  match,
  wrestler,
}: {
  match: Match;
  wrestler: Wrestler;
}) {
  const opponent = match.competitors.find(
    (competitor) => competitor.wrestlerId !== wrestler.id
  );
  const isWinner = match.result.winner === wrestler.id;
  const isDraw = match.result.winner === "draw";
  const event = events.find((item) => item.id === match.eventId);
  const resultLabel = isDraw ? "DRAW" : isWinner ? "WIN" : "LOSS";
  const resultClasses = isWinner
    ? "border-accent-gold/40 bg-accent-gold/10 text-accent-gold"
    : isDraw
      ? "border-border bg-foreground/5 text-foreground-muted"
      : "border-foreground-muted/20 bg-foreground-muted/5 text-foreground-muted";

  return (
    <div className="group grid gap-5 border border-border bg-background p-5 transition-all duration-300 hover:border-accent-red hover:bg-background-secondary hover:shadow-lg hover:shadow-black/20 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "grid h-11 w-11 place-items-center border font-display text-lg font-black",
            isWinner
              ? "border-accent-gold/40 bg-accent-gold/10 text-accent-gold"
              : isDraw
                ? "border-border bg-foreground/5 text-foreground-muted"
                : "border-foreground-muted/20 bg-foreground-muted/5 text-foreground-muted"
          )}
        >
          {isDraw ? "D" : isWinner ? "W" : "L"}
        </span>
        <div className="hidden min-w-[5.5rem] font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted sm:block">
          <span>result</span>
          <span className={cn("mt-1 block font-bold", isWinner ? "text-accent-gold" : "text-foreground-muted")}>
            {resultLabel}
          </span>
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display">
          <span className="text-base font-bold text-foreground sm:text-lg">{wrestler.name}</span>
          <span className="text-xs font-bold text-accent-red">VS</span>
          <span className="text-base font-bold text-foreground-muted sm:text-lg">{opponent?.wrestler || "Unknown opponent"}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
          <span>{event?.name || match.eventName}</span>
          <span aria-hidden="true">•</span>
          <span>{match.city}</span>
          <span aria-hidden="true">•</span>
          <span>{formatDate(match.date)}</span>
          <span aria-hidden="true">•</span>
          <span>{getMatchTypeLabel(match.type)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-4 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-5 md:pt-0">
        <div className="text-right">
          <span className={cn("inline-flex min-w-[4.5rem] justify-center border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]", resultClasses)}>
            {resultLabel}
          </span>
          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
            {!isDraw && <>{match.result.method} · {match.result.time}</>}
          </span>
        </div>
        {match.rating ? <RatingStars rating={match.rating} size="sm" /> : <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted/60">rating pending</span>}
      </div>
    </div>
  );
}
