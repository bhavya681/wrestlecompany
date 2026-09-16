"use client";

import { useState, useMemo } from "react";
import { ResultCard } from "@/components/results/ResultCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { matches, wrestlers, events } from "@/data";
import type { Match } from "@/types";

type MatchFilter = "all" | "completed" | "upcoming";

export default function ResultsPage() {
  const [filter, setFilter] = useState<MatchFilter>("all");
  const [eventFilter, setEventFilter] = useState("all");

  const completedMatches = matches.filter((m) => Boolean(m.result?.winner));
  const upcomingMatches = matches.filter((m) => !m.result?.winner);

  const filtered = useMemo(() => {
    let list: Match[];
    if (filter === "all") {
      list = [...completedMatches, ...upcomingMatches];
    } else if (filter === "completed") {
      list = completedMatches;
    } else {
      list = upcomingMatches;
    }

    if (eventFilter !== "all") {
      list = list.filter((m) => m.eventId === eventFilter);
    }

    return list.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filter, eventFilter, completedMatches, upcomingMatches]);

  const eventOptions = events.map((e) => ({ value: e.id, label: e.name }));

  return (
    <>
      <PageHeader
        title="Match Results"
        subtitle="Official sanctioned bout outcomes, championship changes, and contest records."
        overline="Official Archives"
      />

      {/* ── STATS BAR ── */}
      <section className="border-b border-border bg-background-secondary/50">
        <div className="container-wide">
          <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
            <div className="px-4 py-5 text-center">
              <p className="font-display text-2xl font-black text-foreground sm:text-3xl">
                {matches.length}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
                Sanctioned Matches
              </p>
            </div>
            <div className="px-4 py-5 text-center">
              <p className="font-display text-2xl font-black text-accent-red sm:text-3xl">
                {completedMatches.length}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
                Decisive Bouts
              </p>
            </div>
            <div className="px-4 py-5 text-center">
              <p className="font-display text-2xl font-black text-accent-gold sm:text-3xl">
                {matches.filter((m) => Boolean(m.championship)).length}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
                Championship Matches
              </p>
            </div>
            <div className="px-4 py-5 text-center">
              <p className="font-display text-2xl font-black text-foreground sm:text-3xl">
                {events.length}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
                Events Documented
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER & LISTING ── */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          {/* Controls Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-border bg-background-secondary/40 p-4">
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="All Matches"
                count={matches.length}
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
              <FilterButton
                label="Completed"
                count={completedMatches.length}
                active={filter === "completed"}
                onClick={() => setFilter("completed")}
              />
              <FilterButton
                label="Upcoming"
                count={upcomingMatches.length}
                active={filter === "upcoming"}
                onClick={() => setFilter("upcoming")}
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="event-filter" className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-foreground-muted">
                Filter Event:
              </label>
              <select
                id="event-filter"
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="border border-border bg-background px-3 py-2 font-mono text-xs uppercase tracking-wider text-foreground focus:border-accent-red focus:outline-none"
              >
                <option value="all">All Events ({events.length})</option>
                {eventOptions.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count label */}
          <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
              Displaying {filtered.length} match records
            </p>
            {(filter !== "all" || eventFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setEventFilter("all");
                }}
                className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-accent-red hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-border bg-background-secondary/30 py-16 text-center">
              <p className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                No Results Match Query
              </p>
              <p className="mt-1 font-body text-xs text-foreground-muted">
                Try selecting a different event or filter state.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((match) => (
                <ResultCard
                  key={match.id}
                  match={match}
                  wrestlers={wrestlers}
                  expanded={Boolean(match.result?.winner)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
        active
          ? "border-accent-red bg-accent-red/15 text-accent-red shadow-sm"
          : "border-border bg-background/60 text-foreground-muted hover:border-accent-red/40 hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-1.5 py-0.2 text-[8px] font-bold ${
          active
            ? "bg-accent-red text-white"
            : "bg-background-secondary text-foreground-muted/80"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
