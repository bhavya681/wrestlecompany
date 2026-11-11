"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { RosterCard } from "@/components/wrestlers/RosterCard";
import type { Wrestler } from "@/types";

interface FeaturedSuperstarsProps {
  wrestlers: Wrestler[];
}

export function FeaturedSuperstars({ wrestlers }: FeaturedSuperstarsProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    setCanScrollPrev(rail.scrollLeft > 8);
    setCanScrollNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState, wrestlers.length]);

  if (!wrestlers.length) return null;

  const scroll = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const firstCard = rail.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 288;
    const gap = parseFloat(window.getComputedStyle(rail).columnGap || "16") || 16;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    rail.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4" data-reveal>
        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--im-muted)] sm:text-[9px]">
          Swipe or use the arrows to explore
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollPrev}
            aria-label="Scroll featured superstars left"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center border font-mono text-sm transition-colors",
              canScrollPrev
                ? "border-[var(--im-border)] bg-[var(--im-page)] text-[var(--im-ink)] hover:border-[#C1272D] hover:text-[#C1272D]"
                : "cursor-not-allowed border-[var(--im-border)] bg-[var(--im-surface)] text-[var(--im-muted)] opacity-40"
            )}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollNext}
            aria-label="Scroll featured superstars right"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center border font-mono text-sm transition-colors",
              canScrollNext
                ? "border-[var(--im-border)] bg-[var(--im-page)] text-[var(--im-ink)] hover:border-[#C1272D] hover:text-[#C1272D]"
                : "cursor-not-allowed border-[var(--im-border)] bg-[var(--im-surface)] text-[var(--im-muted)] opacity-40"
            )}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        role="region"
        aria-label="Featured superstars"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scroll(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scroll(1);
          }
        }}
        className={cn(
          "im-roster-rail -mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-3 pb-3",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1272D] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--im-page)]",
          "sm:mx-0 sm:px-0"
        )}
        data-reveal
      >
        {wrestlers.map((wrestler, index) => (
          <div
            key={wrestler.id}
            className="w-[232px] shrink-0 snap-start min-[380px]:w-[252px] sm:w-[284px] lg:w-[306px] xl:w-[324px]"
          >
            <RosterCard
              wrestler={wrestler}
              priority={index < 2}
              sizes="(min-width: 1280px) 324px, (min-width: 1024px) 306px, (min-width: 640px) 284px, (min-width: 380px) 252px, 232px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
