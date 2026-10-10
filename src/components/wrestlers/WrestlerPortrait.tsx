
import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  getWrestlerImage,
  getWrestlerPortraitAlt,
} from "@/lib/roster";

import type { Wrestler } from "@/types";

type PortraitMask = "poster" | "hero" | "thumb" | "none";

interface WrestlerPortraitProps {
  wrestler: Wrestler | WrestlerPortraitData;

  /** Class applied to the athlete image itself. */
  className?: string;

  /** Class applied to the blurred atmosphere layer. */
  backdropClassName?: string;

  /** Controls the image's visual mask. */
  mask?: PortraitMask;

  /** Controls how the image fills its parent. */
  fit?: "cover" | "contain";

  /** Adds a blurred, low-opacity image behind the subject. */
  halo?: boolean;

  /** Responsive image sizes for Next.js image optimization. */
  sizes?: string;

  /** Prioritize loading for important above-the-fold portraits. */
  priority?: boolean;

  /** Overrides the generated image alt text. */
  alt?: string;
}

/**
 * Lightweight portrait data for components that do not need
 * a complete Wrestler object, such as championship spotlight cards.
 */
export interface WrestlerPortraitData {
  wrestlerId?: string;
  wrestlerName?: string;
  wrestlerNickname?: string;
  wrestlerImage?: string;
}

const maskClasses: Record<PortraitMask, string> = {
  poster: "im-mask-poster",
  hero: "im-mask-hero",
  thumb: "im-mask-thumb",
  none: "",
};

const DEFAULT_SIZES =
  "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 22vw";

/**
 * Converts a lightweight portrait descriptor into the shape
 * expected by the existing roster image helpers.
 */
export function portraitToWrestler(
  data: Wrestler | WrestlerPortraitData
): Wrestler {
  if (
    "ringName" in data &&
    typeof data.ringName === "string"
  ) {
    return data;
  }

  const portrait = data as WrestlerPortraitData;

  const name = portrait.wrestlerName ?? "";
  const image = portrait.wrestlerImage ?? undefined;

  return {
    id: portrait.wrestlerId ?? "",
    name,
    ringName: name,
    nickname: portrait.wrestlerNickname ?? "",
    image,
    imageFull: image,
    weightClass: "",
    gender: "men",
    division: "Singles",
    height: "",
    weight: "",
    from: "",
    debut: "",
    record: {
      wins: 0,
      losses: 0,
      draws: 0,
    },
    winRate: 0,
    style: "",
    status: "active",
    finisher: "",
    bio: "",
    championships: [],
    rivalries: [],
    relatedMedia: [],
  };
}

/**
 * Renders wrestler photography as a cutout against the dark
 * page background rather than inside a hard rectangular frame.
 *
 * The parent element must be positioned and have a defined size,
 * because Next.js Image uses `fill`.
 *
 * For transparent cutouts, use a PNG or WebP with transparency
 * and a suitable CSS mask class.
 */
export function WrestlerPortrait({
  wrestler,
  className,
  backdropClassName,
  mask = "poster",
  fit = "cover",
  halo = false,
  sizes = DEFAULT_SIZES,
  priority = false,
  alt,
}: WrestlerPortraitProps) {
  const athlete = portraitToWrestler(wrestler);
  const source = getWrestlerImage(athlete);

  const label =
    alt ?? getWrestlerPortraitAlt(athlete);

  const initials = (
    athlete.ringName ||
    athlete.name ||
    "Wrestler"
  )
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!source) {
    return (
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center overflow-hidden",
          "bg-[radial-gradient(120%_100%_at_50%_20%,rgba(193,39,45,0.16),rgba(8,8,8,0)_70%)]",
          className
        )}
        role="img"
        aria-label={`${label || "Wrestler"} — image unavailable`}
      >
        <div className="px-4 text-center">
          <span
            aria-hidden="true"
            className={cn(
              "mx-auto flex h-16 w-16 items-center justify-center",
              "border border-white/10 bg-black/40",
              "font-display text-2xl font-black text-accent-red",
              "sm:h-20 sm:w-20 sm:text-3xl"
            )}
          >
            {initials}
          </span>

          <span className="mt-4 block font-mono text-[8px] uppercase tracking-[0.22em] text-foreground-muted">
            Image unavailable
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {halo && (
        <Image
          src={source}
          alt=""
          aria-hidden="true"
          fill
          sizes="120px"
          unoptimized={source.startsWith("data:")}
          className={cn(
            "im-mask-halo pointer-events-none absolute inset-0",
            "scale-[1.15] object-cover opacity-45 blur-2xl grayscale",
            backdropClassName
          )}
        />
      )}

      <Image
        src={source}
        alt={label}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={source.startsWith("data:")}
        className={cn(
          maskClasses[mask],
          fit === "contain"
            ? "object-contain"
            : "object-cover",
          className
        )}
      />
    </>
  );
}