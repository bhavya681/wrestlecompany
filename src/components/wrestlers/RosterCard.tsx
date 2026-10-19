
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";

import type { Wrestler } from "@/types";

interface RosterCardProps {
  wrestler: Wrestler;
}

/**
 * TNA-inspired roster card.
 * A large, consistent wrestler portrait with the name displayed beneath.
 * Links directly to the wrestler's profile — no stats, badges, or modals.
 */
export function RosterCard({ wrestler }: RosterCardProps) {
  return (
    <Link
      href={`/roster/${wrestler.id}`}
      aria-label={`View ${wrestler.ringName} profile`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-background-secondary">
        <WrestlerPortrait
          wrestler={wrestler}
          mask="poster"
          sizes="(max-width: 640px) 44vw, (max-width: 768px) 29vw, (max-width: 1024px) 23vw, (max-width: 1280px) 21vw, 18vw"
          className={cn(
            "h-full w-full object-cover object-center",
            "scale-[1.02] grayscale-[0.35] contrast-[1.05]",
            "transition-[transform,filter] duration-500 ease-out",
            "group-hover:scale-[1.07] group-hover:grayscale-0"
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-background via-transparent to-transparent"
        />
      </div>

      <h3
        className={cn(
          "mt-3 block truncate font-display text-lg font-bold uppercase leading-none tracking-tight text-white",
          "transition-colors duration-300 group-hover:text-accent-red"
        )}
      >
        {wrestler.ringName}
      </h3>
    </Link>
  );
}
