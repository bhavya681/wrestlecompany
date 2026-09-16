"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Button";
import type { Wrestler } from "@/types";

interface WrestlerCardProps {
  wrestler: Wrestler;
  variant?: "default" | "compact" | "profile";
  showDetails?: boolean;
}

function ProfileLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent-red",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {children}
    </Link>
  );
}

function StatusDot({
  status,
}: {
  status: Wrestler["status"];
}) {
  const statusStyles: Record<string, string> = {
    active: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]",
    inactive: "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]",
    retired: "bg-gray-500",
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          statusStyles[status] ?? "bg-gray-500"
        )}
        aria-hidden="true"
      />

      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
        {status}
      </span>
    </span>
  );
}

function RecordStats({
  wrestler,
}: {
  wrestler: Wrestler;
}) {
  const { wins, losses, draws } = wrestler.record;

  const total = wins + losses + draws;

  const winRate =
    total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="mt-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Career Record
          </p>

          <div className="mt-1 flex items-baseline gap-1.5 font-mono">
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

        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Win Rate
          </p>

          <p className="mt-1 font-display text-lg font-bold text-accent-gold">
            {winRate}%
          </p>
        </div>
      </div>

      {total > 0 && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-background-tertiary">
          <div
            className="h-full rounded-full bg-accent-red transition-all duration-700 group-hover:bg-accent-gold"
            style={{
              width: `${Math.min(winRate, 100)}%`,
            }}
          />
        </div>
      )}

      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground-muted-dark">
        {total} {total === 1 ? "Match" : "Matches"}
      </p>
    </div>
  );
}

