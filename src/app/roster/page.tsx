"use client";

import { useState } from "react";
import { WrestlerCard } from "@/components/wrestlers/WrestlerCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { wrestlers } from "@/data";

type RosterFilter = "all" | "men" | "women" | "tag" | "champions";

export default function RosterPage() {
  const [filter, setFilter] = useState<RosterFilter>("all");
  const [search, setSearch] = useState("");

  const filteredWrestlers = wrestlers.filter((w) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "men" && w.gender === "men" && w.division !== "Tag Team") ||
      (filter === "women" && w.gender === "women" && w.division.includes("Women")) ||
      (filter === "tag" && w.division === "Tag Team") ||
      (filter === "champions" && w.championships.length > 0);

    const matchesSearch =
      search === "" ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.nickname.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <PageHeader
        title="ROSTER"
        subtitle="Meet the athletes, teams, and champions who make Indus Matworks."
        overline="THE ROSTER"
        backgroundImage="https://picsum.photos/seed/roster-hero/1920/1080"
      />

      <section className="py-12">
        <div className="container-wide">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="ALL"
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
              <FilterButton
                label="MEN"
                active={filter === "men"}
                onClick={() => setFilter("men")}
              />
              <FilterButton
                label="WOMEN"
                active={filter === "women"}
                onClick={() => setFilter("women")}
              />
              <FilterButton
                label="TAG TEAMS"
                active={filter === "tag"}
                onClick={() => setFilter("tag")}
              />
              <FilterButton
                label="CHAMPIONS"
                active={filter === "champions"}
                onClick={() => setFilter("champions")}
              />
            </div>

            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search wrestlers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-border bg-background-secondary px-4 py-2 pr-8 font-body text-sm text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-red"
                aria-label="Search wrestlers"
              />
              <SearchIcon />
            </div>
          </div>

          {filteredWrestlers.length === 0 ? (
            <p className="font-body text-center text-foreground-muted">
              No wrestlers match your search.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {filteredWrestlers.map((wrestler) => (
                <WrestlerCard
                  key={wrestler.id}
                  wrestler={wrestler}
                  variant="default"
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
      className={`border border-border px-4 py-2 font-body text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
        active
          ? "border-accent-red bg-accent-red/10 text-accent-red"
          : "text-foreground-muted hover:border-accent-red hover:text-accent-red"
      }`}
    >
      {label}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg
      className="absolute right-2 top-2.5 h-4 w-4 text-foreground-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21 L15 15" />
    </svg>
  );
}
