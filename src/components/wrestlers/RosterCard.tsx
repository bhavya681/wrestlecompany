"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";
import {
  getDivisionLabel,
  getFlagEmoji,
  getRecord,
  getWinRate,
  hasValue,
  isChampion,
} from "@/lib/roster";
import type { Wrestler } from "@/types";

interface RosterCardProps {
  wrestler: Wrestler;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
}

const DEFAULT_SIZES =
  "(max-width: 639px) 46vw, (max-width: 767px) 31vw, (max-width: 1279px) 24vw, 20vw";

export function RosterCard({
  wrestler,
  priority = false,
  className,
  style,
  sizes = DEFAULT_SIZES,
}: RosterCardProps) {
  const champion = isChampion(wrestler);
  const flag = getFlagEmoji(wrestler);
  const divisionLabel = getDivisionLabel(wrestler);
  const { wins, losses, draws, total } = getRecord(wrestler);
  const winRate = getWinRate(wrestler);
  const subtitle = wrestler.members?.length
    ? wrestler.members.join(" · ")
    : wrestler.nickname;

  return (
    <Link
      href={`/roster/${wrestler.id}`}
      aria-label={`View ${wrestler.ringName}${champion ? ", current champion" : ""} profile`}
      style={style}
      className={cn(
        "group relative block outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#C1272D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]",
        className
      )}
    >
      <article
        className={cn(
          "relative overflow-hidden border bg-[#0A0A0A] transition-[border-color,transform,box-shadow] duration-300 ease-out",
          "group-hover:-translate-y-1",
          champion
            ? "border-[#D4AF37]/30 group-hover:border-[#D4AF37]/70 group-hover:shadow-[0_28px_60px_-32px_rgba(212,175,55,0.35)]"
            : "border-white/[0.08] group-hover:border-[#C1272D]/60 group-hover:shadow-[0_28px_60px_-32px_rgba(193,39,45,0.4)]"
        )}
      >
        {/* Vertical accent edge */}
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-0 z-[3] h-full w-[3px] origin-top scale-y-[0.32] transition-transform duration-500 ease-out group-hover:scale-y-100",
            champion
              ? "bg-gradient-to-b from-[#E7C65A] via-[#D4AF37]/60 to-transparent"
              : "bg-gradient-to-b from-[#C1272D] via-[#C1272D]/60 to-transparent"
          )}
        />

        {/* Portrait */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#101010]">
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 z-[1]",
              champion
                ? "bg-[radial-gradient(90%_60%_at_50%_100%,rgba(212,175,55,0.17),transparent_70%)]"
                : "bg-[radial-gradient(90%_60%_at_50%_100%,rgba(193,39,45,0.2),transparent_70%)]"
            )}
          />
          <WrestlerPortrait
            wrestler={wrestler}
            mask="poster"
            priority={priority}
            sizes={sizes}
            className="h-full w-full scale-[1.01] object-cover object-top grayscale-[0.28] contrast-[1.04] brightness-[0.96] transition-[transform,filter] duration-[650ms] ease-out group-hover:scale-[1.07] group-hover:grayscale-0 group-hover:brightness-100"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,8,8,0.5)_0%,transparent_28%,transparent_50%,rgba(8,8,8,0.96)_100%)]"
          />
          {/* Hover tint wash */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
              champion
                ? "bg-[radial-gradient(120%_90%_at_50%_100%,rgba(212,175,55,0.14),transparent_60%)]"
                : "bg-[radial-gradient(120%_90%_at_50%_100%,rgba(193,39,45,0.16),transparent_60%)]"
            )}
          />

          {/* Top meta chips */}
          <div className="absolute inset-x-0 top-0 z-[2] flex items-start justify-between gap-2 p-2.5 sm:p-3">
            <span className="max-w-[62%] truncate border border-white/15 bg-black/60 px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm sm:px-2 sm:py-1 sm:text-[8px]">
              {divisionLabel}
            </span>
            {champion ? (
              <span className="inline-flex shrink-0 items-center gap-1 border border-[#D4AF37]/50 bg-black/70 px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-[#E7C65A] shadow-[0_0_16px_rgba(212,175,55,0.25)] backdrop-blur-sm sm:px-2 sm:py-1 sm:text-[8px]">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                  <path d="M5 0l1.3 3.4H10L7.2 5.5l1 3.5L5 7 1.8 9l1-3.5L0 3.4h3.7z" />
                </svg>
                Champion
              </span>
            ) : flag ? (
              <span
                aria-label={`Billed from ${wrestler.from}`}
                className="shrink-0 border border-white/15 bg-black/60 px-1.5 py-0.5 text-[10px] leading-4 backdrop-blur-sm sm:px-2 sm:text-[11px]"
              >
                {flag}
              </span>
            ) : null}
          </div>

          {/* Bottom name block */}
          <div className="absolute inset-x-0 bottom-0 z-[2] p-3 pr-4 sm:p-3.5 sm:pr-5">
            <span
              aria-hidden
              className={cn(
                "mb-1.5 block h-[2px] w-6 transition-[width] duration-500 ease-out group-hover:w-11",
                champion ? "bg-[#D4AF37]" : "bg-[#C1272D]"
              )}
            />
            <h3
              className={cn(
                "line-clamp-2 break-words font-display text-[clamp(0.95rem,0.55vw+0.75rem,1.3rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-white transition-[transform,color] duration-300 ease-out group-hover:translate-x-1",
                champion ? "group-hover:text-[#E7C65A]" : "group-hover:text-[#FF4B52]"
              )}
            >
              {wrestler.ringName}
            </h3>
            {subtitle ? (
              <p className="mt-1 line-clamp-1 font-body text-[10px] leading-4 text-white/55 transition-colors duration-300 group-hover:text-white/75 sm:text-[11px]">
                {subtitle}
              </p>
            ) : null}
          </div>

          {/* Bottom accent underline */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-x-0 bottom-0 z-[2] h-[3px] origin-left scale-x-[0.22] transition-transform duration-300 ease-out group-hover:scale-x-100",
              champion ? "bg-[#D4AF37]" : "bg-[#C1272D]"
            )}
          />
        </div>

        {/* Stats footer */}
        <div className="relative flex items-center justify-between gap-2.5 border-t border-white/[0.07] bg-[#0C0C0C] px-3 py-2.5 sm:px-3.5 sm:py-3">
          <div className="min-w-0 flex-1">
            {total > 0 ? (
              <>
                <div className="flex items-baseline justify-between gap-2">
                  <p
                    className={cn(
                      "font-mono text-[7px] font-bold uppercase tracking-[0.18em] sm:text-[8px]",
                      champion ? "text-[#E7C65A]/70" : "text-white/40"
                    )}
                  >
                    Career Record
                  </p>
                  <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/35 sm:text-[8px]">
                    {total} match{total === 1 ? "" : "es"}
                  </p>
                </div>
                <p className="mt-1 truncate font-mono text-[10px] font-bold text-white/90 sm:text-[11px]">
                  {wins}W–{losses}L–{draws}D
                  <span
                    className={cn(
                      "ml-1.5 font-display text-[11px] sm:text-xs",
                      champion ? "text-[#E7C65A]" : "text-[#DC2626]"
                    )}
                  >
                    {winRate}%
                  </span>
                </p>
                <div
                  aria-hidden
                  className="mt-2 h-[2px] w-full overflow-hidden bg-white/[0.08]"
                >
                  <div
                    className={cn(
                      "h-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100",
                      champion
                        ? "bg-gradient-to-r from-[#8C6D1F] to-[#E7C65A]"
                        : "bg-gradient-to-r from-[#991B1B] to-[#DC2626]"
                    )}
                    style={{ width: `${Math.min(winRate, 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <p
                  className={cn(
                    "font-mono text-[7px] font-bold uppercase tracking-[0.18em] sm:text-[8px]",
                    champion ? "text-[#E7C65A]/70" : "text-white/40"
                  )}
                >
                  {divisionLabel}
                </p>
                <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.1em] text-white/60 sm:text-[10px]">
                  {hasValue(wrestler.debut) ? `Since ${wrestler.debut}` : wrestler.status}
                </p>
              </>
            )}
          </div>

          {/* Profile CTA */}
          <span
            aria-hidden
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-[11px] transition-[background-color,border-color,color,transform] duration-300",
              champion
                ? "border-[#D4AF37]/30 text-white/60 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080808]"
                : "border-white/12 text-white/60 group-hover:border-[#C1272D] group-hover:bg-[#C1272D] group-hover:text-white"
            )}
          >
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
