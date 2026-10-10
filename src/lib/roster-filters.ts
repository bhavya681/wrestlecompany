
import type {
  RosterCategoryFilter,
  RosterPrimaryFilter,
} from "./roster";

/**
 * Lightweight, versioned persistence for roster UI preferences.
 *
 * The versioned key lets future schema changes invalidate stale
 * preferences without breaking the roster page.
 */
export const ROSTER_FILTER_STORAGE_KEY =
  "indus-matworks-roster-filters-v1";

export interface RosterFilterState {
  primary: RosterPrimaryFilter;
  role: RosterCategoryFilter;
  search: string;
}

const DEFAULT_STATE: RosterFilterState = {
  primary: "all",
  role: "all",
  search: "",
};

const VALID_PRIMARY: readonly RosterPrimaryFilter[] = [
  "all",
  "men",
  "women",
  "tag",
  "champions",
];

const VALID_ROLE: readonly RosterCategoryFilter[] = [
  "all",
  "singles",
  "tag",
  "champions",
  "managers",
  "referees",
  "announcers",
  "commentators",
];

function isRosterPrimary(
  value: unknown
): value is RosterPrimaryFilter {
  return (
    typeof value === "string" &&
    (VALID_PRIMARY as readonly string[]).includes(value)
  );
}

function isRosterRole(
  value: unknown
): value is RosterCategoryFilter {
  return (
    typeof value === "string" &&
    (VALID_ROLE as readonly string[]).includes(value)
  );
}

/**
 * Safely read the saved filter state.
 *
 * Returns the defaults during server rendering, when storage is
 * unavailable, or when the stored payload is invalid or outdated.
 */
export function loadFilters(): RosterFilterState {
  if (typeof window === "undefined") {
    return { ...DEFAULT_STATE };
  }

  try {
    const raw = window.localStorage.getItem(
      ROSTER_FILTER_STORAGE_KEY
    );

    if (!raw) {
      return { ...DEFAULT_STATE };
    }

    const parsed: unknown = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return { ...DEFAULT_STATE };
    }

    const saved = parsed as Partial<RosterFilterState>;

    if (
      !isRosterPrimary(saved.primary) ||
      !isRosterRole(saved.role) ||
      typeof saved.search !== "string"
    ) {
      return { ...DEFAULT_STATE };
    }

    return {
      primary: saved.primary,
      role: saved.role,
      search: saved.search,
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

/**
 * Persist the current filter state.
 *
 * Safely does nothing during server rendering or if browser storage
 * is unavailable, disabled, or full.
 */
export function saveFilters(
  state: RosterFilterState
): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      ROSTER_FILTER_STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch {
    // Storage may be disabled, unavailable, or full.
  }
}

/**
 * Remove saved preferences. Use this when resetting roster filters.
 */
export function clearFilters(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(
      ROSTER_FILTER_STORAGE_KEY
    );
  } catch {
    // Ignore storage errors and keep the UI functional.
  }
}

export const DEFAULT_FILTER_STATE: RosterFilterState = {
  ...DEFAULT_STATE,
};