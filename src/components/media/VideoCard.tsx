import Image from "next/image";
import { Badge } from "@/components/ui/Button";
import type { MediaItem } from "@/types";

interface VideoCardProps {
  item: MediaItem;
  variant?: "featured" | "default" | "compact";
}

export function VideoCard({ item, variant = "default" }: VideoCardProps) {
  if (variant === "compact") {
    return (
      <a
        href={item.url}
        className="group block focus:outline-none focus:ring-2 focus:ring-accent-red"
      >
        <div className="flex gap-3">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <PlayIcon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-body text-xs text-foreground-muted">
              {formatDate(item.date)}
            </p>
            <h3 className="font-display text-sm font-bold text-foreground line-clamp-1 group-hover:text-accent-red">
              {item.title}
            </h3>
            {item.duration && (
              <span className="font-mono text-xs text-foreground-muted">
                {item.duration}
              </span>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === "featured") {
    return (
      <a
        href={item.url}
        className="group block focus:outline-none focus:ring-2 focus:ring-accent-red"
      >
        <div className="relative overflow-hidden border border-border">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 transition-opacity duration-300 group-hover:bg-black/20">
              <div className="rounded-full border-2 border-white bg-accent-red p-4 transition-transform duration-300 group-hover:scale-110">
                <PlayIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="red" size="sm">
                {item.category.replace("-", " ").toUpperCase()}
              </Badge>
              {item.duration && (
                <span className="font-mono text-xs text-foreground-muted">
                  {item.duration}
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-accent-red">
              {item.title}
            </h3>
            <p className="mt-2 font-body text-sm text-foreground-muted line-clamp-2">
              {item.description}
            </p>
            <div className="mt-3 font-mono text-xs text-foreground-muted">
              {formatDate(item.date)}
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={item.url}
      className="group block focus:outline-none focus:ring-2 focus:ring-accent-red"
    >
      <div className="overflow-hidden border border-border">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <PlayIcon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="p-3">
          {item.duration && (
            <span className="font-mono text-xs text-accent-gold">
              {item.duration}
            </span>
          )}
          <h3 className="mt-1 font-display text-sm font-bold text-foreground group-hover:text-accent-red">
            {item.title}
          </h3>
        </div>
      </div>
    </a>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 18 L18.5 12 L10 6 L10 18 Z" />
    </svg>
  );
}
