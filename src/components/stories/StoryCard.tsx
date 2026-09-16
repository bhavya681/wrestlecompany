import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Story } from "@/types";

interface StoryCardProps {
  story: Story;
  variant?: "default" | "compact";
}

export function StoryCard({ story, variant = "default" }: StoryCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/stories/${story.slug}`}
        className="group block focus:outline-none focus:ring-2 focus:ring-accent-red"
      >
        <div className="flex gap-3">
          <div className="relative h-20 w-28 shrink-0 overflow-hidden">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover grayscale transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-0"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold tracking-wider text-accent-red">
              {story.subtitle}
            </span>
            <h3 className="font-display text-sm font-bold text-foreground">
              {story.title}
            </h3>
            <span className="mt-auto font-display text-xs font-bold text-foreground-muted/50 group-hover:text-accent-red">
              ENTER STORY →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  const statusColors: Record<string, string> = {
    active: "border-accent-red text-accent-red",
    past: "border-foreground-muted text-foreground-muted",
    upcoming: "border-foreground-muted/50 text-foreground-muted",
  };

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-accent-red"
    >
      <div className="relative overflow-hidden border border-border">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge variant="default" size="sm">
              {story.status === "active" ? "ACTIVE" : "ARCHIVED"}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span
              className={cn(
                "font-display text-xs font-bold tracking-widest uppercase",
                statusColors[story.status]
              )}
            >
              {story.subtitle}
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
              {story.title}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <p className="font-body text-sm text-foreground-muted line-clamp-2">
            {story.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-2 font-display text-sm font-bold uppercase text-foreground-muted group-hover:text-accent-red">
            <span>Enter Story</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