export function WrestlerCard({
  wrestler,
  variant = "default",
  showDetails = true,
}: WrestlerCardProps) {
  const divisionLabel =
    wrestler.role === "manager"
      ? "MANAGER"
      : wrestler.weightClass;

  const totalMatches =
    wrestler.record.wins +
    wrestler.record.losses +
    wrestler.record.draws;

  const winRate =
    totalMatches > 0
      ? Math.round((wrestler.record.wins / totalMatches) * 100)
      : 0;

  /*
   * IMPORTANT:
   *
   * wrestler.image should contain the path from /public.
   *
   * Example:
   * /wrestler/male/manager/john-doe.jpg
   *
   * OR:
   * /wrestler/male/Tag Team/john-doe.jpg
   *
   * OR:
   * /wrestler/diva/manager/jane-doe.jpg
   *
   * OR:
   * /wrestler/diva/Tag Team/jane-doe.jpg
   *
   * You do NOT need "public" in the path.
   */

  /* -----------------------------------------------------------
   * COMPACT
   * --------------------------------------------------------- */

  if (variant === "compact") {
    return (
      <ProfileLink
        href={`/roster/${wrestler.id}`}
        className="aspect-[3/4] bg-background-secondary"
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={wrestler.image}
            alt={wrestler.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* Top metadata */}
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
          <Badge
            variant={wrestler.role === "manager" ? "gold" : "red"}
            size="sm"
          >
            {divisionLabel}
          </Badge>

          <span className="rounded-full border border-white/10 bg-black/50 px-2 py-1 backdrop-blur-md">
            <StatusDot status={wrestler.status} />
          </span>
        </div>

        {/* Bottom information */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent-red">
            INDUS MATWORKS
          </p>

          <h3 className="font-display text-xl font-bold uppercase leading-none tracking-tight text-white">
            {wrestler.ringName}
          </h3>

          {wrestler.nickname && (
            <p className="mt-1 line-clamp-1 font-body text-xs text-white/60">
              {wrestler.nickname}
            </p>
          )}

          {showDetails && (
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-[10px] text-white/60">
                {totalMatches} MATCHES
              </span>

              <span className="font-mono text-xs font-bold text-accent-gold">
                {winRate}% WIN
              </span>
            </div>
          )}
        </div>

        {/* Hover frame */}
        <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />

        <span className="pointer-events-none absolute bottom-3 right-3 translate-y-2 font-mono text-[9px] font-bold tracking-[0.15em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          VIEW →
        </span>
      </ProfileLink>
    );
  }

  /* -----------------------------------------------------------
   * PROFILE
   * --------------------------------------------------------- */

  if (variant === "profile") {
    return (
      <ProfileLink
        href={`/roster/${wrestler.id}`}
        className="bg-background-secondary"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={wrestler.image}
            alt={wrestler.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top opacity-80 grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
          />

          {/* Image treatment */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Accent glow */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-accent-red/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Top badges */}
          <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
            <Badge
              variant={wrestler.role === "manager" ? "gold" : "red"}
              size="sm"
            >
              {divisionLabel}
            </Badge>

            <div className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1.5 backdrop-blur-md">
              <StatusDot status={wrestler.status} />
            </div>
          </div>

          {/* Bottom identity */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.22em] text-accent-red">
              {wrestler.role === "manager"
                ? "MANAGEMENT"
                : "ROSTER"}
            </p>

            <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-white">
              {wrestler.ringName}
            </h3>

            {wrestler.nickname && (
              <p className="mt-1 font-body text-sm text-white/60">
                {wrestler.nickname}
              </p>
            )}
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-5 right-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-red bg-black/70 font-mono text-xs text-white backdrop-blur-md">
              →
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-accent-red/50" />
        </div>

        {/* Statistics */}
        <div className="border-x border-b border-border bg-background-secondary p-4">
          <RecordStats wrestler={wrestler} />
        </div>
      </ProfileLink>
    );
  }

  /* -----------------------------------------------------------
   * DEFAULT
   * --------------------------------------------------------- */

  return (
    <ProfileLink
      href={`/roster/${wrestler.id}`}
      className="bg-background-secondary"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Wrestler image */}
        <Image
          src={wrestler.image}
          alt={wrestler.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
        />

        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Hover red wash */}
        <div className="absolute inset-0 bg-accent-red/0 transition-colors duration-500 group-hover:bg-accent-red/[0.06]" />

        {/* Top information */}
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
          <Badge
            variant={wrestler.role === "manager" ? "gold" : "red"}
            size="sm"
          >
            {divisionLabel}
          </Badge>

          <div className="rounded-full border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur-md">
            <StatusDot status={wrestler.status} />
          </div>
        </div>

        {/* Center hover information */}
        {showDetails && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 px-5 opacity-0 backdrop-blur-[2px] transition-all duration-400 group-hover:opacity-100">
            <div className="text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent-red">
                CAREER STATISTICS
              </p>

              <div className="mt-3 flex items-center justify-center gap-5">
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-white">
                    {wrestler.record.wins}
                  </p>

                  <p className="font-mono text-[9px] uppercase tracking-widest text-green-400">
                    Wins
                  </p>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-white">
                    {wrestler.record.losses}
                  </p>

                  <p className="font-mono text-[9px] uppercase tracking-widest text-red-400">
                    Losses
                  </p>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-white">
                    {wrestler.record.draws}
                  </p>

                  <p className="font-mono text-[9px] uppercase tracking-widest text-yellow-400">
                    Draws
                  </p>
                </div>
              </div>

              <div className="mx-auto mt-4 h-px w-24 bg-accent-red" />

              <p className="mt-3 font-display text-xl font-bold text-accent-gold">
                {winRate}% WIN RATE
              </p>
            </div>

            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              View Profile →
            </span>
          </div>
        )}

        {/* Bottom identity */}
        <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 group-hover:translate-y-1">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent-red">
            {wrestler.role === "manager" ? "MANAGER" : "WRESTLER"}
          </p>

          <h3 className="font-display text-xl font-bold uppercase leading-none tracking-tight text-white">
            {wrestler.ringName}
          </h3>

          {wrestler.nickname && (
            <p className="mt-1 line-clamp-1 font-body text-xs text-white/60">
              {wrestler.nickname}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-3 font-mono text-[10px] text-white/60">
              <span>
                <strong className="text-white">
                  {wrestler.record.wins}
                </strong>
                W
              </span>

              <span>
                <strong className="text-white">
                  {wrestler.record.losses}
                </strong>
                L
              </span>

              <span>
                <strong className="text-white">
                  {wrestler.record.draws}
                </strong>
                D
              </span>
            </div>

            <span className="font-mono text-[10px] font-bold text-accent-gold">
              {winRate}%
            </span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-red transition-all duration-500 group-hover:w-full" />

        {/* Card border */}
        <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-accent-red/50" />
      </div>
    </ProfileLink>
  );
}
