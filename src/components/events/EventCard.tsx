import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Button";
import { TicketButton } from "@/components/ui/TicketButton";
import type { EventItem } from "@/types";

interface EventCardProps { event: EventItem; variant?: "default" | "list"; }

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const date = new Date(event.date);
  const dateLabel = date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  if (variant === "list") {
    return (
      <Link href={`/events/${event.slug}`} className="group grid gap-4 border border-[var(--im-border)] bg-[var(--im-page)] p-4 transition-colors hover:border-[#C1272D]/35 sm:grid-cols-[180px_1fr] sm:items-center">
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)] sm:aspect-[4/3]">
          <Image src={event.posterImage} alt={event.name} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="180px" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={event.status === "upcoming" ? "red" : "muted"} size="sm">{event.status}</Badge>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{dateLabel}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none text-[var(--im-ink)] group-hover:text-[#C1272D]">{event.name}</h3>
          <p className="mt-2 font-body text-sm text-[var(--im-muted)]">{event.city}{event.venue ? ` · ${event.venue}` : ""}</p>
        </div>
      </Link>
    );
  }

  return (
    <article className="group overflow-hidden border border-[var(--im-border)] bg-[var(--im-page)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/35 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden border-b border-[var(--im-border)] bg-[var(--im-surface)]">
          <Image src={event.posterImage} alt={event.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width:1024px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
          <div className="absolute left-4 top-4"><Badge variant={event.status === "upcoming" ? "red" : "dark"} size="sm">{event.status}</Badge></div>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/75">{dateLabel}</p>
            <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-none text-white">{event.name}</h3>
          </div>
        </div>
      </Link>
      <div className="p-4">
        {event.tagline && <p className="font-display text-sm font-semibold uppercase tracking-[0.04em] text-[#C1272D]">{event.tagline}</p>}
        <p className="mt-2 font-body text-sm text-[var(--im-muted)]">{event.city}{event.venue ? ` · ${event.venue}` : ""}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <Link href={`/events/${event.slug}`} className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--im-ink)] hover:text-[#C1272D]">View Event</Link>
          {event.status === "upcoming" && event.ticketsUrl && event.ticketsUrl !== "#" && (
            <TicketButton href={event.ticketsUrl} className="min-h-9 px-3 text-[10px]" />
          )}
        </div>
      </div>
    </article>
  );
}
