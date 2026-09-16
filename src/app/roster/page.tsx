"use client";

import { useState } from "react";

import { WrestlerCard } from "@/components/wrestlers/WrestlerCard";
import { PageHeader } from "@/components/layout/PageHeader";

import { wrestlers } from "@/data";
import type { Wrestler } from "@/types";

type RosterFilter =
  | "all"
  | "men"
  | "women"
  | "tag"
  | "managers"
  | "referees"
  | "announcers"
  | "commentators";

interface RosterStats {
  total: number;
  wrestlers: number;
  divas: number;
  tagTeams: number;
  managers: number;
  referees: number;
  announcers: number;
  commentators: number;
  active: number;
}

/* =========================================================
   ROLE HELPERS
   ========================================================= */

function getNormalizedValues(wrestler: Wrestler) {
  return {
    role: String(wrestler.role || "").toLowerCase().trim(),
    type: String(wrestler.type || "").toLowerCase().trim(),
    division: String(wrestler.division || "").toLowerCase().trim(),
    weightClass: String(wrestler.weightClass || "")
      .toLowerCase()
      .trim(),
  };
}

function isTagTeam(wrestler: Wrestler) {
  const { role, type, division, weightClass } =
    getNormalizedValues(wrestler);

  return (
    role === "tag-team" ||
    type === "tag-team" ||
    division.includes("tag team") ||
    weightClass.includes("tag team")
  );
}

function isManager(wrestler: Wrestler) {
  const { role, type, division, weightClass } =
    getNormalizedValues(wrestler);

  return (
    role === "manager" ||
    type === "manager" ||
    division.includes("management") ||
    division.includes("manager") ||
    weightClass.includes("manager")
  );
}

function isReferee(wrestler: Wrestler) {
  const { role, type, division, weightClass } =
    getNormalizedValues(wrestler);

  return (
    role === "referee" ||
    role === "refree" ||
    type === "referee" ||
    type === "refree" ||
    division.includes("referee") ||
    division.includes("refree") ||
    weightClass.includes("referee") ||
    weightClass.includes("refree")
  );
}

function isAnnouncer(wrestler: Wrestler) {
  const { role, type, division, weightClass } =
    getNormalizedValues(wrestler);

  return (
    role === "announcer" ||
    role === "ring-announcer" ||
    role === "ring announcer" ||
    type === "announcer" ||
    type === "ring-announcer" ||
    type === "ring announcer" ||
    division.includes("announcer") ||
    division.includes("ring announcer") ||
    weightClass.includes("announcer") ||
    weightClass.includes("ring announcer")
  );
}

function isCommentator(wrestler: Wrestler) {
  const { role, type, weightClass } =
    getNormalizedValues(wrestler);

  return (
    role === "commentator" ||
    role === "commentators" ||
    type === "commentator" ||
    type === "commentators" ||
    weightClass === "commentator" ||
    weightClass === "commentators"
  );
}

/* =========================================================
   ROSTER STATISTICS
   ========================================================= */

const rosterStats: RosterStats = {
  total: wrestlers.length,

  wrestlers: wrestlers.filter(
    (wrestler) =>
      wrestler.gender === "men" &&
      !isTagTeam(wrestler) &&
      !isManager(wrestler) &&
      !isReferee(wrestler) &&
      !isAnnouncer(wrestler) &&
      !isCommentator(wrestler)
  ).length,

  divas: wrestlers.filter(
    (wrestler) =>
      wrestler.gender === "women" &&
      !isTagTeam(wrestler) &&
      !isManager(wrestler) &&
      !isReferee(wrestler) &&
      !isAnnouncer(wrestler) &&
      !isCommentator(wrestler)
  ).length,

  tagTeams: wrestlers.filter(isTagTeam).length,

  managers: wrestlers.filter(isManager).length,

  referees: wrestlers.filter(isReferee).length,

  announcers: wrestlers.filter(isAnnouncer).length,

  commentators: wrestlers.filter(isCommentator).length,

  active: wrestlers.filter(
    (wrestler) => wrestler.status === "active"
  ).length,
};

/* =========================================================
   FILTER COUNTS
   ========================================================= */

const filterCounts: Record<RosterFilter, number> = {
  all: rosterStats.total,
  men: rosterStats.wrestlers,
  women: rosterStats.divas,
  tag: rosterStats.tagTeams,
  managers: rosterStats.managers,
  referees: rosterStats.referees,
  announcers: rosterStats.announcers,
  commentators: rosterStats.commentators,
};

/* =========================================================
   FILTER MATCHING
   ========================================================= */

function matchesFilter(
  wrestler: Wrestler,
  filter: RosterFilter
) {
  switch (filter) {
    case "all":
      return true;

    case "men":
      return (
        wrestler.gender === "men" &&
        !isTagTeam(wrestler) &&
        !isManager(wrestler) &&
        !isReferee(wrestler) &&
        !isAnnouncer(wrestler) &&
        !isCommentator(wrestler)
      );

    case "women":
      return (
        wrestler.gender === "women" &&
        !isTagTeam(wrestler) &&
        !isManager(wrestler) &&
        !isReferee(wrestler) &&
        !isAnnouncer(wrestler) &&
        !isCommentator(wrestler)
      );

    case "tag":
      return isTagTeam(wrestler);

    case "managers":
      return isManager(wrestler);

    case "referees":
      return isReferee(wrestler);

    case "announcers":
      return isAnnouncer(wrestler);

    case "commentators":
      return isCommentator(wrestler);

    default:
      return true;
  }
}

