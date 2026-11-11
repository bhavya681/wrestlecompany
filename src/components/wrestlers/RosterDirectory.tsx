"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { wrestlers, championships } from "@/data";
import { RosterCard } from "@/components/wrestlers/RosterCard";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";
import type { Wrestler } from "@/types";
import {
  getSearchText,
  getWinRate,
  isAnnouncer,
  isChampion,
  isCommentator,
  isManager,
  isReferee,
  isSinglesWrestler,
  isTagTeam,
  matchesTagTeamDivision,
  type RosterPrimaryFilter,
} from "@/lib/roster";
import { loadFilters, saveFilters } from "@/lib/roster-filters";

type Tab =
  | "all"
  | "men"
  | "women"
  | "mens-tag"
  | "womens-tag"
  | "mixed-tag"
  | "tag"
  | "champions"
  | "officials";
type SortKey = "az" | "za" | "champions" | "record";

const BATCH_SIZE = 12;
const TAB_VALUES: readonly Tab[] = [
  "all",
  "men",
  "women",
  "mens-tag",
  "womens-tag",
  "mixed-tag",
  "tag",
  "champions",
  "officials",
];
const NAME_COLLATOR = new Intl.Collator("en", {
  sensitivity: "base",
  numeric: true,
});

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
  { value: "champions", label: "Champions First" },
  { value: "record", label: "Win Rate" },
];

function isOfficial(wrestler: Wrestler): boolean {
  return (
    isReferee(wrestler) ||
    isManager(wrestler) ||
    isAnnouncer(wrestler) ||
    isCommentator(wrestler)
  );
}

function matchesTab(wrestler: Wrestler, tab: Tab): boolean {
  if (tab === "all") return true;
  if (tab === "men") return wrestler.gender === "men" && isSinglesWrestler(wrestler);
  if (tab === "women") return wrestler.gender === "women" && isSinglesWrestler(wrestler);
  if (tab === "mens-tag") return matchesTagTeamDivision(wrestler, "mens");
  if (tab === "womens-tag") return matchesTagTeamDivision(wrestler, "womens");
  if (tab === "mixed-tag") return matchesTagTeamDivision(wrestler, "mixed");
  if (tab === "tag") return isTagTeam(wrestler);
  if (tab === "champions") return isChampion(wrestler);
  return isOfficial(wrestler);
}

function sortProfiles(list: Wrestler[], sort: SortKey): Wrestler[] {
  const byName = (a: Wrestler, b: Wrestler) =>
    NAME_COLLATOR.compare(a.ringName || a.name, b.ringName || b.name);

  switch (sort) {
    case "za":
      return [...list].sort((a, b) => byName(b, a));
    case "champions":
      return [...list].sort(
        (a, b) => Number(isChampion(b)) - Number(isChampion(a)) || byName(a, b)
      );
    case "record":
      return [...list].sort(
        (a, b) =>
          getWinRate(b) - getWinRate(a) ||
          b.record.wins - a.record.wins ||
          byName(a, b)
      );
    default:
      return [...list].sort(byName);
  }
}

