import Image from "next/image";
import { Badge, RatingStars } from "@/components/ui";
import { getMatchTypeLabel } from "@/lib/utils";
import type { Match, Wrestler } from "@/types";

interface ResultCardProps {
  match: Match;
  wrestlers: Wrestler[];
  expanded?: boolean;
}

export function ResultCard({
  match,
  wrestlers,
  expanded = false,
}: ResultCardProps) {
  const winner =
    match.result.winner !== "draw"
      ? wrestlers.find((w) => w.id === match.result.winner)
      : null;

  return (
    <div className="border-b border-border last:border-0">
      <div className="flex flex-col gap-3 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="default" size="sm">
            {match.eventName}
          </Badge>
          {match.championship && (
            <Badge variant="gold" size="sm">
              {match.championship.replace("im-", "").replace(/-/g, " ")}
            </Badge>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-lg font-bold text-foreground">
              {match.competitors[0].wrestler}
            </span>
            <span className="font-display text-2xl font-black text-accent-red">
              DEFEATED
            </span>
            <span className="font-display text-lg font-bold text-foreground">
              {match.competitors[1].wrestler}
            </span>
          </div>

          {winner && (
            <Badge variant="gold" size="sm">
              Winner: {winner.name} via {match.result.method}
            </Badge>
          )}
          {match.result.winner === "draw" && (
            <Badge variant="default" size="sm">
              DRAW
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-sm text-foreground-muted">
          <span>MATCH TIME: {match.result.time}</span>
          <span>MATCH TYPE: {getMatchTypeLabel(match.type)}</span>
          {match.rating && (
            <span className="flex items-center gap-1">
              <RatingStars rating={match.rating} size="sm" />
            </span>
          )}
        </div>

        {expanded && (
          <div className="mt-4 flex items-center justify-center gap-8">
            {match.competitors.map((c) => {
              const w = wrestlers.find((x) => x.id === c.wrestlerId);
              return (
                <div key={c.wrestlerId} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden">
                    <Image
                      src={w?.image || ""}
                      alt={c.wrestler}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-display text-sm font-bold text-foreground">
                      {c.wrestler}
                    </p>
                    <p className="font-body text-xs text-foreground-muted">
                      {w?.record.wins}W - {w?.record.losses}L -{" "}
                      {w?.record.draws}D
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!expanded && (
          <button
            type="button"
            className="mt-1 self-center font-body text-xs text-foreground-muted hover:text-accent-red"
            aria-expanded={expanded}
          >
            <span className="flex items-center gap-1">
              Show Details
              <ChevronDownIcon />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M6 9 L12 15 L18 9" />
    </svg>
  );
}
