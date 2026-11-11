"use client";

import Link from "next/link";
import { events } from "@/data";

export function AnnouncementTicker() {
  const upcoming = events.find((e) => e.status === "upcoming");
  const item = upcoming
    ? `NEXT EVENT: ${upcoming.name} — ${upcoming.city}${upcoming.venue ? ` / ${upcoming.venue}` : ""}`
    : "INDUS MATWORKS — WRESTLING FROM INDIA. BUILT FOR THE WORLD.";
  const items = [item, "OFFICIAL ROSTER, CHAMPIONSHIPS, EVENTS & RESULTS", item, "OFFICIAL ROSTER, CHAMPIONSHIPS, EVENTS & RESULTS"];

  return (
    <div className="border-b border-border bg-[var(--im-page)]">
      <div className="container-wide flex h-10 items-center gap-3 overflow-hidden">
        <span className="shrink-0 border border-accent-red/40 bg-accent-red-dim px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.18em] text-accent-red">
          BREAKING
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="im-announcement-ticker">
            <span className="flex items-center gap-8 pr-8 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground-muted">
              {items.map((t, i) => (
                <span key={i} className="whitespace-nowrap">{t}</span>
              ))}
            </span>
            <span aria-hidden className="flex items-center gap-8 pr-8 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground-muted">
              {items.map((t, i) => (
                <span key={`d-${i}`} className="whitespace-nowrap">{t}</span>
              ))}
            </span>
          </div>
        </div>
        {upcoming && (
          <Link href={`/events/${upcoming.slug}`} className="im-link hidden shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-red hover:text-[var(--im-ink)] sm:block">
            Event Details
          </Link>
        )}
      </div>
    </div>
  );
}