export function RosterDirectory() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("az");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadFilters();
    let tab: Tab = "all";
    if (saved.primary === "mens") tab = "mens-tag";
    else if (saved.primary === "womens") tab = "womens-tag";
    else if (saved.primary === "mixed") tab = "mixed-tag";
    else if (TAB_VALUES.includes(saved.primary as Tab)) {
      tab = saved.primary as Tab;
    }
    setTab(tab);
    setQuery(saved.search);
  }, []);

  const roster = useMemo(() => {
    const seen = new Set<string>();
    return wrestlers.filter((wrestler) => {
      if (seen.has(wrestler.id)) return false;
      seen.add(wrestler.id);
      return true;
    });
  }, []);

  const champions = useMemo(
    () => championships.filter((championship) => championship.currentChampion),
    []
  );

  const counts = useMemo(() => {
    const count = (predicate: (wrestler: Wrestler) => boolean) =>
      roster.filter(predicate).length;
    return {
      all: roster.length,
      men: count((w) => w.gender === "men" && isSinglesWrestler(w)),
      women: count((w) => w.gender === "women" && isSinglesWrestler(w)),
      "mens-tag": count((w) => matchesTagTeamDivision(w, "mens")),
      "womens-tag": count((w) => matchesTagTeamDivision(w, "womens")),
      "mixed-tag": count((w) => matchesTagTeamDivision(w, "mixed")),
      tag: count(isTagTeam),
      champions: count(isChampion),
      officials: count(isOfficial),
    };
  }, [roster]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "men", label: "Men", count: counts.men },
    { key: "women", label: "Women", count: counts.women },
    { key: "mens-tag", label: "Men's Tag", count: counts["mens-tag"] },
    { key: "womens-tag", label: "Women's Tag", count: counts["womens-tag"] },
    { key: "mixed-tag", label: "Couple Tag", count: counts["mixed-tag"] },
    { key: "tag", label: "All Tag Teams", count: counts.tag },
    { key: "champions", label: "Champions", count: counts.champions },
    { key: "officials", label: "Officials", count: counts.officials },
  ];

  const heroStats = [
    { label: "Total Profiles", value: counts.all },
    { label: "Men's Division", value: counts.men },
    { label: "Women's Division", value: counts.women },
    { label: "Tag Teams", value: counts.tag },
    { label: "Champions", value: counts.champions },
    { label: "Officials", value: counts.officials },
  ];

  const searchTerm = query.trim().toLowerCase();

  const sortedList = useMemo(() => {
    const filtered = roster.filter((wrestler) => {
      if (!matchesTab(wrestler, tab)) return false;
      if (!searchTerm) return true;
      return getSearchText(wrestler).includes(searchTerm);
    });
    return sortProfiles(filtered, sort);
  }, [roster, tab, searchTerm, sort]);

  const visibleProfiles = sortedList.slice(0, visibleCount);
  const hasMore = visibleCount < sortedList.length;

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    setIsLoading(false);
  }, [tab, searchTerm, sort]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const sentinel = loadMoreRef.current;
    if (!sentinel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setIsLoading(true);
        setVisibleCount((current) => Math.min(current + BATCH_SIZE, sortedList.length));
        window.setTimeout(() => setIsLoading(false), 300);
      },
      { rootMargin: "700px 0px" }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, sortedList.length, visibleCount, isLoading]);

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setVisibleCount((current) => Math.min(current + BATCH_SIZE, sortedList.length));
    window.setTimeout(() => setIsLoading(false), 300);
  };

  const applyFilters = (nextTab: Tab, nextQuery: string) => {
    setTab(nextTab);
    setQuery(nextQuery);
    try {
      const primary: RosterPrimaryFilter =
        nextTab === "mens-tag"
          ? "mens"
          : nextTab === "womens-tag"
            ? "womens"
            : nextTab === "mixed-tag"
              ? "mixed"
              : nextTab;
      saveFilters({ primary, role: "all", search: nextQuery });
    } catch {}
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    document
      .getElementById("roster-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reset = () => {
    applyFilters("all", "");
  };

  const hasActiveFilters = tab !== "all" || searchTerm.length > 0;

  return (
    <div className="bg-[#080808] text-white">
      <section className="im-cinematic relative overflow-hidden border-b border-white/10 py-14 sm:py-16 md:py-24">
        <div aria-hidden className="im-grid-lines absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute -right-[6%] top-0 h-full w-[50%] bg-[#991B1B]/20 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-14 right-0 select-none font-display text-[clamp(8rem,25vw,22rem)] font-black uppercase leading-none text-transparent opacity-[0.06] [-webkit-text-stroke:1px_#fff]"
        >
          Roster
        </div>

        <div className="container-wide relative">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-[2px] w-8 bg-[#C1272D]" />
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#DC2626] sm:text-[10px]">
              Indus Matworks
            </p>
          </div>

          <h1 className="mt-4 font-display text-[clamp(3rem,9vw,6.5rem)] font-black uppercase leading-[0.86] tracking-[-0.03em] text-white">
            The Roster
          </h1>

          <p className="mt-4 font-display text-lg font-semibold uppercase tracking-[0.02em] text-white/75 sm:text-2xl">
            The Athletes. The Personalities. The Fighters.
          </p>

          <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/55 sm:mt-5 sm:text-base">
            Meet the competitors representing Indus Matworks — explore profiles across every
            division and discover the athletes shaping the promotion.
          </p>

          <dl
            className="mt-10 grid max-w-4xl grid-cols-2 gap-px border border-white/12 bg-white/12 sm:grid-cols-3 lg:grid-cols-6"
            data-reveal
          >
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-[#0A0A0A] px-3 py-3.5 sm:px-4"
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
              >
                <dt className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/40 sm:text-[8px]">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-black leading-none text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {champions.length > 0 ? (
        <section
          aria-labelledby="champions-heading"
          className="border-b border-white/10 py-12 md:py-16"
        >
          <div className="container-wide">
            <div
              className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
              data-reveal
            >
              <div>
                <p className="im-eyebrow">Championship Division</p>
                <h2
                  id="champions-heading"
                  className="mt-2 font-display text-3xl font-black uppercase leading-none text-white sm:text-4xl lg:text-5xl"
                >
                  Reigning Champions
                </h2>
              </div>
              <Link
                href="/championships"
                className="im-underline-link w-fit font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white sm:text-[10px]"
              >
                All Championships
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
              {champions.map((championship, index) => {
                const champion = championship.currentChampion!;
                const champWrestler = roster.find((w) => w.id === champion.wrestlerId);

                if (!champWrestler) return null;

                return (
                  <Link
                    key={championship.id}
                    href={`/roster/${champion.wrestlerId}`}
                    className="group relative block outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                    data-reveal
                    style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as CSSProperties}
                  >
                    <article className="relative overflow-hidden border border-[#D4AF37]/25 bg-[#0A0A0A] transition-[border-color,transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-[#D4AF37]/70 group-hover:shadow-[0_28px_60px_-32px_rgba(212,175,55,0.35)]">
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 z-[3] h-full w-[3px] origin-top scale-y-[0.32] bg-gradient-to-b from-[#E7C65A] via-[#D4AF37]/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                      />
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#101010]">
                        <WrestlerPortrait
                          wrestler={champWrestler}
                          mask="none"
                          priority
                          sizes="(max-width:639px) 46vw, (max-width:1279px) 50vw, 33vw"
                          className="h-full w-full scale-[1.01] object-cover object-top grayscale-[0.15] brightness-[0.96] transition-[transform,filter] duration-[650ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-100"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.4)_0%,transparent_30%,transparent_52%,rgba(8,8,8,0.96)_100%)]"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_100%,rgba(212,175,55,0.16),transparent_70%)]"
                        />
                        {championship.image ? (
                          <div className="absolute right-2.5 top-2.5 h-9 w-[70px] sm:h-11 sm:w-[88px]">
                            <Image
                              src={championship.image}
                              alt=""
                              fill
                              sizes="88px"
                              className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
                            />
                          </div>
                        ) : null}
                        <div className="absolute inset-x-0 bottom-0 p-3 pr-4 sm:p-4 sm:pr-5">
                          <p className="inline-flex items-center gap-1.5 border border-[#D4AF37]/50 bg-black/70 px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-[#E7C65A] backdrop-blur-sm sm:text-[8px]">
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                              <path d="M5 0l1.3 3.4H10L7.2 5.5l1 3.5L5 7 1.8 9l1-3.5L0 3.4h3.7z" />
                            </svg>
                            {championship.shortName} Champion
                          </p>
                          <h3 className="mt-1.5 line-clamp-2 break-words font-display text-[clamp(1.05rem,0.7vw+0.8rem,1.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-white transition-[transform,color] duration-300 ease-out group-hover:translate-x-1 group-hover:text-[#E7C65A]">
                            {champion.wrestler}
                          </h3>
                          {champion.nickname ? (
                            <p className="mt-1 line-clamp-1 font-body text-[10px] text-white/55 transition-colors duration-300 group-hover:text-white/75 sm:text-[11px]">
                              {champion.nickname}
                            </p>
                          ) : null}
                        </div>
                        <div
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.28] bg-[#D4AF37] transition-transform duration-300 ease-out group-hover:scale-x-100"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 border-t border-[#D4AF37]/15 bg-[#0C0C0C] px-3 py-2.5 sm:px-4 sm:py-3">
                        <span className="truncate font-mono text-[8px] uppercase tracking-[0.12em] text-white/45 sm:text-[9px]">
                          {championship.daysHeld} days · {championship.defenses} defenses
                        </span>
                        <span
                          aria-hidden
                          className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#D4AF37]/30 font-mono text-[11px] text-white/60 transition-[background-color,border-color,color] duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080808]"
                        >
                          →
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="all-roster-heading" className="pb-16 md:pb-20 lg:pb-24">
        <div className="container-wide pb-8 pt-12 md:pb-10 md:pt-16">
          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <div>
              <p className="im-eyebrow">Talent Directory</p>
              <h2
                id="all-roster-heading"
                className="mt-2 font-display text-3xl font-black uppercase leading-none text-white sm:text-4xl lg:text-5xl"
              >
                All Competitors
              </h2>
            </div>
            <p className="max-w-sm font-body text-sm leading-6 text-white/50">
              {counts.all} profiles across every division — filter, search and sort the
              directory to find your fighter.
            </p>
          </div>
        </div>

        <div
          id="roster-filters"
          className="sticky top-16 z-40 border-b border-white/10 bg-[#080808]/95 backdrop-blur-md sm:top-[102px]"
        >
          <div className="container-wide py-3 md:py-3.5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
              <div className="im-scroll-x min-w-0" role="group" aria-label="Roster categories">
                {tabs.map((item) => {
                  const active = tab === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={active}
                      aria-controls="roster-grid"
                      onClick={() => applyFilters(item.key, query)}
                      className={cn(
                        "shrink-0 border px-3.5 py-2.5 font-display text-[12px] font-bold uppercase tracking-[0.06em] transition-colors",
                        active
                          ? "border-[#C1272D] bg-[#C1272D] text-white"
                          : "border-white/15 bg-transparent text-white/65 hover:border-white/40 hover:text-white"
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "ml-1.5 font-mono text-[9px]",
                          active ? "text-white/80" : "text-white/40"
                        )}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={onSubmit} className="flex flex-1 gap-2 lg:flex-none lg:justify-end">
                <div className="relative min-w-0 flex-1 lg:w-64 lg:flex-none">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <label htmlFor="roster-search" className="sr-only">
                    Search roster by name or nickname
                  </label>
                  <input
                    id="roster-search"
                    type="search"
                    value={query}
                    onChange={(event) => applyFilters(tab, event.target.value)}
                    placeholder="Search name or nickname…"
                    className="min-h-11 w-full border border-white/15 bg-white/[0.04] py-2.5 pl-9 pr-9 font-body text-sm text-white placeholder:text-white/35 focus:border-[#C1272D] focus:outline-none focus:ring-1 focus:ring-[#C1272D]/30 [&::-webkit-search-cancel-button]:hidden"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => applyFilters(tab, "")}
                      aria-label="Clear search"
                      className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-white/50 transition-colors hover:text-white"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                        <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  ) : null}
                </div>

                <div className="relative shrink-0">
                  <label htmlFor="roster-sort" className="sr-only">
                    Sort roster
                  </label>
                  <select
                    id="roster-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortKey)}
                    className="min-h-11 cursor-pointer appearance-none border border-white/15 bg-white/[0.04] py-2.5 pl-3.5 pr-8 font-display text-[12px] font-bold uppercase tracking-[0.06em] text-white/80 transition-colors hover:border-white/40 focus:border-[#C1272D] focus:outline-none"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#141414]">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50"
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </div>
              </form>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45 sm:text-[10px]"
                aria-live="polite"
              >
                {sortedList.length
                  ? `Showing ${visibleProfiles.length} of ${sortedList.length} profile${sortedList.length === 1 ? "" : "s"}`
                  : "No profiles match the current filters"}
                {searchTerm ? ` for “${query.trim()}”` : ""}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#DC2626] transition-colors hover:text-white sm:text-[10px]"
                >
                  Clear Filters ✕
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="container-wide pt-6 md:pt-8">
          {sortedList.length ? (
            <>
              <div
                id="roster-grid"
                key={tab}
                className="grid scroll-mt-56 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 sm:scroll-mt-[240px] md:grid-cols-4 md:gap-5 xl:grid-cols-5"
              >
                {visibleProfiles.map((wrestler, index) => (
                  <RosterCard
                    key={wrestler.id}
                    wrestler={wrestler}
                    priority={index < 5}
                    className="im-stagger"
                    style={
                      { "--im-stagger": `${Math.min(index, 12) * 45}ms` } as CSSProperties
                    }
                  />
                ))}
              </div>

              {hasMore ? (
                <div
                  ref={loadMoreRef}
                  className="mt-10 border-t border-white/10 pt-8"
                >
                  {isLoading ? (
                    <div
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 xl:grid-cols-5"
                      aria-hidden="true"
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.06] bg-[#101010]">
                            <div className="absolute inset-x-3 bottom-3 space-y-2">
                              <div className="h-[2px] w-6 bg-white/10" />
                              <div className="h-4 w-3/4 bg-white/[0.06]" />
                              <div className="h-2 w-1/2 bg-white/[0.04]" />
                            </div>
                          </div>
                          <div className="mt-px flex h-[62px] items-center justify-between border border-t-0 border-white/[0.06] bg-white/[0.02] px-3.5">
                            <div className="w-2/3 space-y-1.5">
                              <div className="h-2 w-16 bg-white/[0.06]" />
                              <div className="h-2.5 w-20 bg-white/[0.05]" />
                            </div>
                            <div className="h-8 w-8 border border-white/[0.06] bg-white/[0.03]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                        {sortedList.length - visibleProfiles.length} more profile
                        {sortedList.length - visibleProfiles.length === 1 ? "" : "s"} below
                      </p>
                      <button
                        type="button"
                        onClick={loadMore}
                        className="min-h-11 border border-white/20 bg-transparent px-5 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#C1272D] hover:bg-[#C1272D]"
                      >
                        Load More Profiles
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
                  <span aria-hidden className="h-px flex-1 bg-white/10" />
                  <p className="shrink-0 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-white/45 sm:text-[9px]">
                    End of roster · all {sortedList.length} profile{sortedList.length === 1 ? "" : "s"} shown
                  </p>
                  <span aria-hidden className="h-px flex-1 bg-white/10" />
                </div>
              )}
            </>
          ) : (
            <div className="border border-white/10 bg-[#0A0A0A] p-12 text-center sm:p-16">
              <p className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                No profiles found
              </p>
              <p className="mt-3 font-body text-sm text-white/55 sm:text-base">
                Try a different name or clear the current filters.
              </p>
              <button
                type="button"
                onClick={reset}
                className="im-btn im-btn-red mt-7"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
