
"use client";

import { cn } from "@/lib/utils";

import type {
  RosterCategoryFilter,
  RosterPrimaryFilter,
} from "@/lib/roster";

export interface RosterFilterOption<T extends string> {
  key: T;
  label: string;
  count: number;
  tone?: "red" | "gold";
}

interface RosterFiltersProps {
  primary: RosterFilterOption<RosterPrimaryFilter>[];
  roles: RosterFilterOption<RosterCategoryFilter>[];
  activePrimary: RosterPrimaryFilter;
  activeRole: RosterCategoryFilter;
  search: string;
  resultCount: number;
  onSelectPrimary: (key: RosterPrimaryFilter) => void;
  onSelectRole: (key: RosterCategoryFilter) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

interface FilterTabProps {
  label: string;
  count: number;
  active: boolean;
  tone?: "red" | "gold";
  onClick: () => void;
}

function FilterTab({
  label,
  count,
  active,
  tone = "red",
  onClick,
}: FilterTabProps) {
  const activeText =
    tone === "gold" ? "text-accent-gold" : "text-accent-red";

  const indicator =
    tone === "gold" ? "bg-accent-gold" : "bg-accent-red";

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-controls="roster-grid"
      onClick={onClick}
      className={cn(
        "group relative inline-flex min-h-10 shrink-0 items-center px-3 py-2 text-left",
        "font-mono text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em]",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        active
          ? cn(
              "text-foreground",
              indicator,
              "focus-visible:ring-offset-background"
            )
          : cn(
              "text-foreground-muted hover:text-foreground",
              "focus-visible:ring-offset-background-secondary",
              "hover:border-foreground-muted/40"
            ),
        "border-b-[2px] border-transparent",
        active ? "border-current" : "",
        active ? "scale-100" : "scale-95 group-hover:scale-100"
      )}
    >
      <span className="flex items-center gap-2 whitespace-nowrap">
        <span>{label}</span>

        <span
          className={cn(
            "text-[9px] tabular-nums transition-colors duration-200",
            active
              ? activeText
              : "text-foreground-muted/60 group-hover:text-foreground",
          )}
        >
          {count}
        </span>
      </span>
    </button>
  );
}

/**
 * Roster navigation: division pills, role pills, live result counts,
 * and roster search.
 */
export function RosterFilters({
  primary,
  roles,
  activePrimary,
  activeRole,
  search,
  resultCount,
  onSelectPrimary,
  onSelectRole,
  onSearchChange,
  onReset,
  hasActiveFilters,
}: RosterFiltersProps) {
  return (
    <section aria-label="Roster filters" className="relative overflow-hidden">
      {/* Division filters */}
      <div className="mb-6">
        <p className="mb-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted">
          Division
        </p>

        <div
          role="group"
          aria-label="Filter roster by division"
          className="im-tab-scroll -mx-2 flex min-w-0 items-stretch overflow-x-auto px-2"
        >
          {primary.map((option) => (
            <FilterTab
              key={option.key}
              label={option.label}
              count={option.count}
              active={activePrimary === option.key}
              tone={option.tone}
              onClick={() => onSelectPrimary(option.key)}
            />
          ))}
        </div>
      </div>

      {/* Role filters and search */}
      <div className="grid min-w-0 gap-6 sm:grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_minmax(250px,320px)] lg:items-end lg:gap-10">
        <div className="min-w-0">
          <p className="mb-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted">
            Role
          </p>

          <div
            role="group"
            aria-label="Filter roster by role"
            className="im-tab-scroll -mx-2 flex min-w-0 items-stretch overflow-x-auto px-2"
          >
            {roles.map((option) => (
              <FilterTab
                key={option.key}
                label={option.label}
                count={option.count}
                active={activeRole === option.key}
                tone={option.tone}
                onClick={() => onSelectRole(option.key)}
              />
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="min-w-0">
          <label
            htmlFor="roster-search"
            className="mb-2.5 block font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted"
          >
            Search
          </label>

          <div className="relative">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              id="roster-search"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Find a wrestler..."
              autoComplete="off"
              aria-describedby="roster-result-count"
              className={cn(
                "h-11 w-full rounded-none border border-border bg-background pl-10 pr-10",
                "font-mono text-xs text-foreground",
                "placeholder:text-foreground-muted/60",
                "transition-[border-color] duration-200",
                "focus:border-accent-red focus:outline-none focus:ring-1 focus:ring-accent-red/30",
                "hover:border-foreground-muted/50",
              )}
            />

            {search.length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear roster search"
                className={cn(
                  "absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center",
                  "text-lg leading-none text-foreground-muted",
                  "transition-colors hover:text-accent-red",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red",
                )}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result information + reset */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border/40 pt-5 sm:pt-0 sm:border-t-0">
        <p
          id="roster-result-count"
          aria-live="polite"
          aria-atomic="true"
          className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground-muted sm:text-[10px]"
        >
          <span className="mr-1.5 font-bold tabular-nums text-foreground">
            {resultCount}
          </span>
          {resultCount === 1 ? "athlete found" : "athletes found"}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className={cn(
              "min-h-9 shrink-0 px-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em]",
              "text-accent-red transition-colors hover:text-accent-red-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red",
            )}
          >
            Reset filters
          </button>
        )}
      </div>
    </section>
  );
}
