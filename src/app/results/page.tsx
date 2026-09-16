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

  const completedMatches = matches.filter(
    (m) => m.result.winner !== ""
  );
  const upcomingMatches = matches.filter((m) => m.result.winner === "");

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
        title="RESULTS"
        subtitle="Complete results database from every Indus Matworks event."
        overline="MATCH DATABASE"
        backgroundImage="https://picsum.photos/seed/results-hero/1920/1080"
      />

      <section className="py-12">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="ALL"
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
              <FilterButton
                label="COMPLETED"
                active={filter === "completed"}
                onClick={() => setFilter("completed")}
              />
              <FilterButton
                label="UPCOMING"
                active={filter === "upcoming"}
                onClick={() => setFilter("upcoming")}
              />
            </div>

            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="border border-border bg-background-secondary px-4 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent-red"
            >
              <option value="all">All Events</option>
              {eventOptions.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="font-body text-center text-foreground-muted">
              No results found.
            </p>
          ) : (
            <div className="space-y-4">
              {filtered.map((match) => (
                <ResultCard
                  key={match.id}
                  match={match}
                  wrestlers={wrestlers}
                  expanded={match.result.winner !== ""}
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
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-2 font-body text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
        active
          ? "border-accent-red bg-accent-red/10 text-accent-red"
          : "border-border text-foreground-muted hover:border-accent-red hover:text-accent-red"
      }`}
    >
      {label}
    </button>
  );
}
