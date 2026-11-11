import type { CSSProperties } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventCard } from "@/components/events/EventCard";
import { events } from "@/data";

export const metadata = {
  title: "Events",
  description: "Upcoming and past Indus Matworks events, venues, dates, and match cards.",
};

export default function EventsPage() {
  const upcoming = events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = events
    .filter((event) => event.status !== "upcoming")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const cities = new Set(events.map((event) => event.city));

  return (
    <>
      <PageHeader
        overline="Events Calendar"
        title={
          <>
            Indus Matworks
            <br />
            Events
          </>
        }
        subtitle="Upcoming shows, completed events, venues, match cards, and official event information."
        backgroundImage={events[0]?.heroImage || events[0]?.posterImage}
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide grid grid-cols-2 gap-px bg-[var(--im-border)] lg:grid-cols-4">
          {[
            { label: "Upcoming Shows", value: upcoming.length },
            { label: "Completed Events", value: past.length },
            { label: "Cities Represented", value: cities.size },
            { label: "Total Events", value: events.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--im-page)] px-4 py-6 sm:px-6">
              <p className="font-display text-3xl font-black leading-none text-[var(--im-ink)] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="border-b border-[var(--im-border)] bg-[var(--im-surface)] py-12 md:py-16 lg:py-20">
          <div className="container-wide">
            <div
              className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
              data-reveal
            >
              <div>
                <p className="im-eyebrow">Upcoming</p>
                <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
                  Next Events
                </h2>
              </div>
              <p className="max-w-sm font-body text-sm leading-6 text-[var(--im-muted)]">
                The next confirmed shows on the Indus Matworks calendar.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((event, index) => (
                <div
                  key={event.id}
                  data-reveal
                  style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as CSSProperties}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--im-page)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <div
            className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <div>
              <p className="im-eyebrow">Archive</p>
              <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
                Past Events
              </h2>
            </div>
            <p className="max-w-sm font-body text-sm leading-6 text-[var(--im-muted)]">
              Completed events, event cards, and the results archive.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {past.map((event, index) => (
              <div
                key={event.id}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as CSSProperties}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
          {!events.length && (
            <p className="border border-[var(--im-border)] bg-[var(--im-surface)] p-6 font-body text-sm text-[var(--im-muted)]">
              No events found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
