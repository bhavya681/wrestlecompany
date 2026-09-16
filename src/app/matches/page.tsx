"use client";

import { useState } from "react";
import { ResultCard } from "@/components/results/ResultCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Button";
import { matches, wrestlers, events, championships } from "@/data";
import type { MatchType } from "@/types";

export default function MatchesPage() {
  const [yearFilter, setYearFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [wrestlerFilter, setWrestlerFilter] = useState("");
  const [championshipFilter, setChampionshipFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const years = Array.from(
    new Set(matches.map((m) => new Date(m.date).getFullYear()))
  ).sort((a, b) => b - a);

  const matchTypes: MatchType[] = [
    "singles",
    "tag-team",
    "steel-cage",
    "ladder",
    "battle-royal",
    "tournament",
    "submission",
    "no-disqualification",
  ];

  const filtered = matches.filter((m) => {
    const year = new Date(m.date).getFullYear();
    if (yearFilter !== "all" && year !== Number(yearFilter)) return false;
    if (eventFilter !== "all" && m.eventId !== eventFilter) return false;
    if (championshipFilter !== "all" && m.championship !== championshipFilter)
      return false;
    if (typeFilter !== "all" && m.type !== typeFilter) return false;
    if (wrestlerFilter) {
      return m.competitors.some(
        (c) =>
          c.wrestlerId === wrestlerFilter ||
          c.wrestler.toLowerCase().includes(wrestlerFilter.toLowerCase())
      );
    }
    return true;
  });

  const matchTypeLabels: Record<string, string> = {
    singles: "Singles",
    "tag-team": "Tag Team",
    "steel-cage": "Steel Cage",
    ladder: "Ladder",
    "battle-royal": "Battle Royale",
    tournament: "Tournament",
    submission: "Submission",
    "no-disqualification": "No DQ",
  };

  const clearAll = () => {
    setYearFilter("all");
    setEventFilter("all");
    setWrestlerFilter("");
    setChampionshipFilter("all");
    setTypeFilter("all");
  };

  return (
    <>
      <PageHeader
        title="MATCH DATABASE"
        subtitle="Search and filter through every match in Indus Matworks history."
        overline="MATCHES"
        backgroundImage="https://picsum.photos/seed/matches-hero/1920/1080"
      />

      <section className="py-12">
        <div className="container-wide">
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="border border-border bg-background-secondary px-4 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent-red"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="border border-border bg-background-secondary px-4 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent-red"
            >
              <option value="all">All Events</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Wrestler..."
              value={wrestlerFilter}
              onChange={(e) => setWrestlerFilter(e.target.value)}
              className="border border-border bg-background-secondary px-4 py-2 font-body text-sm text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-red"
            />

            <select
              value={championshipFilter}
              onChange={(e) => setChampionshipFilter(e.target.value)}
              className="border border-border bg-background-secondary px-4 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent-red"
            >
              <option value="all">All Titles</option>
              {championships.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortName}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-border bg-background-secondary px-4 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent-red"
            >
              <option value="all">All Types</option>
              {matchTypes.map((t) => (
                <option key={t} value={t}>
                  {matchTypeLabels[t] || t}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <Badge variant="muted" size="sm">
              {filtered.length} MATCHES FOUND
            </Badge>
            <button
              onClick={clearAll}
              className="font-body text-xs text-foreground-muted hover:text-accent-red"
            >
              CLEAR FILTERS
            </button>
          </div>

          {filtered.length === 0 ? (
            <p className="font-body text-center text-foreground-muted">
              No matches found. Adjust your filters.
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
