"use client";

import { useMemo, useState } from "react";
import { ResultCard } from "@/components/results/ResultCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { matches, wrestlers, events } from "@/data";
import { cn } from "@/lib/utils";

type Filter = "all" | "completed" | "upcoming";

export default function ResultsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [eventId, setEventId] = useState("all");
  const completed = matches.filter((m) => Boolean(m.result?.winner));
  const upcoming = matches.filter((m) => !m.result?.winner);

  const list = useMemo(() => {
    const base = filter === "completed" ? completed : filter === "upcoming" ? upcoming : matches;
    return base
      .filter((m) => eventId === "all" || m.eventId === eventId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filter, eventId, completed, upcoming]);

  return (
    <>
      <PageHeader overline="Match Results" title={<>Results &<br />Outcomes</>} subtitle="Official match outcomes, decisions, and competition records from Indus Matworks events." dark />
      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] text-[var(--im-ink)]">
        <div className="container-wide grid gap-px border-x border-[var(--im-border)] bg-[#252525] sm:grid-cols-4">
          <Stat label="Matches" value={matches.length} /><Stat label="Completed" value={completed.length} accent /><Stat label="Upcoming" value={upcoming.length} /><Stat label="Events" value={events.length} />
        </div>
      </section>
      <section className="bg-[var(--im-surface)] py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-3 border border-[var(--im-border)] bg-[var(--im-page)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {([["all","All"],["completed","Completed"],["upcoming","Upcoming"]] as const).map(([k,l]) => (
                <button key={k} type="button" onClick={() => setFilter(k)} aria-pressed={filter === k} className="im-chip">{l}</button>
              ))}
            </div>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="min-h-10 border border-[var(--im-border)] bg-[var(--im-page)] px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--im-ink)] focus:border-[#C1272D] focus:outline-none focus:ring-1 focus:ring-[#C1272D]/30">
              <option value="all">All Events</option>
              {events.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div className="space-y-4">{list.map((m) => <ResultCard key={m.id} match={m} wrestlers={wrestlers} expanded={Boolean(m.result?.winner)} />)}</div>
          {!list.length && <p className="border border-[var(--im-border)] bg-[var(--im-page)] p-6 font-body text-sm text-[var(--im-muted)]">No matches found.</p>}
        </div>
      </section>
    </>
  );
}
function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return <div className="bg-[var(--im-page)] px-5 py-5"><p className={cn("font-display text-3xl font-bold", accent?"text-[#C1272D]":"text-[var(--im-ink)]")}>{value}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{label}</p></div>;
}
