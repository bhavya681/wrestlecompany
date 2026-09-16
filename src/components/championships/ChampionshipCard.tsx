import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Championship } from "@/types";

interface ChampionshipCardProps {
  championship: Championship;
  variant?: "default" | "compact";
  onClick?: () => void;
}

export function ChampionshipCard({
  championship,
  variant = "default",
  onClick,
}: ChampionshipCardProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "group relative flex items-center gap-4 border border-border bg-background-secondary p-4 transition-all duration-300 hover:border-accent-red/40",
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      >
        {/* Belt image */}
        <div className="flex h-16 w-20 shrink-0 items-center justify-center">
          <Image
            src={championship.image}
            alt={championship.name}
            width={80}
            height={64}
            className="im-belt-glow h-12 w-auto object-contain brightness-90 group-hover:brightness-110 transition-all duration-300"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
            {championship.shortName} Championship
          </p>
          <h3 className="mt-0.5 font-display text-sm font-bold uppercase tracking-wide text-foreground">
            {championship.name}
          </h3>
          {championship.currentChampion && (
            <p className="mt-1 font-body text-xs text-foreground-muted">
              {championship.currentChampion.wrestler}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="hidden shrink-0 flex-col items-end gap-1 text-right sm:flex">
          <p className="font-display text-lg font-bold text-foreground">
            {championship.daysHeld}
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
            Days
          </p>
        </div>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-accent-red transition-all duration-400 group-hover:w-full" />
      </div>
    );
  }

  /* ─── DEFAULT (full card) ─── */
  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-border transition-all duration-300 hover:border-accent-gold/30",
        onClick && "cursor-pointer",
        "im-gold-metallic-bg"
      )}
      onClick={onClick}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/[0.04] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

      <div className="relative flex flex-col md:flex-row">
        {/* Belt image panel */}
        <div className="relative flex min-h-[180px] items-center justify-center bg-gradient-to-b from-background-tertiary/80 to-background-secondary/40 p-8 md:min-h-0 md:w-[220px] md:shrink-0">
          {/* Subtle radial glow behind belt */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <Image
            src={championship.image}
            alt={championship.name}
            width={280}
            height={140}
            className="im-belt-glow relative z-10 h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105 md:h-32"
          />
        </div>

        {/* Content panel */}
        <div className="relative flex-1 p-6 md:p-8">
          {/* Title label */}
          <span className="inline-block border border-accent-gold/25 bg-accent-gold/8 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-accent-gold">
            {championship.shortName} Championship
          </span>

          <h3 className="mt-3 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            {championship.name}
          </h3>

          {championship.currentChampion ? (
            <div className="mt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground-muted">
                Current Champion
              </p>
              <p className="mt-1 font-display text-xl font-bold text-accent-gold sm:text-2xl">
                {championship.currentChampion.wrestler}
              </p>
              {championship.currentChampion.nickname && (
                <p className="mt-0.5 font-body text-sm text-foreground-muted">
                  {championship.currentChampion.nickname}
                </p>
              )}

              {/* Stats row */}
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                <Stat label="Reign" value={`#${championship.reign}`} />
                <Stat label="Days Held" value={String(championship.daysHeld)} />
                <Stat label="Defenses" value={String(championship.defenses)} />
                {championship.lastDefense && (
                  <Stat
                    label="Last Defense"
                    value={championship.lastDefense.event}
                  />
                )}
              </div>

              {/* Days held bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
                    Reign length
                  </span>
                  <span className="font-mono text-[9px] font-bold text-accent-gold">
                    {championship.daysHeld} days
                  </span>
                </div>
                <div className="mt-1.5 h-0.5 bg-background-tertiary">
                  <div
                    className="h-full bg-accent-gold/60 transition-all duration-700"
                    style={{
                      width: `${Math.min((championship.daysHeld / 365) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-5 font-body text-sm text-foreground-muted">
              Vacant — tournament to be announced
            </p>
          )}

          {/* View link */}
          <div className="mt-6">
            <Link
              href={`/championships#${championship.id}`}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground-muted transition-colors hover:text-accent-gold"
            >
              Full History
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Gold accent top rule */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </p>
      <p className="mt-0.5 font-display text-sm font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}
