import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { NextEventSection } from "@/components/events/NextEventSection";
import { Matchup } from "@/components/matches/Matchup";
import { WrestlerCard } from "@/components/wrestlers/WrestlerCard";
import { ChampionshipCard } from "@/components/championships/ChampionshipCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { NewsCard } from "@/components/news/NewsCard";
import { ResultCard } from "@/components/results/ResultCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getMatchTypeLabel, formatDate } from "@/lib/utils";
import {
  events,
  matches,
  wrestlers,
  championships,
  articles,
  stories,
} from "@/data";

const upcomingEvent = events.find((e) => e.status === "upcoming");
const featuredMatch =
  matches.find(
    (m) => m.eventId === upcomingEvent?.id && m.isMainEvent
  ) || matches.find((m) => m.eventId === upcomingEvent?.id);

const rosterPreviewIds = [
  "arjun-rao",
  "vikram-singh",
  "kabir-khan",
  "dev-malhotra",
  "riya-sharma",
  "ananya-desai",
  "sameer-verma",
  "mumbai-mavericks",
];
const rosterPreview = wrestlers.filter((w) =>
  rosterPreviewIds.includes(w.id)
);

const activeStories = stories.filter((s) => s.status === "active");

const featuredArticle = articles.find((a) => a.featured);
const secondaryArticles = articles.filter((a) => !a.featured).slice(0, 3);

const recentResults = matches.filter(
  (m) =>
    m.result.winner !== "" && m.rating !== undefined && m.rating > 0
);
const resultsToShow = recentResults.slice(0, 4);

export default function Home() {
  return (
    <>
      <Hero />

      <NextEventSection />

      <section className="border-y border-border bg-background-secondary py-16 md:py-24">
        <div className="container-wide">
          <SectionHeader
            title={
              <>
                FEATURED
                <br className="hidden sm:block" /> MATCH
              </>
            }
            subtitle="MAIN EVENT • IM: AFTERMATH • STEEL CAGE"
            align="center"
          />

          {featuredMatch && (
            <>
              <div className="mt-12">
                <Matchup
                  match={featuredMatch}
                  wrestlers={wrestlers}
                />
              </div>

              <div className="mt-12 text-center">
                <p className="font-display text-sm font-bold uppercase text-accent-red">
                  {getMatchTypeLabel(featuredMatch.type)}
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-foreground">
                  {featuredMatch.competitors[0].wrestler}{" "}
                  <span className="text-accent-red">VS</span>{" "}
                  {featuredMatch.competitors[1].wrestler}
                </p>
                <p className="mt-2 font-body text-sm text-foreground-muted">
                  {formatDate(featuredMatch.date)} •{" "}
                  {featuredMatch.city}
                </p>
                <div className="mt-6">
                  <Button variant="primary" size="lg" asChild>
                    <Link href={`/events/${upcomingEvent?.slug || "aftermath"}`}>
                      View Event Details
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Roster Preview */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <SectionHeader
            title={
              <>
                MEET THE
                <br className="hidden sm:block" /> ROSTER
              </>
            }
            subtitle="Real athletes. Real rivalries."
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {rosterPreview.map((wrestler) => (
              <WrestlerCard
                key={wrestler.id}
                wrestler={wrestler}
                variant="compact"
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/roster">VIEW FULL ROSTER</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Championships */}
      <section className="border-y border-border bg-background-secondary py-16 md:py-24">
        <div className="container-wide">
          <SectionHeader
            title={
              <>
                THE
                <br className="hidden sm:block" /> TITLES
              </>
            }
            subtitle="Four championships. Four stories. One legacy."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {championships.map((champ) => (
              <ChampionshipCard
                key={champ.id}
                championship={champ}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <SectionHeader
            title={
              <>
                THE
                <br className="hidden sm:block" /> STORIES
              </>
            }
            subtitle="Every rivalry has a beginning."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="default" />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-y border-border bg-background-secondary py-16 md:py-24">
        <div className="container-wide">
          <SectionHeader
            title={
              <>
                LATEST
                <br className="hidden sm:block" /> NEWS
              </>
            }
            subtitle="Editorial coverage from across the IM universe."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticle && (
              <NewsCard article={featuredArticle} variant="featured" />
            )}
            {secondaryArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="default" />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/news">ALL NEWS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <SectionHeader
            title={
              <>
                RECENT
                <br className="hidden sm:block" /> RESULTS
              </>
            }
            subtitle="The latest outcomes from across India."
          />

          <div className="mt-12 space-y-4">
            {resultsToShow.map((match) => (
              <ResultCard
                key={match.id}
                match={match}
                wrestlers={wrestlers}
                expanded={true}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/results">VIEW ALL RESULTS</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
