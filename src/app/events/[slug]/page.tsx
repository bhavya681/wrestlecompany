import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Button";
import { TicketButton } from "@/components/ui/TicketButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";
import { getMatchTypeLabel, formatDateLong } from "@/lib/utils";
import { events, matches, wrestlers } from "@/data";
import type { Match as MatchType } from "@/types";

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  return { title: event.name, description: event.description || event.tagline };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const eventMatches = event.matches
    .map((id) => matches.find((m) => m.id === id))
    .filter((m): m is MatchType => Boolean(m));

  return (
    <>
      <PageHeader
        overline={event.status === "upcoming" ? "Upcoming Event" : "Event Archive"}
        title={event.name}
        subtitle={event.tagline || event.description}
        backgroundImage={event.heroImage || event.posterImage}
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <Link href="/events" className="mb-7 inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)] transition-colors hover:text-[#C1272D]">
            <span aria-hidden>←</span> All Events
          </Link>
          <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-12">
            <div className="relative mx-auto w-full max-w-[380px] lg:mx-0" data-reveal>
              <div aria-hidden className="absolute -left-3 -top-3 h-20 w-20 border-l-2 border-t-2 border-[#C1272D]" />
              <div className="relative aspect-[2/3] overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)] shadow-[0_26px_60px_rgba(8,8,8,0.18)]">
                <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-[#C1272D]" aria-hidden />
                <Image src={event.posterImage} alt={`${event.name} poster`} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 30vw" priority />
              </div>
            </div>

            <div data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={event.status === "upcoming" ? "red" : "muted"}>{event.status}</Badge>
                <Badge variant="default">{eventMatches.length} Matches</Badge>
                <Badge variant="default">Live Professional Wrestling</Badge>
              </div>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] font-black uppercase leading-[0.9] text-[var(--im-ink)]">
                Event Information
              </h2>
              <div className="mt-5 grid gap-px border border-[var(--im-border)] bg-[var(--im-border)] sm:grid-cols-2">
                <Info label="Date" value={formatDateLong(event.date)} />
                <Info label="City" value={event.city} />
                <Info label="Venue" value={event.venue || "Venue TBA"} />
                <Info label="Status" value={event.status} />
              </div>
              {event.description ? (
                <p className="mt-5 max-w-3xl font-body text-sm leading-7 text-[var(--im-muted)] sm:text-base">{event.description}</p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {event.status === "upcoming" && event.ticketsUrl && event.ticketsUrl !== "#" ? (
                  <TicketButton href={event.ticketsUrl} />
                ) : null}
                <Link href="/events" className="im-btn im-btn-surface">Full Calendar</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--im-surface)] py-12 md:py-16">
        <div className="container-wide">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--im-muted)]">Match Card</p>
          <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-[var(--im-ink)] sm:text-5xl">Official Card &amp; Results</h2>
          <div className="mt-8 space-y-4">
            {eventMatches.map((match) => <MatchCard key={match.id} match={match} />)}
            {eventMatches.length === 0 && <p className="border border-[var(--im-border)] bg-[var(--im-page)] p-6 font-body text-sm text-[var(--im-muted)]">Match card details are not yet available.</p>}
          </div>
        </div>
      </section>
    </>
  );
}

function MatchCard({ match }: { match: MatchType }) {
  const c1 = wrestlers.find((w) => w.id === match.competitors[0]?.wrestlerId);
  const c2 = wrestlers.find((w) => w.id === match.competitors[1]?.wrestlerId);
  const w1 = match.competitors[0]?.wrestler || c1?.ringName || "TBA";
  const w2 = match.competitors[1]?.wrestler || c2?.ringName || "TBA";
  const winner = match.result?.winner;
  const decided = Boolean(winner);
  return (
    <article className="border border-[var(--im-border)] bg-[var(--im-page)] p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="default" size="sm">{getMatchTypeLabel(match.type)}</Badge>
        {match.championship && <Badge variant="dark" size="sm">Championship</Badge>}
        {match.isMainEvent && <Badge variant="red" size="sm">Main Event</Badge>}
      </div>
      <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Side name={w1} wrestler={c1} />
        <div className="text-center font-display text-2xl font-bold text-[#C1272D]">VS</div>
        <Side name={w2} wrestler={c2} right />
      </div>
      {decided && (
        <p className="mt-4 border-t border-[var(--im-border)] pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
          Result: {winner === "draw" ? "Draw" : `${winner === c1?.id || winner === match.competitors[0]?.wrestlerId ? w1 : w2} def. opponent`} · {match.result.method}{match.result.time ? ` · ${match.result.time}` : ""}
        </p>
      )}
    </article>
  );
}

function Side({ name, wrestler, right }: { name: string; wrestler?: ReturnType<typeof wrestlers.find>; right?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${right ? "sm:flex-row-reverse sm:text-right" : ""}`}>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
        {wrestler ? <WrestlerPortrait wrestler={wrestler} mask="none" sizes="56px" className="h-full w-full object-cover object-top" /> : <div className="flex h-full items-center justify-center font-display text-lg font-bold text-[var(--im-muted)]">?</div>}
      </div>
      <p className="font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)] sm:text-2xl">{name}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--im-page)] px-4 py-4">
      <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#C1272D]">{label}</p>
      <p className="mt-1.5 font-display text-lg font-bold uppercase leading-tight text-[var(--im-ink)]">{value}</p>
    </div>
  );
}
