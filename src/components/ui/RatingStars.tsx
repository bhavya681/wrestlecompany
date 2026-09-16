import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface RatingStarsProps extends ComponentProps<"div"> {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export function RatingStars({
  rating,
  size = "md",
  className,
  ...props
}: RatingStarsProps) {
  const { full, half, empty } = getRatingParts(rating);

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
      {...props}
    >
      {[...Array(full)].map((_, i) => (
        <StarIcon key={`full-${i}`} filled size={size} />
      ))}
      {[...Array(half)].map((_, i) => (
        <StarIcon key={`half-${i}`} half size={size} />
      ))}
      {[...Array(empty)].map((_, i) => (
        <StarIcon key={`empty-${i}`} size={size} />
      ))}
    </div>
  );
}

function StarIcon({
  filled = true,
  half = false,
  size = "md",
}: {
  filled?: boolean;
  half?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (half) {
    return (
      <svg
        className={cn(sizeClasses[size], "text-accent-gold")}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <defs>
          <linearGradient id="half-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-fill)"
          d="M12 2l3.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 1.18-6.88z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={cn(
        sizeClasses[size],
        filled ? "text-accent-gold" : "text-foreground-muted"
      )}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 2l3.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 1.18-6.88z" />
    </svg>
  );
}

function getRatingParts(rating: number): {
  full: number;
  half: number;
  empty: number;
} {
  const full = Math.floor(rating);
  const remainder = rating - full;
  const half = remainder >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
}
