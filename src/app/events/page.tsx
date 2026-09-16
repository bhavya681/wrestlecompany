"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/events/EventCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { events } from "@/data";
import { Button } from "@/components/ui/Button";

type EventFilter = "all" | "upcoming" | "past";

export default function EventsPage() {
  const [filter, setFilter] = useState<EventFilter>("all");

  const upcomingEvents = events.filter((e) => e.status === "upcoming").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = events.filter((e) => e.status === "completed").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredUpcoming = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const otherUpcoming = upcomingEvents.slice(1);

  const filteredPast = filter === "upcoming" ? [] : pastEvents;
  const filteredUpcoming = filter === "past" ? [] : otherUpcoming;

  return (
    <>
      <PageHeader
        title="EVENTS"
        subtitle="The complete schedule of Indus Matworks events, from the biggest shows to regional showcases."
        overline="EVENTS CALENDAR"
        backgroundImage="https://picsum.photos/seed/events-hero/1920/1080"
      />

      {/* Featured Upcoming Event */}
      {(filter === "all" || filter === "upcoming") && featuredUpcoming && (
        <section className="border-b border-border bg-background-secondary py-16 md:py-24">
          <div className="container-wide">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent-red">
                  Next Event
                </p>
                <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
                  Featured Upcoming
                </h2>
                <span className="mt-2 block h-px w-8 bg-accent-red" aria-hidden="true" />
              </div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden border border-border bg-background lg:grid-cols-2">
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <Image
                  src={featuredUpcoming.heroImage || ""}
                  alt={featuredUpcoming.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent lg:bg-gradient-to-r lg:from-background/20 lg:to-background" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="mb-4 inline-block border border-accent-red/25 bg-accent-red/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-red self-start">
                  {new Date(featuredUpcoming.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                <h3 className="font-display text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
                  {featuredUpcoming.name}
                </h3>
                <p className="mt-2 font-display text-lg font-bold uppercase tracking-widest text-foreground-muted">
                  {featuredUpcoming.tagline}
                </p>
                <div className="mt-6 flex flex-col gap-1 font-mono text-sm uppercase tracking-[0.15em] text-foreground-muted">
                  <p>{featuredUpcoming.city}</p>
                  <p>{featuredUpcoming.venue}</p>
                </div>
                <p className="mt-6 font-body text-sm leading-relaxed text-foreground-muted">
                  {featuredUpcoming.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="primary" asChild>
                    <Link href={`/events/${featuredUpcoming.slug}`}>Event Details</Link>
                  </Button>
                  {featuredUpcoming.ticketsUrl && featuredUpcoming.ticketsUrl !== "#" && (
                    <Button variant="outline" asChild>
                      <a href={featuredUpcoming.ticketsUrl} target="_blank" rel="noopener noreferrer">
                        Get Tickets
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2">
            <FilterButton
              label="ALL"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <FilterButton
              label="UPCOMING"
              active={filter === "upcoming"}
              onClick={() => setFilter("upcoming")}
            />
            <FilterButton
              label="PAST"
              active={filter === "past"}
              onClick={() => setFilter("past")}
            />
          </div>

          <div className="space-y-12">
            {filteredUpcoming.length > 0 && (
              <div>
                <h3 className="mb-6 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                  More Upcoming Events
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredUpcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {filteredPast.length > 0 && (
              <div>
                <h3 className="mb-6 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                  Past Events
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPast.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {filteredUpcoming.length === 0 && filteredPast.length === 0 && !featuredUpcoming && (
              <p className="font-body text-center text-foreground-muted py-12 border border-border bg-background-secondary">
                No events found in this category.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-5 py-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-200 ${
        active
          ? "border-accent-red bg-accent-red text-background"
          : "border-border text-foreground-muted hover:border-accent-red hover:text-accent-red"
      }`}
    >
      {label}
    </button>
  );
}
