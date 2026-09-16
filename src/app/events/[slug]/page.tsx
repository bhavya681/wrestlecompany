import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { TicketButton } from "@/components/ui/TicketButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { getMatchTypeLabel, formatDateLong } from "@/lib/utils";
import { events, matches, wrestlers } from "@/data";
import type { Match } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Not Found" };
  return {
    title: event.name,
    description: event.description,
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();

  const eventMatches = event.matches
    .map((id) => matches.find((m) => m.id === id))
    .filter((m): m is Match => m !== undefined);

  return (
    <>
      <PageHeader
        title={event.name}
        subtitle={event.tagline || ""}
        overline={event.status === "upcoming" ? "UPCOMING" : event.status.toUpperCase()}
        backgroundImage={event.heroImage || event.posterImage}
      />

      <section className="py-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div>
                <Badge variant={event.status === "upcoming" ? "red" : "default"} size="sm">
                  {event.status.toUpperCase()}
                </Badge>
                <h2 className="font-display mt-2 text-3xl font-bold text-foreground">
                  {event.city}
                </h2>
                {event.venue && (
                  <p className="font-body text-sm text-foreground-muted">
                    {event.venue}
                  </p>
                )}
                <p className="font-display text-xl font-bold text-accent-red mt-2">
                  {formatDateLong(event.date)}
                </p>
              </div>

              {event.description && (
                <p className="max-w-2xl font-body text-sm leading-relaxed text-foreground-muted">
                  {event.description}
                </p>
              )}

              {event.status === "upcoming" && event.ticketsUrl && (
                <TicketButton href={event.ticketsUrl}>
                  Get Tickets Now
                </TicketButton>
              )}
            </div>

            <div className="relative aspect-[3/4]">
              <Image
                src={event.posterImage}
                alt={event.name}
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="container-wide">
          <h3 className="mb-6 font-display text-2xl font-bold text-foreground">
            MATCH CARD
          </h3>

          <div className="space-y-6">
            {eventMatches.map((match) => {
              const w1 = wrestlers.find(
                (w) => w.id === match.competitors[0].wrestlerId
              );
              const w2 = wrestlers.find(
                (w) => w.id === match.competitors[1].wrestlerId
              );

              return (
                <div
                  key={match.id}
                  className="border-b border-border pb-6 last:border-0"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="default" size="sm">
                      {getMatchTypeLabel(match.type)}
                    </Badge>
                    {match.championship && (
                      <Badge variant="gold" size="sm">
                        {match.championship
                          .replace("im-", "")
                          .replace(/-/g, " ")}
                      </Badge>
                    )}
                    {match.isMainEvent && (
                      <Badge variant="red" size="sm">
                        MAIN EVENT
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4 font-display">
                    <span className="text-xl font-bold text-foreground">
                      {w1?.name || match.competitors[0].wrestler}
                    </span>
                    <span className="text-2xl font-black text-accent-red">
                      VS
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {w2?.name || match.competitors[1].wrestler}
                    </span>
                  </div>

                  {match.result.winner && match.result.winner !== "draw" && (
                    <div className="mt-2 text-center font-mono text-sm text-foreground-muted">
                      RESULT: {match.result.winner === match.competitors[0].wrestlerId
                        ? match.competitors[0].wrestler
                        : match.competitors[1].wrestler}{" "}
                      won via {match.result.method} at {match.result.time}
                      {match.rating && <RatingStars rating={match.rating} size="sm" className="ml-2" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
