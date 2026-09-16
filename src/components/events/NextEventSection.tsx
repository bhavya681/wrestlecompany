import Image from "next/image";
import { Badge, Countdown } from "@/components/ui";
import { TicketButton } from "@/components/ui/TicketButton";
import { formatDateLong, formatDateShort } from "@/lib/utils";
import { events, matches, wrestlers } from "@/data";
import type { EventItem, Match, Wrestler } from "@/types";

export function NextEventSection() {
  const upcoming = events.find((e) => e.status === "upcoming");
  if (!upcoming) return null;

  const mainEvent = findMainEvent(upcoming);
  return (
    <section className="py-12 md:py-16">
      <div className="container-wide">
        <div className="mb-4">
          <Badge variant="red" size="sm">
            NEXT EVENT
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                {upcoming.name}
              </h2>
              {upcoming.tagline && (
                <p className="font-body text-sm tracking-widest text-foreground-muted">
                  {upcoming.tagline}
                </p>
              )}
              <p className="font-display text-xl font-bold text-accent-red">
                {upcoming.city}
              </p>
              <p className="font-body text-sm text-foreground-muted">
                {formatDateLong(upcoming.date)}
              </p>
            </div>

            {upcoming.venue && (
              <p className="font-body text-sm text-foreground-muted">
                {upcoming.venue}
              </p>
            )}

            <div className="pt-2">
              <Countdown
                targetDate={upcoming.date}
                label="LIVE IN"
                className="max-w-xs"
              />
            </div>

            {mainEvent && (
              <div className="border-t border-border pt-6 space-y-4">
                <div>
                  <Badge variant="red" size="sm">
                    MAIN EVENT
                  </Badge>
                  <h3 className="font-display mt-2 text-2xl font-bold text-foreground">
                    {mainEvent.competitors[0].wrestler}
                    <br />
                    <span className="text-accent-red">VS</span>
                    <br />
                    {mainEvent.competitors[1].wrestler}
                  </h3>
                  {mainEvent.championship && (
                    <p className="font-body text-sm text-foreground-muted">
                      {mainEvent.championship
                        .replace("im-", "")
                        .replace(/-/g, " ")
                        .toUpperCase()}
                    </p>
                  )}
                  <p className="font-body text-xs text-foreground-muted">
                    {matchTypeLabel(mainEvent.type)}
                  </p>
                </div>

                <MatchupStats
                  match={mainEvent}
                  wrestlers={wrestlers}
                />
              </div>
            )}

            <TicketButton
              date={formatDateShort(upcoming.date)}
              href={upcoming.ticketsUrl || "/events"}
            >
              Get Tickets
            </TicketButton>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={upcoming.posterImage}
              alt={upcoming.name}
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function findMainEvent(event: EventItem): Match | undefined {
  const eventMatches = matches.filter((match) => match.eventId === event.id);
  const hasRosterCompetitors = (match: Match) =>
    wrestlers.some(
      (wrestler) => wrestler.id === match.competitors[0].wrestlerId
    ) &&
    wrestlers.some(
      (wrestler) => wrestler.id === match.competitors[1].wrestlerId
    );

  const mainMatch = eventMatches.find(
    (match) => match.isMainEvent && hasRosterCompetitors(match)
  );
  if (mainMatch) return mainMatch;
  return eventMatches.find(hasRosterCompetitors);
}

function matchTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    singles: "Singles Match",
    "steel-cage": "Steel Cage Match",
    "tag-team": "Tag Team Match",
    ladder: "Ladder Match",
    submission: "Submission Match",
  };
  return labels[type] ?? type;
}

function MatchupStats({
  match,
  wrestlers,
}: {
  match: Match;
  wrestlers: Wrestler[];
}) {
  const w1 = wrestlers.find(
    (w) => w.id === match.competitors[0].wrestlerId
  );
  const w2 = wrestlers.find(
    (w) => w.id === match.competitors[1].wrestlerId
  );

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <div className="text-center">
        <p className="font-display text-sm font-bold text-foreground">
          {w1?.height}
        </p>
        <p className="font-body text-xs text-foreground-muted">HEIGHT</p>
      </div>
      <span className="font-display text-lg font-black text-accent-red">
        VS
      </span>
      <div className="text-center">
        <p className="font-display text-sm font-bold text-foreground">
          {w2?.height}
        </p>
        <p className="font-body text-xs text-foreground-muted">HEIGHT</p>
      </div>

      <div className="col-span-3 grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
        <div>
          <span className="text-foreground-muted">W1: </span>
          <span className="text-foreground">
            {w1?.record.wins}-{w1?.record.losses}-{w1?.record.draws}
          </span>
        </div>
        <div>
          <span className="text-foreground-muted">W2: </span>
          <span className="text-foreground">
            {w2?.record.wins}-{w2?.record.losses}-{w2?.record.draws}
          </span>
        </div>
      </div>
    </div>
  );
}