/* =========================================================
   SEARCH
   ========================================================= */

function getSearchText(wrestler: Wrestler) {
  return [
    wrestler.name,
    wrestler.ringName,
    wrestler.nickname,
    wrestler.division,
    wrestler.weightClass,
    wrestler.role,
    wrestler.type,
    ...(wrestler.members ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/* =========================================================
   PAGE
   ========================================================= */

export default function RosterPage() {
  const [filter, setFilter] =
    useState<RosterFilter>("all");

  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredWrestlers = wrestlers.filter(
    (wrestler) => {
      const matchesSearch =
        normalizedSearch === "" ||
        getSearchText(wrestler).includes(
          normalizedSearch
        );

      return (
        matchesFilter(wrestler, filter) &&
        matchesSearch
      );
    }
  );

  return (
    <>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <PageHeader
        title="ROSTER"
        subtitle="Meet the athletes, teams, officials, and broadcast personalities of Indus Matworks."
        overline="THE ROSTER"
      />

      {/* =====================================================
          ROSTER STATISTICS
          ===================================================== */}

      <section className="border-b border-border bg-background-secondary/40">
        <div className="container-wide grid grid-cols-2 gap-px overflow-hidden bg-border py-6 sm:grid-cols-3 lg:grid-cols-8">
          <RosterStat
            label="ROSTER"
            value={rosterStats.total}
          />

          <RosterStat
            label="WRESTLERS"
            value={rosterStats.wrestlers}
          />

          <RosterStat
            label="DIVAS"
            value={rosterStats.divas}
          />

          <RosterStat
            label="TAG TEAMS"
            value={rosterStats.tagTeams}
          />

          <RosterStat
            label="MANAGERS"
            value={rosterStats.managers}
          />

          <RosterStat
            label="REFEREES"
            value={rosterStats.referees}
          />

          <RosterStat
            label="ANNOUNCERS"
            value={rosterStats.announcers}
          />

          <RosterStat
            label="ACTIVE"
            value={rosterStats.active}
          />
        </div>
      </section>

      {/* =====================================================
          ROSTER CONTENT
          ===================================================== */}

      <section className="py-12">
        <div className="container-wide">

          {/* =================================================
              FILTERS + SEARCH
              ================================================= */}

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            {/* FILTER BUTTONS */}

            <div className="flex flex-wrap gap-2">

              <FilterButton
                label="ALL"
                count={filterCounts.all}
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />

              <FilterButton
                label="MEN"
                count={filterCounts.men}
                active={filter === "men"}
                onClick={() => setFilter("men")}
              />

              <FilterButton
                label="DIVAS"
                count={filterCounts.women}
                active={filter === "women"}
                onClick={() => setFilter("women")}
              />

              <FilterButton
                label="TAG TEAMS"
                count={filterCounts.tag}
                active={filter === "tag"}
                onClick={() => setFilter("tag")}
              />

              <FilterButton
                label="MANAGERS"
                count={filterCounts.managers}
                active={filter === "managers"}
                onClick={() =>
                  setFilter("managers")
                }
              />

              <FilterButton
                label="REFEREES"
                count={filterCounts.referees}
                active={filter === "referees"}
                onClick={() =>
                  setFilter("referees")
                }
              />

              <FilterButton
                label="ANNOUNCERS"
                count={filterCounts.announcers}
                active={filter === "announcers"}
                onClick={() =>
                  setFilter("announcers")
                }
              />

              <FilterButton
                label="COMMENTATORS"
                count={filterCounts.commentators}
                active={filter === "commentators"}
                onClick={() =>
                  setFilter("commentators")
                }
              />

            </div>

            {/* SEARCH */}

            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search roster..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full border border-border bg-background-secondary px-4 py-2 pr-8 font-body text-sm text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-red"
                aria-label="Search roster"
              />

              <SearchIcon />
            </div>
          </div>

          {/* =================================================
              RESULT COUNT
              ================================================= */}

          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Showing {filteredWrestlers.length} of{" "}
            {rosterStats.total} roster entries
          </p>

          {/* =================================================
              EMPTY STATE
              ================================================= */}

          {filteredWrestlers.length === 0 ? (
            <div className="border border-border bg-background-secondary py-12 text-center">
              <p className="font-display text-lg font-bold uppercase text-foreground">
                No Roster Entries Found
              </p>

              <p className="mt-2 font-body text-sm text-foreground-muted">
                Try another search term or select a
                different roster category.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 border border-accent-red px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent-red transition-colors hover:bg-accent-red hover:text-white"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (

            /* =================================================
               WRESTLER GRID
               ================================================= */

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

/* =========================================================
   ROSTER STAT
   ========================================================= */

function RosterStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-background px-4 py-4 text-center">
      <p className="font-display text-2xl font-black leading-none text-foreground">
        {value}
      </p>

      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   FILTER BUTTON
   ========================================================= */

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
      aria-pressed={active}
      onClick={onClick}
      className={`border border-border px-4 py-2 font-body text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
        active
          ? "border-accent-red bg-accent-red/10 text-accent-red"
          : "text-foreground-muted hover:border-accent-red hover:text-accent-red"
      }`}
    >
      {label}{" "}
      <span className="opacity-60">
        {count}
      </span>
    </button>
  );
}

/* =========================================================
   SEARCH ICON
   ========================================================= */

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
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="8"
      />

      <path d="M21 21 L15 15" />
    </svg>
  );
}