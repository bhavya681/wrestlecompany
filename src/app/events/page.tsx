"use client";

import { useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { events } from "@/data";

type EventFilter = "all" | "upcoming" | "past";

export default function EventsPage() {
  const [filter, setFilter] = useState<EventFilter>("all");

  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return e.status === "upcoming";
    if (filter === "past") return e.status === "completed";
    return true;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (filter === "upcoming") {
      return (
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    return (
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  return (
    <>
      <PageHeader
        title="EVENTS"
        subtitle="The complete schedule of Indus Matworks events, from the biggest shows to regional showcases."
        overline="EVENTS CALENDAR"
        backgroundImage="https://picsum.photos/seed/events-hero/1920/1080"
      />

      <section className="py-12">
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

          {sortedEvents.length === 0 ? (
            <p className="font-body text-center text-foreground-muted">
              No events found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
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
      className={`border px-4 py-2 font-body text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
        active
          ? "border-accent-red bg-accent-red text-background"
          : "border-border text-foreground-muted hover:border-accent-red hover:text-accent-red"
      }`}
    >
      {label}
    </button>
  );
}
