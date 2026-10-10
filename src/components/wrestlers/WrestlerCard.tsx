
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Button";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";

import {
  getCountry,
  getDivisionLabel,
  getFlagEmoji,
  getLocation,
  getRecord,
  getRecordLabel,
  getRoleLabel,
  getWinRate,
  getWinRateLabel,
  isChampion,
} from "@/lib/roster";

import type { Wrestler } from "@/types";

interface WrestlerCardProps {
  wrestler: Wrestler;
  variant?: "default" | "compact" | "profile";
  showDetails?: boolean;
  /** Poster index rendered in the corner of the default variant. */
  index?: number;
}

/* =========================================================
   PROFILE LINK
   ========================================================= */

function ProfileLink({
  href,
  children,
  className,
  ariaLabel,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      style={style}
      className={cn(
        "group relative block min-w-0 overflow-hidden outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent-red",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {children}
    </Link>
  );
}

/* =========================================================
   STATUS DOT
   ========================================================= */

function StatusDot({ status }: { status: Wrestler["status"] }) {
  const statusStyles: Record<string, string> = {
    active: "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.75)]",
    inactive: "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.65)]",
    retired: "bg-gray-500",
  };

  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          statusStyles[status] ?? "bg-gray-500"
        )}
        aria-hidden="true"
      />
      <span className="truncate font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-white/65">
        {status}
      </span>
    </span>
  );
}

/* =========================================================
   BADGE VARIANT
   ========================================================= */

function getBadgeVariant(wrestler: Wrestler): "red" | "gold" {
  const role = String(wrestler.role || "").toLowerCase();
  const type = String(wrestler.type || "").toLowerCase();

  const goldRoles = [
    "manager",
    "tag-team",
    "referee",
    "announcer",
    "commentator",
    "commentators",
  ];

  return goldRoles.includes(role) || goldRoles.includes(type)
    ? "gold"
    : "red";
}

/* =========================================================
   TEAM MEMBERS
   ========================================================= */

function TeamMembers({ wrestler }: { wrestler: Wrestler }) {
  if (!wrestler.members?.length) return null;

  return (
    <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1">
      {wrestler.members.map((member) => (
        <span
          key={member}
          className="max-w-full truncate border border-accent-gold/20 bg-accent-gold/5 px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-[0.1em] text-accent-gold"
        >
          {member}
        </span>
      ))}
    </div>
  );
}

/* =========================================================
   LOCATION META
   ========================================================= */

function LocationMeta({
  wrestler,
  dark = false,
}: {
  wrestler: Wrestler;
  dark?: boolean;
}) {
  const location = getLocation(wrestler);
  const country = getCountry(wrestler);
  const flag = getFlagEmoji(wrestler);

  if (!location) return null;

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-1.5",
        dark ? "text-white/45" : "text-foreground-muted"
      )}
      title={location}
    >
      {flag && (
        <span
          aria-hidden="true"
          className="shrink-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]"
        >
          {flag}
        </span>
      )}

      <span className="min-w-0 truncate font-mono text-[8px] uppercase tracking-[0.12em]">
        {country || location}
      </span>
    </div>
  );
}

/* =========================================================
   RECORD STATS
   ========================================================= */

function RecordStats({ wrestler }: { wrestler: Wrestler }) {
  const { wins, losses, draws, total } = getRecord(wrestler);
  const winRate = getWinRate(wrestler);

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
            Career Record
          </p>

          <div className="mt-1.5 flex items-center gap-1.5 font-mono">
            <span className="text-sm font-bold text-foreground">
              {wins}W
            </span>
            <span className="text-xs text-foreground-muted">-</span>
            <span className="text-sm font-bold text-foreground">
              {losses}L
            </span>
            <span className="text-xs text-foreground-muted">-</span>
            <span className="text-sm font-bold text-foreground">
              {draws}D
            </span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
            Win Rate
          </p>

          <p className="mt-1 font-display text-lg font-bold text-accent-gold">
            {total ? `${winRate}%` : "N/A"}
          </p>
        </div>
      </div>

      {total > 0 ? (
        <>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-background-tertiary">
            <div
              className="h-full rounded-full bg-accent-red transition-all duration-700 ease-out group-hover:bg-accent-gold"
              style={{ width: `${Math.min(winRate, 100)}%` }}
            />
          </div>

          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground-muted-dark">
            {total} {total === 1 ? "Match" : "Matches"}
          </p>
        </>
      ) : (
        <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground-muted-dark">
          No recorded matches
        </p>
      )}
    </div>
  );
}

