import Link from "next/link";
import { Badge, RatingStars } from "@/components/ui";
import { getMatchTypeLabel, formatDateShort, cn } from "@/lib/utils";
import type { Match, Wrestler } from "@/types";

interface ResultCardProps {
  match: Match;
  wrestlers: Wrestler[];
  expanded?: boolean;
}

function normalizeImage(source?: string | null): string | null {
  if (!source) return null;
  let val = source.trim();
  const mdMatch = val.match(/^\[.*?\]\((.*?)\)$/);
  if (mdMatch?.[1]) val = mdMatch[1].trim();
  return val.replace(/^["']|["']$/g, "") || null;
}

function findWrestler(id: string, name: string, wrestlers: Wrestler[]): Wrestler | undefined {
  if (!wrestlers || wrestlers.length === 0) return undefined;
  const byId = wrestlers.find(
    (w) => w.id?.toLowerCase() === id?.toLowerCase()
  );
  if (byId) return byId;

  const cleanName = name?.toLowerCase().trim();
  if (!cleanName) return undefined;

  return wrestlers.find(
    (w) =>
      w.name?.toLowerCase().trim() === cleanName ||
      w.ringName?.toLowerCase().trim() === cleanName ||
      w.ringName?.toLowerCase().includes(cleanName) ||
      cleanName.includes(w.ringName?.toLowerCase())
  );
}

export function ResultCard({
  match,
  wrestlers,
  expanded = false,
}: ResultCardProps) {
  const winnerId = match.result?.winner || "";
  const c1 = match.competitors[0];
  const c2 = match.competitors[1];

  const w1 = findWrestler(c1?.wrestlerId, c1?.wrestler, wrestlers);
  const w2 = findWrestler(c2?.wrestlerId, c2?.wrestler, wrestlers);

  const w1Img = normalizeImage(w1?.imageFull || w1?.image);
  const w2Img = normalizeImage(w2?.imageFull || w2?.image);

  const w1IsWinner =
    Boolean(winnerId) &&
    (winnerId === c1?.wrestlerId || winnerId === w1?.id);
  const w2IsWinner =
    Boolean(winnerId) &&
    (winnerId === c2?.wrestlerId || winnerId === w2?.id);
  const isDraw = winnerId === "draw";

  return (
    <div className="group relative overflow-hidden border border-border bg-background transition-all duration-500 hover:border-accent-red/50 hover:shadow-xl hover:shadow-black/40 mb-5">
      {/* ── BACKGROUND WRESTLER PHOTOGRAPHY DUAL DISPLAY ── */}
      <div className="pointer-events-none absolute inset-0 flex">
        {/* Left Competitor side */}
        <div className="relative flex-1 overflow-hidden">
          {w1Img ? (
            <img
              src={w1Img}
              alt={c1?.wrestler || "Competitor 1"}
              className={cn(
                "h-full w-full object-cover object-top transition-all duration-700",
                w1IsWinner
                  ? "scale-105 opacity-30 contrast-125 saturate-125"
                  : isDraw
                    ? "opacity-25 saturate-75"
                    : "opacity-15 grayscale brightness-50 contrast-75"
              )}
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-background-secondary/60 to-transparent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          {w1IsWinner && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-accent-gold/10 via-transparent to-transparent" />
          )}
        </div>

        {/* Right Competitor side */}
        <div className="relative flex-1 overflow-hidden">
          {w2Img ? (
            <img
              src={w2Img}
              alt={c2?.wrestler || "Competitor 2"}
              className={cn(
                "h-full w-full object-cover object-top transition-all duration-700",
                w2IsWinner
                  ? "scale-105 opacity-30 contrast-125 saturate-125"
                  : isDraw
                    ? "opacity-25 saturate-75"
                    : "opacity-15 grayscale brightness-50 contrast-75"
              )}
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-l from-background-secondary/60 to-transparent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          {w2IsWinner && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-accent-gold/10 via-transparent to-transparent" />
          )}
        </div>
      </div>

      {/* Subtle scanline / grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* ── CARD CONTENT ── */}
      <div className="relative z-10 flex flex-col p-5 sm:p-6 md:p-8">
        {/* Top Header: Event Name, Championship & Date */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-accent-red/40 bg-accent-red/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-accent-red">
              {match.eventName}
            </span>
            {match.championship && (
              <span className="border border-accent-gold/40 bg-accent-gold/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-accent-gold">
                🏆 {match.championship.replace("im-", "").replace(/-/g, " ").toUpperCase()}
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
              {match.city}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-muted">
            <svg className="h-3.5 w-3.5 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{formatDateShort(match.date)}</span>
          </div>
        </div>

        {/* ── COMPETITORS ROW ── */}
        <div className="my-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
          {/* Competitor 1 */}
          <div className="flex items-center gap-4 sm:flex-row">
            {/* Athlete avatar thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-background-secondary shadow-md sm:h-20 sm:w-20">
              {w1Img ? (
                <img
                  src={w1Img}
                  alt={c1?.wrestler}
                  className={cn(
                    "h-full w-full object-cover object-top",
                    !w1IsWinner && !isDraw && "grayscale brightness-75"
                  )}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-xl font-black text-foreground-muted">
                  {c1?.wrestler?.charAt(0) || "W"}
                </div>
              )}
              {w1IsWinner && (
                <div className="absolute inset-x-0 bottom-0 bg-accent-gold py-0.5 text-center font-mono text-[7px] font-black uppercase tracking-widest text-background">
                  WINNER
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className={cn(
                    "font-mono text-[9px] font-black uppercase tracking-[0.22em]",
                    w1IsWinner
                      ? "text-accent-gold"
                      : isDraw
                        ? "text-foreground-muted"
                        : "text-foreground-muted/60"
                  )}
                >
                  {w1IsWinner ? "★ DECISIVE WINNER" : isDraw ? "DRAW" : "DEFEATED"}
                </span>
              </div>
              <h3
                className={cn(
                  "truncate font-display text-2xl font-black uppercase tracking-tight sm:text-3xl",
                  w1IsWinner ? "text-foreground" : "text-foreground/80"
                )}
              >
                {w1?.id ? (
                  <Link
                    href={`/roster/${w1.id}`}
                    className="transition-colors hover:text-accent-red"
                  >
                    {w1.ringName || c1?.wrestler}
                  </Link>
                ) : (
                  c1?.wrestler
                )}
              </h3>
              {w1?.nickname && (
                <p className="truncate font-body text-xs text-foreground-muted">
                  &ldquo;{w1.nickname}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Center VS Indicator */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-black tracking-widest text-accent-red/40 sm:text-3xl">
              VS
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-foreground-muted/60">
              {getMatchTypeLabel(match.type)}
            </span>
          </div>

          {/* Competitor 2 */}
          <div className="flex items-center justify-end gap-4 text-right sm:flex-row-reverse">
            {/* Athlete avatar thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-background-secondary shadow-md sm:h-20 sm:w-20">
              {w2Img ? (
                <img
                  src={w2Img}
                  alt={c2?.wrestler}
                  className={cn(
                    "h-full w-full object-cover object-top",
                    !w2IsWinner && !isDraw && "grayscale brightness-75"
                  )}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-xl font-black text-foreground-muted">
                  {c2?.wrestler?.charAt(0) || "W"}
                </div>
              )}
              {w2IsWinner && (
                <div className="absolute inset-x-0 bottom-0 bg-accent-gold py-0.5 text-center font-mono text-[7px] font-black uppercase tracking-widest text-background">
                  WINNER
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex items-center justify-end gap-2">
                <span
                  className={cn(
                    "font-mono text-[9px] font-black uppercase tracking-[0.22em]",
                    w2IsWinner
                      ? "text-accent-gold"
                      : isDraw
                        ? "text-foreground-muted"
                        : "text-foreground-muted/60"
                  )}
                >
                  {w2IsWinner ? "★ DECISIVE WINNER" : isDraw ? "DRAW" : "DEFEATED"}
                </span>
              </div>
              <h3
                className={cn(
                  "truncate font-display text-2xl font-black uppercase tracking-tight sm:text-3xl",
                  w2IsWinner ? "text-foreground" : "text-foreground/80"
                )}
              >
                {w2?.id ? (
                  <Link
                    href={`/roster/${w2.id}`}
                    className="transition-colors hover:text-accent-red"
                  >
                    {w2.ringName || c2?.wrestler}
                  </Link>
                ) : (
                  c2?.wrestler
                )}
              </h3>
              {w2?.nickname && (
                <p className="truncate font-body text-xs text-foreground-muted">
                  &ldquo;{w2.nickname}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description (if provided) */}
        {match.description && expanded && (
          <p className="my-2 border-l-2 border-accent-red/40 bg-background-secondary/30 px-3 py-2 font-body text-xs leading-relaxed text-foreground-muted">
            {match.description}
          </p>
        )}

        {/* ── FOOTER: OFFICIAL DECISION DETAILS ── */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
            {match.result?.method && (
              <span>
                Method: <strong className="text-foreground">{match.result.method}</strong>
              </span>
            )}
            {match.result?.time && (
              <>
                <span className="text-border-light">•</span>
                <span>
                  Time: <strong className="text-foreground">{match.result.time}</strong>
                </span>
              </>
            )}
            <span className="text-border-light">•</span>
            <span>
              Type: <strong className="text-foreground">{getMatchTypeLabel(match.type)}</strong>
            </span>
          </div>

          {match.rating ? (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-muted">
                Match Rating
              </span>
              <RatingStars rating={match.rating} size="sm" />
            </div>
          ) : null}
        </div>
      </div>

      {/* Accent edge highlight */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 h-0.5",
          w1IsWinner || w2IsWinner
            ? "bg-gradient-to-r from-accent-red via-accent-gold to-accent-red"
            : "bg-border"
        )}
      />
    </div>
  );
}
