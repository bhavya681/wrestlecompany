import Image from "next/image";
import Link from "next/link";
import { events, matches } from "@/data";
import { Countdown } from "@/components/ui/Countdown";
import { TicketButton } from "@/components/ui/TicketButton";
import { getMatchTypeLabel } from "@/lib/utils";
import type { Match } from "@/types";

function mainEventFor(eventId: string): Match | undefined {
  const list = matches.filter((m) => m.eventId === eventId);
  return list.find((m) => m.isMainEvent) || list[0];
}

export function NextEventSection() {
  const upcoming = events.find((e) => e.status === "upcoming");
  if (!upcoming) return null;
  const main = mainEventFor(upcoming.id);

  return (
    <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-14 text-[var(--im-ink)] md:py-20">
      <div className="container-wide grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
        <div className="overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
          <div className="relative aspect-[4/5]">
            <Image src={upcoming.posterImage} alt={upcoming.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1272D]">Next Major Event</p>
          <h2 className="im-display mt-3 text-4xl text-[var(--im-ink)] sm:text-5xl md:text-6xl">{upcoming.name}</h2>
          {upcoming.tagline && <p className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.04em] text-[var(--im-ink)]/60">{upcoming.tagline}</p>}
          <div className="mt-5 grid gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--im-muted)] sm:grid-cols-2">
            <p><span className="text-[var(--im-ink)]">Date:</span> {new Date(upcoming.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</p>
            <p><span className="text-[var(--im-ink)]">Venue:</span> {upcoming.venue || upcoming.city}</p>
            <p><span className="text-[var(--im-ink)]">City:</span> {upcoming.city}</p>
            <p><span className="text-[var(--im-ink)]">Matches:</span> {upcoming.matches.length}</p>
          </div>

          <div className="mt-6"><Countdown targetDate={upcoming.date} dark /></div>

          {main && (
            <div className="mt-6 border border-[var(--im-border)] bg-[var(--im-surface)] p-4 sm:p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--im-muted)]">Featured Match{main.isMainEvent ? " · Main Event" : ""}</p>
              <p className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-[var(--im-ink)]">
                {main.competitors[0]?.wrestler} <span className="text-[#C1272D]">vs</span> {main.competitors[1]?.wrestler}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{getMatchTypeLabel(main.type)}{main.championship ? " · Championship Implications" : ""}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {upcoming.ticketsUrl && upcoming.ticketsUrl !== "#" && <TicketButton href={upcoming.ticketsUrl} />}
            <Link href={`/events/${upcoming.slug}`} className="im-link inline-flex min-h-11 items-center border border-[var(--im-border)] px-5 font-display text-xs font-bold uppercase tracking-[0.1em] text-[var(--im-ink)] hover:border-white">Event Details</Link>
          </div>
          {upcoming.description && <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-[var(--im-muted)]">{upcoming.description}</p>}
        </div>
      </div>
    </section>
  );
}