/* =========================================================
   CARD TOP META
   ========================================================= */

function CardTopMeta({ wrestler }: { wrestler: Wrestler }) {
  const badgeVariant = getBadgeVariant(wrestler);
  const roleLabel = getRoleLabel(wrestler);

  return (
    <div className="absolute left-3 right-3 top-3 z-30 flex min-w-0 items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
      <div className="min-w-0 max-w-[65%]">
        <Badge variant={badgeVariant} size="sm">
          {roleLabel}
        </Badge>
      </div>

      <div className="min-w-0 max-w-[38%] rounded-full border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur-md">
        <StatusDot status={wrestler.status} />
      </div>
    </div>
  );
}

/* =========================================================
   HOVER STATS
   ========================================================= */

function HoverStats({ wrestler }: { wrestler: Wrestler }) {
  const { wins, losses, draws, total } = getRecord(wrestler);
  const winRate = getWinRate(wrestler);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-2 bottom-2 z-25",
        "translate-y-3 opacity-0",
        "transition-all duration-300 ease-out",
        "group-hover:translate-y-0 group-hover:opacity-100",
        "group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      )}
    >
      <div className="overflow-hidden rounded-md border border-white/10 bg-black/85 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-accent-red">
            Career Statistics
          </span>

          <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.15em] text-white/35">
            {total} {total === 1 ? "MATCH" : "MATCHES"}
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-white/10">
          <div className="min-w-0 px-2 py-3 text-center">
            <p className="font-display text-xl font-bold leading-none text-white sm:text-2xl">
              {wins}
            </p>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-green-400">
              Wins
            </p>
          </div>

          <div className="min-w-0 px-2 py-3 text-center">
            <p className="font-display text-xl font-bold leading-none text-white sm:text-2xl">
              {losses}
            </p>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-red-400">
              Losses
            </p>
          </div>

          <div className="min-w-0 px-2 py-3 text-center">
            <p className="font-display text-xl font-bold leading-none text-white sm:text-2xl">
              {draws}
            </p>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-yellow-400">
              Draws
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 px-3 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/40">
              Win Rate
            </span>

            <span className="font-display text-sm font-bold text-accent-gold">
              {total ? `${winRate}%` : "N/A"}
            </span>
          </div>

          {total > 0 && (
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent-gold transition-all duration-700"
                style={{ width: `${Math.min(winRate, 100)}%` }}
              />
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">
              View full profile
            </span>

            <span className="shrink-0 font-mono text-[8px] font-bold text-white">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN WRESTLER CARD
   ========================================================= */

export function WrestlerCard({
  wrestler,
  variant = "default",
  showDetails = true,
  index,
}: WrestlerCardProps) {
  const roleLabel = getRoleLabel(wrestler);
  const divisionLabel = getDivisionLabel(wrestler);
  const recordLabel = getRecordLabel(wrestler);
  const winRateLabel = getWinRateLabel(wrestler);

  /* ---------------------------------------------------------
     COMPACT VARIANT
     --------------------------------------------------------- */

  if (variant === "compact") {
    return (
      <ProfileLink
        href={`/roster/${wrestler.id}`}
        ariaLabel={`View ${wrestler.ringName} profile`}
        className="aspect-[3/4] bg-background-secondary"
      >
        <div className="absolute inset-0">
          <WrestlerPortrait
            wrestler={wrestler}
            mask="poster"
            className={cn(
              "h-full w-full object-cover object-top grayscale",
              "transition-all duration-700 ease-out",
              "group-hover:scale-105 group-hover:grayscale-0"
            )}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

          <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.06]" />
        </div>

        <CardTopMeta wrestler={wrestler} />

        <div className="absolute inset-x-0 bottom-0 z-10 min-w-0 p-4">
          <p className="mb-1 truncate font-mono text-[8px] uppercase tracking-[0.25em] text-accent-red">
            {roleLabel}
          </p>

          <h3 className="truncate font-display text-xl font-bold uppercase leading-none tracking-tight text-white">
            {wrestler.ringName}
          </h3>

          {wrestler.nickname && (
            <p className="mt-1 truncate font-body text-xs text-white/55">
              {wrestler.nickname}
            </p>
          )}

          <div className="mt-2">
            <LocationMeta wrestler={wrestler} dark />
          </div>

          <TeamMembers wrestler={wrestler} />

          {showDetails && (
            <div className="mt-3 border-t border-white/10 pt-3">
              <div className="flex min-w-0 items-center justify-between gap-3 font-mono text-[8px]">
                <span className="min-w-0 truncate text-white/45">
                  {divisionLabel}
                </span>

                <span className="shrink-0 text-white/80">
                  {recordLabel}
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="truncate font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">
                  {wrestler.status}
                </span>

                <span className="shrink-0 font-mono text-[9px] font-bold text-accent-gold">
                  {winRateLabel}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-accent-red transition-all duration-500 group-hover:w-full" />

        <div className="pointer-events-none absolute inset-0 z-30 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />

        <span className="pointer-events-none absolute bottom-4 right-4 z-30 translate-y-2 font-mono text-[8px] font-bold tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          VIEW →
        </span>
      </ProfileLink>
    );
  }

  /* ---------------------------------------------------------
     PROFILE VARIANT
     --------------------------------------------------------- */

  if (variant === "profile") {
    return (
      <ProfileLink
        href={`/roster/${wrestler.id}`}
        ariaLabel={`View ${wrestler.ringName} profile`}
        className="bg-background-secondary"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <WrestlerPortrait
            wrestler={wrestler}
            mask="poster"
            className={cn(
              "h-full w-full object-cover object-top",
              "opacity-85 grayscale",
              "transition-all duration-700 ease-out",
              "group-hover:scale-[1.04]",
              "group-hover:opacity-100",
              "group-hover:grayscale-0"
            )}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.05]" />

          <CardTopMeta wrestler={wrestler} />

          <div className="absolute inset-x-0 bottom-0 z-10 min-w-0 p-5">
            <p className="mb-1 truncate font-mono text-[8px] uppercase tracking-[0.25em] text-accent-red">
              {roleLabel}
            </p>

            <h3 className="truncate font-display text-2xl font-bold uppercase leading-none tracking-tight text-white">
              {wrestler.ringName}
            </h3>

            {wrestler.nickname && (
              <p className="mt-1 truncate font-body text-sm text-white/55">
                {wrestler.nickname}
              </p>
            )}

            <div className="mt-2">
              <LocationMeta wrestler={wrestler} dark />
            </div>

            <TeamMembers wrestler={wrestler} />
          </div>

          <div className="absolute bottom-5 right-5 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-red bg-black/70 font-mono text-xs text-white backdrop-blur-md">
              →
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />
        </div>

        <div className="border-x border-b border-border bg-background-secondary p-4">
          <RecordStats wrestler={wrestler} />
        </div>
      </ProfileLink>
    );
  }

  /* ---------------------------------------------------------
     DEFAULT VARIANT — /roster POSTER CARD
     --------------------------------------------------------- */

  const champion = isChampion(wrestler);
  const hasTeam = Boolean(wrestler.members?.length);

  return (
    <ProfileLink
      href={`/roster/${wrestler.id}`}
      ariaLabel={`View ${wrestler.ringName} profile`}
      style={
        typeof index === "number"
          ? ({
              "--im-stagger": `${Math.min(Math.max(index, 0), 11) * 45}ms`,
            } as CSSProperties)
          : undefined
      }
      className={cn(
        "im-stagger bg-background-secondary",
        "shadow-[0_28px_60px_-40px_rgba(0,0,0,0.9)]",
        "transition-[transform,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,1)]"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border border-white/[0.08] bg-background",
          "transition-colors duration-500",
          champion
            ? "group-hover:border-accent-gold/45 group-focus-visible:border-accent-gold/60"
            : "group-hover:border-accent-red/45 group-focus-visible:border-accent-red/60"
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
          <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_18%,rgba(255,255,255,0.07),rgba(8,8,8,0)_68%)]" />

          <WrestlerPortrait
            wrestler={wrestler}
            mask="poster"
            halo
            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1280px) 25vw, 21vw"
            className={cn(
              "h-full w-full object-cover object-[50%_22%]",
              "scale-[1.02] grayscale-[0.5] contrast-[1.05]",
              "transition-[transform,filter] duration-[900ms] ease-out",
              "group-hover:scale-[1.07] group-hover:grayscale-0",
              "group-focus-visible:grayscale-0"
            )}
          />

          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              champion
                ? "bg-[radial-gradient(85%_60%_at_50%_105%,rgba(212,175,55,0.28),transparent_70%)] opacity-40 group-hover:opacity-100"
                : "bg-[radial-gradient(85%_60%_at_50%_105%,rgba(193,39,45,0.32),transparent_70%)] opacity-40 group-hover:opacity-100"
            )}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,transparent_45%,rgba(0,0,0,0.55)_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-background via-background/85 to-transparent"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
            <span
              aria-hidden="true"
              className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/60 transition-colors duration-500 group-hover:text-white/75"
            >
              {typeof index === "number"
                ? String(index + 1).padStart(2, "0")
                : roleLabel}
            </span>

            {champion ? (
              <span className="inline-flex items-center gap-1.5 border border-accent-gold/40 bg-black/55 px-2 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.16em] text-accent-gold backdrop-blur-md">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent-gold"
                  aria-hidden="true"
                />
                Champion
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 border border-white/10 bg-black/55 px-2 py-1 backdrop-blur-md">
                <StatusDot status={wrestler.status} />
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-6 shrink-0 transition-all duration-500 group-hover:w-10",
                  champion ? "bg-accent-gold" : "bg-accent-red"
                )}
              />

              <span
                className={cn(
                  "truncate font-mono text-[8px] font-bold uppercase tracking-[0.22em] transition-colors duration-500",
                  champion ? "text-accent-gold" : "text-accent-red"
                )}
              >
                {champion ? "Title Holder" : roleLabel}
              </span>
            </div>

            <h3
              className={cn(
                "mt-2 break-words font-display font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white",
                "text-[clamp(1rem,1.35vw+0.55rem,1.7rem)]",
                "transition-transform duration-500 ease-out",
                "group-hover:translate-x-1"
              )}
            >
              {wrestler.ringName}
            </h3>

            {wrestler.nickname && !hasTeam && (
              <p
                className={cn(
                  "mt-1.5 line-clamp-1 font-body text-[11px] text-white/55",
                  "transition-colors duration-500 group-hover:text-white/75"
                )}
              >
                {wrestler.nickname}
              </p>
            )}

            <TeamMembers wrestler={wrestler} />

            <div className="mt-2.5 border-t border-white/10 pt-2.5">
              <div className="flex min-w-0 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-mono text-[7px] uppercase tracking-[0.14em] text-white/60 sm:text-[8px]">
                    {divisionLabel}
                  </p>

                  <p className="mt-1 truncate font-mono text-[9px] text-white/75">
                    {recordLabel}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/60 sm:text-[8px]">
                    Win rate
                  </p>

                  <p className="mt-1 font-mono text-[9px] font-bold text-accent-gold">
                    {winRateLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 left-0 z-40 h-[2px] w-0 transition-all duration-500 group-hover:w-full group-focus-visible:w-full",
              champion ? "bg-accent-gold" : "bg-accent-red"
            )}
          />
        </div>

        {showDetails && <HoverStats wrestler={wrestler} />}

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-40 border border-transparent transition-colors duration-300",
            champion
              ? "group-hover:border-accent-gold/50"
              : "group-hover:border-accent-red/50"
          )}
        />
      </div>

      <span className="sr-only">
        {roleLabel}
        {hasTeam ? ` — ${wrestler.members?.join(" / ")}` : ""}
        {divisionLabel ? ` — ${divisionLabel}` : ""}
      </span>
    </ProfileLink>
  );
}
