import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function calculateCountdown(targetDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );

  const seconds = Math.floor(
    (diff % (1000 * 60)) / 1000
  );

  return {
    days,
    hours,
    minutes,
    seconds,
    expired: false,
  };
}

export function getRatingStars(rating: number): {
  full: number;
  half: number;
  empty: number;
} {
  const rounded = Math.round(rating * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return {
    full,
    half,
    empty,
  };
}

export function getMatchTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    singles: "Singles Match",
    "tag-team": "Tag Team Match",
    "steel-cage": "Steel Cage Match",
    ladder: "Ladder Match",
    "battle-royal": "Battle Royale",
    tournament: "Tournament Final",
    submission: "Submission Match",
    "no-disqualification": "No Disqualification",
  };

  return labels[type] ?? type;
}

export function getCategoryName(category: string): string {
  const labels: Record<string, string> = {
    breaking: "BREAKING",
    news: "NEWS",
    results: "RESULTS",
    announcements: "ANNOUNCEMENTS",
    backstage: "BACKSTAGE",
  };

  return labels[category] ?? category.toUpperCase();
}

export function getCategoryColor(
  category: string
): "red" | "gold" | "muted" | "default" {
  if (category === "breaking") return "red";
  if (category === "results") return "gold";
  if (category === "announcements") return "default";

  return "muted";
}

export function calculateWinRate(record: {
  wins: number;
  losses: number;
  draws: number;
}): number {
  const total = record.wins + record.losses + record.draws;

  if (total === 0) {
    return 0;
  }

  return Math.round((record.wins / total) * 100);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}