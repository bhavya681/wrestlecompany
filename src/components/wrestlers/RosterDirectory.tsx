
"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { RosterCard } from "@/components/wrestlers/RosterCard";
import {
  RosterFilters,
  type RosterFilterOption,
} from "@/components/wrestlers/RosterFilters";
import {
  getSearchText,
  isAnnouncer,
  isChampion,
  isCommentator,
  isManager,
  isReferee,
  isSinglesWrestler,
  isTagTeam,
  matchesCategory,
  matchesGender,
  matchesTagTeamDivision,
  type RosterCategoryFilter,
  type RosterPrimaryFilter,
} from "@/lib/roster";
import { wrestlers } from "@/data";
import type { Wrestler } from "@/types";

const PRIMARY_LABELS: { key: RosterPrimaryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "mens", label: "Men's Tag Teams" },
  { key: "womens", label: "Women's Tag Teams" },
  { key: "mixed", label: "Couple Tag Teams" },
  { key: "tag", label: "All Tag Teams" },
  { key: "champions", label: "Champions" },
];

const ROLE_LABELS: { key: RosterCategoryFilter; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "singles", label: "Singles" },
  { key: "managers", label: "Managers" },
  { key: "referees", label: "Referees" },
  { key: "announcers", label: "Announcers" },
  { key: "commentators", label: "Broadcast" },
];

function matchesPrimary(
  wrestler: Wrestler,
  filter: RosterPrimaryFilter
): boolean {
  if (filter === "champions") return isChampion(wrestler);

  if (filter === "tag") return isTagTeam(wrestler);

  if (filter === "mens") return matchesTagTeamDivision(wrestler, "mens");
  if (filter === "womens") return matchesTagTeamDivision(wrestler, "womens");
  if (filter === "mixed") return matchesTagTeamDivision(wrestler, "mixed");

  return matchesGender(wrestler, filter);
}

/**
 * Client-side roster directory. Owns the filter state so the roster
 * masthead and the rest of the page can stay server rendered.
 */
export function RosterDirectory() {
  const [primaryFilter, setPrimaryFilter] = useState<RosterPrimaryFilter>("all");
  const [roleFilter, setRoleFilter] =
    useState<RosterCategoryFilter>("all");
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredWrestlers = useMemo(
    () =>
      wrestlers.filter((wrestler) => {
        const matchesSearch =
          normalizedSearch === "" ||
          getSearchText(wrestler).includes(normalizedSearch);

        return (
          matchesPrimary(wrestler, primaryFilter) &&
          matchesCategory(wrestler, roleFilter) &&
          matchesSearch
        );
      }),
    [primaryFilter, roleFilter, normalizedSearch]
  );

  const primaryOptions = useMemo<RosterFilterOption<RosterPrimaryFilter>[]>(
    () =>
      PRIMARY_LABELS.map(({ key, label }) => ({
        key,
        label,
        tone: key === "champions" ? ("gold" as const) : ("red" as const),
        count: wrestlers.filter((wrestler) => {
          if (
            roleFilter !== "all" &&
            !matchesCategory(wrestler, roleFilter)
          ) {
            return false;
          }

          if (key === "all") return true;

          return matchesPrimary(wrestler, key);
        }).length,
      })),
    [roleFilter]
  );

  const roleOptions = useMemo<RosterFilterOption<RosterCategoryFilter>[]>(
    () =>
      ROLE_LABELS.map(({ key, label }) => ({
        key,
        label,
        count: wrestlers.filter((wrestler) => {
          if (!matchesPrimary(wrestler, primaryFilter)) return false;

          if (key === "all") return true;

          if (key === "singles") return isSinglesWrestler(wrestler);
          if (key === "managers") return isManager(wrestler);
          if (key === "referees") return isReferee(wrestler);
          if (key === "announcers") return isAnnouncer(wrestler);

          return isCommentator(wrestler);
        }).length,
      })),
    [primaryFilter]
  );

  const hasActiveFilters =
    primaryFilter !== "all" || roleFilter !== "all" || search !== "";

  const resetFilters = () => {
    setPrimaryFilter("all");
    setRoleFilter("all");
    setSearch("");
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      {/* Faint texture behind the roster wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 im-hairline-grid opacity-60"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* ── CATEGORY LABELS ── */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <CategoryTab
              key="roster"
              label="Roster"
              active={roleFilter === "all"}
              onClick={() => {
                setPrimaryFilter("all");
                setRoleFilter("all");
              }}
            />
            <CategoryTab
              key="referees"
              label="Referees"
              active={roleFilter === "referees"}
              onClick={() => {
                setPrimaryFilter("all");
                setRoleFilter("referees");
              }}
            />
          </div>
        </div>

        {/* ── FILTERS ── */}
        <RosterFilters
          primary={primaryOptions}
          roles={roleOptions}
          activePrimary={primaryFilter}
          activeRole={roleFilter}
          search={search}
          resultCount={filteredWrestlers.length}
          hasActiveFilters={hasActiveFilters}
          onSelectPrimary={setPrimaryFilter}
          onSelectRole={setRoleFilter}
          onSearchChange={setSearch}
          onReset={resetFilters}
        />

        {/* ── GRID / EMPTY STATE ── */}
        {filteredWrestlers.length === 0 ? (
          <div className="relative mt-10 flex flex-col items-center justify-center border border-dashed border-border bg-background-secondary/30 px-6 py-24 text-center">
            <span
              aria-hidden="true"
              className="mb-5 flex h-14 w-14 items-center justify-center border border-border bg-background font-display text-xl font-black text-accent-red"
            >
              0
            </span>

            <p className="font-display text-xl font-black uppercase tracking-tight text-foreground">
              No athletes found
            </p>

            <p className="mt-2 max-w-sm font-body text-xs leading-6 text-foreground-muted">
              No competitor matches the current division, role and
              search combination.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className={cn(
                "mt-7 border border-accent-red px-5 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-accent-red",
                "transition-colors duration-200 hover:bg-accent-red hover:text-background",
                "focus-visible:outline-none focus-visible:bg-accent-red focus-visible:text-background"
              )}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div
            id="roster-grid"
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8"
          >
            {filteredWrestlers.map((wrestler, index) => (
              <RosterCard key={wrestler.id} wrestler={wrestler} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryTab({
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
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-none border px-5 py-2.5",
        "font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        active
          ? "border-accent-red bg-accent-red text-background shadow-[0_0_20px_rgba(193,39,45,0.35)]"
          : "border-border/50 bg-background text-foreground-muted hover:border-foreground-muted/50 hover:text-foreground",
        "focus-visible:ring-accent-red",
        active
          ? "focus-visible:ring-offset-background"
          : "focus-visible:ring-offset-background-secondary"
      )}
    >
      {label}
    </button>
  );
}
