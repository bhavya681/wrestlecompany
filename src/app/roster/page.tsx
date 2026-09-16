"use client";

import { useState, useMemo } from "react";
import { WrestlerCard } from "@/components/wrestlers/WrestlerCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { wrestlers, championships } from "@/data";
import type { Wrestler } from "@/types";

type GenderFilter = "all" | "men" | "women";

type CategoryFilter =
  | "all"
  | "singles"
  | "tag"
  | "champions"
  | "managers"
  | "referees"
  | "announcers"
  | "commentators";

/* ─── Role / Type Normalizers ─── */

function getNorm(wrestler: Wrestler) {
  return {
    role: String(wrestler.role || "").toLowerCase().trim(),
    type: String(wrestler.type || "").toLowerCase().trim(),
    division: String(wrestler.division || "").toLowerCase().trim(),
    weightClass: String(wrestler.weightClass || "").toLowerCase().trim(),
  };
}

function isTagTeam(w: Wrestler) {
  const { role, type, division, weightClass } = getNorm(w);
  return (
    role === "tag-team" ||
    type === "tag-team" ||
    division.includes("tag team") ||
    weightClass.includes("tag team")
  );
}

function isManager(w: Wrestler) {
  const { role, type, division, weightClass } = getNorm(w);
  return (
    role === "manager" ||
    type === "manager" ||
    division.includes("management") ||
    division.includes("manager") ||
    weightClass.includes("manager")
  );
}

