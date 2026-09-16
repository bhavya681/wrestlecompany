import Image from "next/image";
import { Badge } from "@/components/ui/Button";
import { TicketButton } from "@/components/ui/TicketButton";
import type { EventItem } from "@/types";

interface EventCardProps {
  event: EventItem;
  variant?: "default" | "list";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const statusColors: Record<EventItem["status"], string> = {
    upcoming: "bg-accent-red text-background",
    live: "bg-red-500 text-background animate-pulse",
    completed: "bg-foreground-muted text-background",
  };

  const eventDate = new Date(event.date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  if (variant === "list") {
    return (
      <div className="flex items-center gap-4 border-b border-border py-4 first:pt-0 last:border-0">
        <div className="flex-shrink-0 text-center">
          <span className="font-display text-3xl font-bold text-accent-red">
            {eventDate.toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="font-display text-2xl font-bold text-foreground">
            {eventDate.getDate()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-foreground">
            {event.name}
          </h3>
          <p className="font-body text-sm text-foreground-muted">
            {event.city}
            {event.venue && <> • {event.venue}</>}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Badge variant="default" size="sm" className={statusColors[event.status]}>
            {event.status.toUpperCase()}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden border border-border transition-all duration-300 hover:border-accent-red/50">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={event.posterImage}
          alt={event.name}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge variant="default" size="sm" className={statusColors[event.status]}>
            {event.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-display text-xl font-bold tracking-wider text-foreground">
            {event.name}
          </h3>
        </div>
        <p className="font-body text-sm text-foreground-muted">
          {event.city} •{" "}
          {eventDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
        {event.tagline && (
          <p className="mt-1 font-display text-xs font-bold tracking-widest uppercase text-accent-red">
            {event.tagline}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between text-sm font-mono text-foreground-muted">
          <span>{event.matches.length} MATCHES</span>
          {event.venue && <span>{event.venue}</span>}
        </div>

        {event.status === "upcoming" && event.ticketsUrl && (
          <div className="mt-4">
            <TicketButton date={eventDate.toLocaleDateString("en-US", dateOptions) as string}>
              Buy Tickets
            </TicketButton>
          </div>
        )}
      </div>
    </div>
  );
}
