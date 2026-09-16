import Image from "next/image";
import { Badge, Countdown } from "@/components/ui";
import { TicketButton } from "@/components/ui/TicketButton";
import { formatDateLong, formatDateShort } from "@/lib/utils";
import { events, matches, wrestlers } from "@/data";
import type { EventItem, Match, Wrestler } from "@/types";

export function NextEventSection() {
  const upcoming = events.find((e) => e.status === "upcoming");
  if (!upcoming) return null;

  const mainEvent = findMainEvent(upcoming);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/event_aftermath_bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20 saturate-50"
        />
        {/* Dark vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
        {/* Subtle red atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_var(--tw-gradient-stops))] from-accent-red/8 via-transparent to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(193,39,45,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(193,39,45,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="container-wide relative z-10 py-20 md:py-32">
        {/* Top label row */}
        <div className="mb-6 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-red opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-red" />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent-red">
            Next Event
          </span>
          <span className="h-px flex-1 max-w-16 bg-accent-red/30" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          {/* ── LEFT: EVENT INFO ── */}
          <div>
            {/* Event name — massive display */}
            <h2 className="im-text-glow font-display text-6xl font-black uppercase leading-[0.88] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[6.5rem]">
              {upcoming.name}
            </h2>

            {/* Tagline */}
            {upcoming.tagline && (
              <p className="mt-4 font-display text-lg font-bold uppercase tracking-[0.15em] text-accent-red sm:text-xl md:text-2xl">
                {upcoming.tagline}
              </p>
            )}

            {/* Divider */}
            <div className="my-6 h-px w-20 bg-gradient-to-r from-accent-red to-transparent" />

            {/* Date / Venue info cards */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-3 border border-border/60 bg-background-secondary/60 px-4 py-3 backdrop-blur-sm">
                <svg className="h-4 w-4 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {upcoming.city}
                </span>
              </div>

              <div className="flex items-center gap-3 border border-border/60 bg-background-secondary/60 px-4 py-3 backdrop-blur-sm">
                <svg className="h-4 w-4 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-foreground-muted">
                  {formatDateLong(upcoming.date)}
                </span>
              </div>

              {upcoming.venue && (
                <div className="flex items-center gap-3 border border-border/60 bg-background-secondary/60 px-4 py-3 backdrop-blur-sm">
                  <svg className="h-4 w-4 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-foreground-muted">
                    {upcoming.venue}
                  </span>
                </div>
              )}
            </div>

            {/* Countdown */}
            <div className="mt-8">
              <Countdown
                targetDate={upcoming.date}
                label="LIVE IN"
                className="max-w-sm border border-accent-red/20 bg-accent-red/5 p-5 backdrop-blur-sm"
              />
            </div>

            {/* ── MAIN EVENT MATCHUP ── */}
            {mainEvent && (
              <div className="mt-10 space-y-6 border-t border-accent-red/20 pt-8">
                <div className="flex items-center gap-3">
                  <span className="inline-block border border-accent-red/40 bg-accent-red/10 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-accent-red">
                    Main Event
                  </span>
                  {mainEvent.championship && (
                    <span className="inline-block border border-accent-gold/30 bg-accent-gold/5 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent-gold">
                      {mainEvent.championship
                        .replace("im-", "")
                        .replace(/-/g, " ")
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                {/* VS matchup display */}
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl">
                    {mainEvent.competitors[0].wrestler}
                  </h3>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-red/40 bg-accent-red/10 font-display text-sm font-black text-accent-red sm:h-12 sm:w-12 sm:text-base">
                    VS
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl">
                    {mainEvent.competitors[1].wrestler}
                  </h3>
                </div>

                {/* Matchup Stats Comparison */}
                <MatchupStats match={mainEvent} wrestlers={wrestlers} />
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TicketButton
                date={formatDateShort(upcoming.date)}
                href={upcoming.ticketsUrl || "/events"}
              >
                Get Tickets
              </TicketButton>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted/60">
                Limited Availability
              </span>
            </div>
          </div>

          {/* ── RIGHT: POSTER ── */}
          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0 lg:sticky lg:top-24">
            {/* Glow behind poster */}
            <div className="absolute -inset-4 bg-accent-red/5 blur-3xl" aria-hidden="true" />
            <div className="absolute -inset-2 bg-accent-gold/3 blur-2xl" aria-hidden="true" />

            <div className="group relative aspect-[3/4] overflow-hidden border border-border shadow-2xl shadow-accent-red/10">
              <Image
                src={upcoming.posterImage}
                alt={upcoming.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
              {/* Inner ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-accent-red/10 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100" />

              {/* Bottom label on poster */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
                      Indus Matworks Presents
                    </p>
                    <p className="mt-1 font-display text-lg font-black uppercase text-white">
                      {upcoming.name}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md">
                    <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Accent lines */}
            <div className="absolute -right-3 top-8 h-24 w-px bg-accent-red/40" aria-hidden="true" />
            <div className="absolute -bottom-3 left-8 h-px w-24 bg-accent-gold/40" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── HELPERS ── */

function findMainEvent(event: EventItem): Match | undefined {
  const eventMatches = matches.filter((match) => match.eventId === event.id);
  const hasRosterCompetitors = (match: Match) =>
    wrestlers.some(
      (wrestler) => wrestler.id === match.competitors[0].wrestlerId
    ) &&
    wrestlers.some(
      (wrestler) => wrestler.id === match.competitors[1].wrestlerId
    );

  const mainMatch = eventMatches.find(
    (match) => match.isMainEvent && hasRosterCompetitors(match)
  );
  if (mainMatch) return mainMatch;
  return eventMatches.find(hasRosterCompetitors);
}

function matchTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    singles: "Singles Match",
    "steel-cage": "Steel Cage Match",
    "tag-team": "Tag Team Match",
    ladder: "Ladder Match",
    submission: "Submission Match",
  };
  return labels[type] ?? type;
}

function MatchupStats({
  match,
  wrestlers,
}: {
  match: Match;
  wrestlers: Wrestler[];
}) {
  const w1 = wrestlers.find(
    (w) => w.id === match.competitors[0].wrestlerId
  );
  const w2 = wrestlers.find(
    (w) => w.id === match.competitors[1].wrestlerId
  );

  if (!w1 || !w2) return null;

  const w1Total = w1.record.wins + w1.record.losses + w1.record.draws;
  const w2Total = w2.record.wins + w2.record.losses + w2.record.draws;
  const w1WinRate = w1Total > 0 ? Math.round((w1.record.wins / w1Total) * 100) : 0;
  const w2WinRate = w2Total > 0 ? Math.round((w2.record.wins / w2Total) * 100) : 0;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
      {/* Wrestler 1 stats */}
      <div className="space-y-2">
        <StatRow label="Record" value={`${w1.record.wins}W-${w1.record.losses}L-${w1.record.draws}D`} align="left" />
        <StatRow label="Win Rate" value={`${w1WinRate}%`} align="left" highlight />
        <StatRow label="Height" value={w1.height} align="left" />
        <StatRow label="Style" value={w1.style} align="left" />
      </div>

      {/* Center divider */}
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-accent-red/40 to-transparent" />
        <span className="font-display text-xs font-black tracking-wider text-accent-red/60">
          VS
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-accent-red/40 to-transparent" />
      </div>

      {/* Wrestler 2 stats */}
      <div className="space-y-2">
        <StatRow label="Record" value={`${w2.record.wins}W-${w2.record.losses}L-${w2.record.draws}D`} align="right" />
        <StatRow label="Win Rate" value={`${w2WinRate}%`} align="right" highlight />
        <StatRow label="Height" value={w2.height} align="right" />
        <StatRow label="Style" value={w2.style} align="right" />
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
  align,
  highlight,
}: {
  label: string;
  value: string;
  align: "left" | "right";
  highlight?: boolean;
}) {
  return (
    <div className={`flex flex-col ${align === "right" ? "items-end text-right" : "items-start text-left"}`}>
      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted/60">
        {label}
      </span>
      <span className={`font-display text-xs font-bold uppercase sm:text-sm ${highlight ? "text-accent-gold" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}