function isReferee(w: Wrestler) {
  const { role, type, division, weightClass } = getNorm(w);
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

function isAnnouncer(w: Wrestler) {
  const { role, type, division, weightClass } = getNorm(w);
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

function isCommentator(w: Wrestler) {
  const { role, type, weightClass, division } = getNorm(w);
  return (
    role === "commentator" ||
    role === "commentators" ||
    type === "commentator" ||
    type === "commentators" ||
    weightClass.includes("commentator") ||
    division.includes("commentator")
  );
}

/* Champion IDs derived from championship data */
const championWrestlerIds = new Set(
  championships
    .filter((c) => c.currentChampion?.wrestlerId)
    .map((c) => c.currentChampion!.wrestlerId)
);

function isChampion(w: Wrestler) {
  return (
    championWrestlerIds.has(w.id) ||
    (w.championships && w.championships.length > 0)
  );
}

function isSinglesWrestler(w: Wrestler) {
  return (
    !isTagTeam(w) &&
    !isManager(w) &&
    !isReferee(w) &&
    !isAnnouncer(w) &&
    !isCommentator(w)
  );
}

/* ─── Filter match logic (Combinable) ─── */

function matchesGender(w: Wrestler, gender: GenderFilter) {
  if (gender === "all") return true;
  return w.gender === gender;
}

function matchesCategory(w: Wrestler, category: CategoryFilter) {
  switch (category) {
    case "all":
      return true;
    case "singles":
      return isSinglesWrestler(w);
    case "tag":
      return isTagTeam(w);
    case "champions":
      return isChampion(w);
    case "managers":
      return isManager(w);
    case "referees":
      return isReferee(w);
    case "announcers":
      return isAnnouncer(w);
    case "commentators":
      return isCommentator(w);
    default:
      return true;
  }
}

/* ─── Search text ─── */

function getSearchText(w: Wrestler) {
  return [
    w.name,
    w.ringName,
    w.nickname,
    w.division,
    w.weightClass,
    w.role,
    w.type,
    ...(w.members ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/* ─── Filter configurations ─── */

const genderOptions: { key: GenderFilter; label: string; icon: string }[] = [
  { key: "all", label: "All Athletes", icon: "◈" },
  { key: "men", label: "Men", icon: "♂" },
  { key: "women", label: "Women", icon: "♀" },
];

const categoryOptions: { key: CategoryFilter; label: string; badge?: string }[] = [
  { key: "all", label: "All Categories" },
  { key: "singles", label: "Singles" },
  { key: "tag", label: "Tag Teams" },
  { key: "champions", label: "Champions", badge: "Gold" },
  { key: "managers", label: "Managers" },
  { key: "referees", label: "Referees" },
  { key: "announcers", label: "Announcers" },
  { key: "commentators", label: "Commentators" },
];

/* ─── Main Component ─── */

export default function RosterPage() {
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  // Filtered list
  const filteredWrestlers = useMemo(
    () =>
      wrestlers.filter((w) => {
        const matchSearch =
          normalizedSearch === "" ||
          getSearchText(w).includes(normalizedSearch);
        return (
          matchesGender(w, genderFilter) &&
          matchesCategory(w, categoryFilter) &&
          matchSearch
        );
      }),
    [genderFilter, categoryFilter, normalizedSearch]
  );

  // Dynamic counts based on currently selected gender
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      all: 0,
      singles: 0,
      tag: 0,
      champions: 0,
      managers: 0,
      referees: 0,
      announcers: 0,
      commentators: 0,
    };
    for (const w of wrestlers) {
      if (matchesGender(w, genderFilter)) {
        for (const cat of Object.keys(counts) as CategoryFilter[]) {
          if (matchesCategory(w, cat)) counts[cat]++;
        }
      }
    }
    return counts;
  }, [genderFilter]);

  // Gender counts based on currently selected category
  const genderCounts = useMemo(() => {
    const counts: Record<GenderFilter, number> = {
      all: 0,
      men: 0,
      women: 0,
    };
    for (const w of wrestlers) {
      if (matchesCategory(w, categoryFilter)) {
        counts.all++;
        if (w.gender === "men") counts.men++;
        if (w.gender === "women") counts.women++;
      }
    }
    return counts;
  }, [categoryFilter]);

  const hasActiveFilters =
    genderFilter !== "all" || categoryFilter !== "all" || search !== "";

  const clearAllFilters = () => {
    setGenderFilter("all");
    setCategoryFilter("all");
    setSearch("");
  };

  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader
        title="Roster"
        subtitle="The fighters, leaders, and officials who define Indus Matworks."
        overline="Institutional Registry"
      />

      {/* ── STATS BAR ── */}
      <section className="relative border-b border-border bg-background-secondary/60" aria-label="Roster overview">
        <div className="container-wide">
          <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4 lg:grid-cols-6">
            {[
              { label: "Total Talent", value: wrestlers.length, accent: false },
              { label: "Male Roster", value: wrestlers.filter((w) => w.gender === "men").length, accent: false },
              { label: "Female Roster", value: wrestlers.filter((w) => w.gender === "women").length, accent: false },
              { label: "Tag Teams", value: wrestlers.filter(isTagTeam).length, accent: false },
              { label: "Managers", value: wrestlers.filter(isManager).length, accent: false },
              { label: "Champions", value: wrestlers.filter(isChampion).length, accent: true },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-5 text-center transition-colors hover:bg-background-tertiary/60">
                <p className={`font-display text-2xl font-black leading-none sm:text-3xl ${stat.accent ? "text-accent-gold" : "text-foreground"}`}>
                  {stat.value}
                </p>
                <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERING & ROSTER GRID ── */}
      <section className="py-10 md:py-16">
        <div className="container-wide">
          {/* ── CONTROLS CARD ── */}
          <div className="mb-8 rounded-none border border-border bg-background-secondary/40 p-5 md:p-6 shadow-sm">
            {/* Row 1: Gender selection + Search */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Gender selector */}
              <div>
                <span className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted">
                  Filter by Gender / Division
                </span>
                <div
                  className="inline-flex overflow-hidden rounded-sm border border-border bg-background"
                  role="group"
                  aria-label="Filter by gender"
                >
                  {genderOptions.map(({ key, label, icon }) => {
                    const count = genderCounts[key];
                    const active = genderFilter === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setGenderFilter(key)}
                        className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                          active
                            ? "bg-accent-red text-white shadow-inner"
                            : "text-foreground-muted hover:bg-background-secondary hover:text-foreground"
                        }`}
                      >
                        <span className="text-xs">{icon}</span>
                        <span>{label}</span>
                        <span
                          className={`inline-block rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                            active
                              ? "bg-black/30 text-white"
                              : "bg-background-tertiary text-foreground-muted/70"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search input */}
              <div className="relative shrink-0 sm:w-72 lg:w-80">
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground-muted/50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21L15 15" />
                </svg>
                <input
                  type="search"
                  placeholder="Search athlete, team, style…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-border bg-background pl-10 pr-4 py-2.5 font-body text-xs text-foreground placeholder-foreground-muted/40 transition-colors duration-200 focus:border-accent-red focus:outline-none"
                  aria-label="Search roster"
                  id="roster-search"
                />
              </div>
            </div>

            {/* Row 2: Category pills (Singles, Tag Team, Manager, Referee, etc.) */}
            <div className="mt-5 border-t border-border/60 pt-5">
              <span className="mb-2 block font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-foreground-muted">
                Role & Category
                {genderFilter !== "all" && (
                  <span className="ml-1.5 text-accent-red">
                    ({genderFilter === "men" ? "Male Only" : "Female Only"})
                  </span>
                )}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {categoryOptions.map(({ key, label }) => {
                  const count = categoryCounts[key];
                  const active = categoryFilter === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCategoryFilter(active && key !== "all" ? "all" : key)}
                      className={`group inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                        active
                          ? key === "champions"
                            ? "border-accent-gold bg-accent-gold/15 text-accent-gold shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                            : "border-accent-red bg-accent-red/15 text-accent-red shadow-[0_0_12px_rgba(193,39,45,0.2)]"
                          : "border-border bg-background/50 text-foreground-muted hover:border-border-light hover:bg-background hover:text-foreground"
                      }`}
                    >
                      <span>{label}</span>
                      <span
                        className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[8px] font-bold ${
                          active
                            ? key === "champions"
                              ? "bg-accent-gold text-background"
                              : "bg-accent-red text-white"
                            : "bg-background-tertiary text-foreground-muted group-hover:text-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RESULTS HEADER / ACTIVE FILTER STATUS ── */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                Displaying <span className="font-bold text-foreground">{filteredWrestlers.length}</span> competitors
              </p>
              {genderFilter !== "all" && (
                <span className="border border-accent-red/40 bg-accent-red/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent-red">
                  {genderFilter}
                </span>
              )}
              {categoryFilter !== "all" && (
                <span className="border border-border bg-background-secondary px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-foreground">
                  {categoryFilter}
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent-red transition-colors hover:text-accent-red-hover"
              >
                <span>✕</span> Reset All Filters
              </button>
            )}
          </div>

          {/* ── GRID OR EMPTY STATE ── */}
          {filteredWrestlers.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-border bg-background-secondary/30 py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
                <svg className="h-6 w-6 text-foreground-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21L15 15" />
                </svg>
              </div>
              <p className="font-display text-lg font-black uppercase tracking-tight text-foreground">
                No Athletes Match Selection
              </p>
              <p className="mt-1.5 max-w-sm font-body text-xs text-foreground-muted">
                No athletes found matching the combination of{" "}
                <span className="text-accent-red font-semibold">{genderFilter}</span> +{" "}
                <span className="text-accent-red font-semibold">{categoryFilter}</span>.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-6 border border-accent-red px-5 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-accent-red transition-colors hover:bg-accent-red hover:text-background"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
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