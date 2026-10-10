
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
        "group relative inline-flex min-h-11 shrink-0 items-center px-3 py-2.5 text-left",
        "font-mono text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em]",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary",
        active
          ? "text-foreground"
          : "text-foreground-muted hover:text-foreground",
      )}
    >
      <span className="flex items-center gap-2 whitespace-nowrap">
        <span>{label}</span>

        <span
          className={cn(
            "text-[9px] tabular-nums transition-colors duration-200",
            active
              ? activeText
              : "text-foreground-muted/70 group-hover:text-foreground",
          )}
        >
          {count}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-1 bottom-0 h-[2px] origin-left",
          "transition-transform duration-300 ease-out",
          indicator,
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </button>
  );
}

/**
 * Premium roster navigation with responsive division tabs,
 * role filters, live result counts, and roster search.
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
    <section
      aria-label="Roster filters"
      className="relative overflow-hidden border border-border bg-background-secondary/40"
    >
      {/* Top accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent-red),transparent)] opacity-70"
      />

      {/* Division filters and search */}
      <div className="grid min-w-0 gap-5 p-3 pt-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-end lg:gap-8">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-px w-4 bg-accent-red"
            />
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted">
              Division
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter roster by division"
            className="im-tab-scroll -mx-1 flex min-w-0 items-stretch overflow-x-auto px-1"
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

        {/* Search */}
        <div className="min-w-0">
          <label
            htmlFor="roster-search"
            className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted"
          >
            Find a fighter
          </label>

          <div className="relative">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted/70"
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
              placeholder="Name, style, finisher..."
              autoComplete="off"
              aria-describedby="roster-result-count"
              className={cn(
                "h-11 w-full rounded-none border border-border bg-background pl-10 pr-10",
                "font-mono text-xs text-foreground",
                "placeholder:text-foreground-muted/60",
                "transition-[border-color,box-shadow] duration-200",
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

      {/* Role filters and result information */}
      <div className="border-t border-border/70 px-3 py-3 sm:px-5">
        <div className="flex min-w-0 flex-col gap-3 sm:gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <p className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted">
              Role
            </p>

            <div
              role="group"
              aria-label="Filter roster by role"
              className="im-tab-scroll -mx-1 flex min-w-0 items-stretch overflow-x-auto px-1"
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

          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border/50 pt-3 sm:justify-end sm:border-0 sm:pt-0">
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
        </div>
      </div>

      {/* Bottom accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent-red),transparent)] opacity-30"
      />
    </section>
  );
}
