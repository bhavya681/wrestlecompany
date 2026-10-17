"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { WrestlerCard } from "@/components/wrestlers/WrestlerCard";
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
  type RosterCategoryFilter,
  type RosterPrimaryFilter,
} from "@/lib/roster";
import { wrestlers } from "@/data";
import type { Wrestler } from "@/types";

const PRIMARY_LABELS: { key: RosterPrimaryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "tag", label: "Tag Teams" },
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
    <section className="relative py-10 md:py-14 lg:py-16">
      {/* Faint texture behind the roster wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 im-hairline-grid opacity-60"
      />

      <div className="container-wide relative">
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
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5"
          >
            {filteredWrestlers.map((wrestler, index) => (
              <WrestlerCard
                key={wrestler.id}
                wrestler={wrestler}
                variant="default"
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}