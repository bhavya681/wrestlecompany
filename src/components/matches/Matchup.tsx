import Image from "next/image";
import { Badge, RatingStars } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Match, Wrestler } from "@/types";

interface MatchupProps {
  match: Match;
  wrestlers: Wrestler[];
  variant?: "default" | "compact";
}

export function Matchup({
  match,
  wrestlers,
  variant = "default",
}: MatchupProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center justify-center gap-2 font-body text-sm uppercase">
        <span className="text-foreground-muted">
          {match.competitors[0].wrestler}
        </span>
        <span className="font-bold text-accent-red">VS</span>
        <span className="text-foreground-muted">
          {match.competitors[1].wrestler}
        </span>
      </div>
    );
  }

  const w1 = wrestlers.find((w) => w.id === match.competitors[0].wrestlerId);
  const w2 = wrestlers.find((w) => w.id === match.competitors[1].wrestlerId);

  const displayName = (w: Wrestler | undefined) =>
    w ? w.name : match.competitors[0].wrestler;

  return (
    <div className="relative w-full max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-0">
        {/* Wrestler 1 */}
        <div className="text-center">
          <div className="group relative mx-auto mb-2 overflow-hidden shadow-2xl shadow-black/50">
            <div className="relative aspect-[3/4] w-36 overflow-hidden md:w-48">
              <Image
                src={w1?.imageFull || w1?.image || ""}
                alt={displayName(w1)}
                fill
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <h3 className="font-display text-2xl font-bold tracking-wider text-foreground">
            {displayName(w1)}
          </h3>
          {w1 && <p className="font-body text-sm text-foreground-muted">{w1.nickname}</p>}
        </div>

        {/* VS / Event Info */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="relative py-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border-2 border-accent-red/20" />
              </div>
              <span className="relative font-display text-5xl font-black tracking-[0.2em] text-accent-red uppercase">
                VS
              </span>
            </div>
          </div>

          <div className="font-body text-center text-xs text-foreground-muted">
            {match.championship && (
              <Badge variant="gold" size="sm">
                {match.championship.replace("im-", "").replace("-", " ")}
              </Badge>
            )}
            {!match.championship && (
              <Badge variant="default" size="sm">
                {match.type.replace("-", " ").toUpperCase()}
              </Badge>
            )}
          </div>

          {match.rating && match.rating > 0 && (
            <RatingStars rating={match.rating} size="sm" />
          )}
        </div>

        {/* Wrestler 2 */}
        <div className="text-center">
          <div className="group relative mx-auto mb-2 overflow-hidden shadow-2xl shadow-black/50">
            <div className="relative aspect-[3/4] w-36 overflow-hidden md:w-48">
              <Image
                src={w2?.imageFull || w2?.image || ""}
                alt={displayName(w2)}
                fill
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
          <h3 className="font-display text-2xl font-bold tracking-wider text-foreground">
            {displayName(w2)}
          </h3>
          {w2 && <p className="font-body text-sm text-foreground-muted">{w2.nickname}</p>}
        </div>
      </div>
    </div>
  );
}

interface MatchupStatsProps {
  match: Match;
  wrestlers: Wrestler[];
}

export function MatchupStats({ match, wrestlers }: MatchupStatsProps) {
  const w1 = wrestlers.find((w) => w.id === match.competitors[0].wrestlerId);
  const w2 = wrestlers.find((w) => w.id === match.competitors[1].wrestlerId);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
      {w1 && <WrestlerStats wrestler={w1} />}
      <div className="flex items-center justify-center">
        <span className="font-display text-3xl font-black text-accent-red">VS</span>
      </div>
      {w2 && <WrestlerStats wrestler={w2} reverse />}
    </div>
  );
}

function WrestlerStats({
  wrestler,
  reverse = false,
}: {
  wrestler: Wrestler;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2",
        reverse && "md:flex-row-reverse"
      )}
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden">
        <Image
          src={wrestler.image}
          alt={wrestler.name}
          fill
          className="object-cover grayscale"
        />
      </div>
      <div className="text-center md:text-left">
        <h4 className="font-display text-lg font-bold text-foreground">
          {wrestler.name}
        </h4>
        <p className="font-body text-xs text-foreground-muted">
          {wrestler.nickname}
        </p>
        <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 font-mono text-xs text-foreground-muted">
          <span>HEIGHT:</span>
          <span className="text-foreground">{wrestler.height}</span>
          <span>WEIGHT:</span>
          <span className="text-foreground">{wrestler.weight}</span>
          <span>STYLE:</span>
          <span className="text-foreground">{wrestler.style.split(" / ")[0]}</span>
          <span>RECORD:</span>
          <span className="text-foreground">
            {wrestler.record.wins}-{wrestler.record.losses}-{wrestler.record.draws}
          </span>
        </div>
      </div>
    </div>
  );
}
