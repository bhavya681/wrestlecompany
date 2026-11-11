import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Hero } from "@/components/hero/Hero";
import { FeaturedSuperstars } from "@/components/wrestlers/FeaturedSuperstars";
import { ChampionshipSpotlight } from "@/components/wrestlers/ChampionshipSpotlight";
import { championships, wrestlers, events, articles, matches, mediaItems, stories } from "@/data";
import { isChampion, isSinglesWrestler, isTagTeam } from "@/lib/roster";

function SectionHead({
  overline,
  title,
  href,
  linkLabel,
  invert = false,
}: {
  overline: string;
  title: ReactNode;
  href: string;
  linkLabel: string;
  invert?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-reveal>
      <div>
        <p className="im-eyebrow">{overline}</p>
        <h2
          className={[
            "mt-2 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]",
            invert ? "text-white" : "text-[var(--im-ink)]",
          ].join(" ")}
        >
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className={[
          "im-underline-link shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.16em]",
          invert ? "text-white/55 hover:text-white" : "text-[var(--im-muted)] hover:text-[var(--im-ink)]",
        ].join(" ")}
      >
        {linkLabel}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function Home() {
  const upcoming = events.find((event) => event.status === "upcoming");
  const champions = championships.filter((championship) => championship.currentChampion);
  const featuredWrestlers = wrestlers
    .filter((wrestler) => isSinglesWrestler(wrestler) && wrestler.status === "active")
    .sort((a, b) => (isChampion(b) ? 1 : 0) - (isChampion(a) ? 1 : 0))
    .slice(0, 6);
  const featuredTeams = wrestlers
    .filter((wrestler) => isTagTeam(wrestler) && wrestler.status === "active")
    .slice(0, 6);
  const featuredArticle = articles.find((article) => article.featured) || articles[0];
  const latestNews = articles.filter((article) => article.id !== featuredArticle?.id).slice(0, 3);
  const recentResults = matches.filter((match) => match.result?.winner).slice(0, 4);
  const highlights = mediaItems.slice(0, 4);
  const activeStories = stories.filter((story) => story.status === "active").slice(0, 2);

  return (
    <>
      <Hero />

      {upcoming ? (
        <section
          className="relative isolate overflow-hidden border-b border-[var(--im-border)] bg-[#080808] text-white py-14 md:py-20 lg:py-28"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(193,39,45,0.25),transparent_55%)] im-grid-lines opacity-40"
          />
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-[3px] bg-[#C1272D]"
          />
          <div className="container-wide relative">
            <div className="grid gap-9 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
              <div className="relative mx-auto w-full max-w-md lg:mx-0" data-reveal>
                <div
                  aria-hidden
                  className="absolute -left-3 -top-3 hidden h-24 w-24 border-l-2 border-t-2 border-[#C1272D] sm:block"
                />
                <div className="im-poster-frame relative aspect-[2/3] shadow-[0_35px_80px_rgba(8,8,8,0.45)]">
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#C1272D] to-[#991B1B] blur opacity-30" aria-hidden />
                  <Image
                    src={upcoming.posterImage}
                    alt={`${upcoming.name} official poster`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 36vw"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute -right-2 -bottom-2 hidden h-24 w-24 border-b-2 border-r-2 border-[#C1272D] sm:block"
                />
              </div>

              <div data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
                <p className="im-eyebrow im-kicker-light">Featured Event</p>
                <h2 className="mt-3 font-display text-[clamp(2.8rem,8vw,6rem)] font-black uppercase leading-[0.84] tracking-[-0.03em] text-white">
                  {upcoming.name}
                </h2>
                {upcoming.tagline ? (
                  <p className="mt-4 font-display text-xl font-semibold uppercase tracking-[0.05em] text-[#DC2626] sm:text-2xl">
                    {upcoming.tagline}
                  </p>
                ) : null}
                <p className="mt-6 max-w-xl font-body text-sm leading-7 text-white/70 sm:text-base">
                  Championship stakes. Unfinished business. The next chapter of Indus Matworks unfolds
                  live in {upcoming.city}.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-px border border-[#27272A] bg-[#080808] sm:grid-cols-4">
                  {[
                    {
                      label: "Date",
                      value: new Date(upcoming.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      }),
                      sub: new Date(upcoming.date).getFullYear().toString(),
                    },
                    { label: "City", value: upcoming.city, sub: "India" },
                    { label: "Venue", value: upcoming.venue || "TBA", sub: "Live Arena" },
                    { label: "Status", value: "On Sale", sub: "Tickets" },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#0A0A0A] px-4 py-4.5 sm:px-5">
                      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#DC262D]">
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-lg font-bold uppercase leading-tight text-white">
                        {item.value}
                      </dd>
                      <dd className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/50">
                        {item.sub}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  <Link href={`/events/${upcoming.slug}`} className="im-btn im-btn-red">
                    Event Details
                  </Link>
                  <Link href="/events" className="im-btn im-btn-dark">
                    All Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-14 pt-0 md:py-20 lg:py-26">
        <div className="container-wide">
          <ChampionshipSpotlight />

          <div className="mt-10 grid gap-px border border-[var(--im-border)] bg-[var(--im-border)] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {champions.map((championship, index) => (
              <Link
                key={championship.id}
                href={`/roster/${championship.currentChampion!.wrestlerId}`}
                className="group relative bg-[var(--im-page)]"
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as CSSProperties}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--im-surface)]">
                  <Image
                    src={championship.currentChampion!.image}
                    alt={championship.currentChampion!.wrestler}
                    fill
                    className="object-cover object-top grayscale-[0.12] transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/15 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute right-4 top-2 max-w-[24%]">
                    <Image
                      src={championship.image}
                      alt=""
                      width={168}
                      height={74}
                      className="h-auto w-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#DC2626]">
                      {championship.shortName} Champion
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-bold uppercase leading-none text-white sm:text-3xl">
                      {championship.currentChampion!.wrestler}
                    </h3>
                    <p className="mt-1.5 font-body text-[11px] text-white/50">
                      {championship.currentChampion!.nickname || championship.division}
                    </p>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.25] bg-[#C1272D] transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-[var(--im-border)] px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--im-muted)]">
                    {championship.daysHeld} days · {championship.defenses} defenses
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-[10px] text-[var(--im-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#C1272D]"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-14 md:py-20 lg:py-26">
        <div className="container-wide">
          <SectionHead
            overline="Featured Superstars"
            title={
              <>
                The Faces
                <br />
                Of The Mat
              </>
            }
            href="/roster"
            linkLabel="View Full Roster"
          />

          <FeaturedSuperstars wrestlers={featuredWrestlers} />
        </div>
      </section>

      {featuredTeams.length > 0 ? (
        <section
          className="relative isolate overflow-hidden border-b border-[var(--im-border)] bg-[#080808] text-white py-14 md:py-20 lg:py-28"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(193,39,45,0.2),transparent_55%)] im-grid-lines opacity-30"
          />
          <div className="container-wide relative">
            <SectionHead
              overline="Tag Teams &amp; Factions"
              title={
                <>
                  United They
                  <br />
                  Dominate
                </>
              }
              href="/tag-teams"
              linkLabel="All Tag Teams"
              invert
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal>
              {featuredTeams.map((team, index) => (
                <Link
                  key={team.id}
                  href={`/roster/${team.id}`}
                  className="group relative overflow-hidden aspect-video border border-white/10 bg-white/5"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={team.image || team.imageFull || "/logo.png"}
                      alt={team.ringName}
                      fill
                      className="object-cover object-top grayscale-[0.3] transition-[filter,transform] duration-600 group-hover:scale-[1.05] group-hover:grayscale-0"
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
                      <span aria-hidden className="h-1.5 w-1.5 bg-white" />
                      Tag Team
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="font-display text-2xl font-bold uppercase leading-none text-white sm:text-3xl group-hover:text-[#DC262D] transition-colors">
                      {team.ringName}
                    </h3>
                    {team.members?.length ? (
                      <p className="mt-1.5 line-clamp-2 font-body text-[11px] text-white/60 sm:text-[12px]">
                        {team.members.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.2] bg-[#C1272D] transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {highlights.length > 0 ? (
        <section className="border-b border-[var(--im-border)] bg-[var(--im-surface)] py-14 md:py-20 lg:py-26">
          <div className="container-wide">
            <SectionHead
              overline="Media Hub"
              title={
                <>
                  Watch The
                  <br />
                  Action
                </>
              }
              href="/media"
              linkLabel="All Videos"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item, index) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden border border-[var(--im-border)] bg-[var(--im-page)] transition-colors hover:border-[#C1272D]/60"
                  data-reveal
                  style={{ "--reveal-delay": `${(index % 4) * 60}ms` } as CSSProperties}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover grayscale-[0.15] transition-transform duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition-colors group-hover:border-[#C1272D] group-hover:bg-[#C1272D]">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
                          <path d="M12 7 0 14V0z" />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#DC2626]">
                      {item.category.replace(/-/g, " ")}
                    </p>
                    <h3 className="mt-2 line-clamp-2 font-display text-lg font-bold uppercase leading-tight text-[var(--im-ink)] transition-colors group-hover:text-[#C1272D]">
                      {item.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {featuredArticle ? (
        <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-14 md:py-20 lg:py-26">
          <div className="container-wide">
            <SectionHead
              overline="Newsroom"
              title={
                <>
                  News &amp;
                  <br />
                  Developments
                </>
              }
              href="/news"
              linkLabel="All News"
            />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-10">
              <Link
                href={`/news/${featuredArticle.slug}`}
                className="group block"
                data-reveal
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-[var(--im-border)]">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent" aria-hidden />
                  <span className="absolute left-4 top-4 bg-[#C1272D] px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white">
                    {featuredArticle.category.replace(/-/g, " ")}
                  </span>
                </div>
                <div className="border-x border-b border-[var(--im-border)] p-5 sm:p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                    {featuredArticle.author} ·{" "}
                    {new Date(featuredArticle.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase leading-[0.94] text-[var(--im-ink)] transition-colors group-hover:text-[#C1272D]">
                    {featuredArticle.title}
                  </h3>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-[var(--im-muted)]">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </Link>

              <div className="divide-y divide-[var(--im-border)] border-y border-[var(--im-border)]" data-reveal>
                {latestNews.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug}`} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="relative h-[74px] w-[104px] shrink-0 overflow-hidden border border-[var(--im-border)]">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="104px"
                      />
                    </div>
                    <div className="min-w-0 py-0.5">
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#C1272D]">
                        {article.category.replace(/-/g, " ")}
                      </p>
                      <h3 className="mt-1.5 line-clamp-2 font-display text-base font-bold uppercase leading-tight text-[var(--im-ink)] transition-colors group-hover:text-[#C1272D]">
                        {article.title}
                      </h3>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--im-muted)]">
                        {new Date(article.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-b border-[var(--im-border)] bg-[var(--im-surface)] py-14 md:py-20 lg:py-26">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div data-reveal>
            <p className="im-eyebrow">Results Desk</p>
            <h2 className="mt-2 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
              Recent
              <br />
              Outcomes
            </h2>
            <p className="mt-4 max-w-md font-body text-sm leading-7 text-[var(--im-muted)]">
              Every fall, submission and decision recorded. Follow the results shaping the road to
              the next championship night.
            </p>
            <Link href="/results" className="im-btn im-btn-dark mt-7">
              Full Results Archive
            </Link>
          </div>

          <div className="divide-y divide-[var(--im-border)] border-y border-[var(--im-border)]" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
            {recentResults.map((match) => (
              <article key={match.id} className="group py-4 first:pt-0 last:pb-0">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--im-muted)]">
                  {match.eventName} ·{" "}
                  {new Date(match.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)] sm:text-2xl">
                  {match.competitors[0]?.wrestler}{" "}
                  <span className="text-[#C1272D]">vs</span> {match.competitors[1]?.wrestler}
                </h3>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--im-muted)]">
                  {match.result?.winner ? `Winner: ${match.result.winner}` : "Result pending"}
                  {match.result?.method ? ` · ${match.result.method.replace(/-/g, " ")}` : ""}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeStories.length > 0 ? (
        <section className="im-cinematic border-b border-white/10 py-14 md:py-20 lg:py-26">
          <div className="container-wide">
            <SectionHead
              overline="Storylines"
              title={
                <>
                  The Narratives
                  <br />
                  Behind The Ring
                </>
              }
              href="/stories"
              linkLabel="All Stories"
              invert
            />
            <div className="grid gap-px border border-white/12 bg-white/10 sm:grid-cols-2">
              {activeStories.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group bg-[#080808]"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" aria-hidden />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.25] bg-[#C1272D] transition-transform duration-300 group-hover:scale-x-100"
                      aria-hidden
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#DC2626]">
                      {story.subtitle}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none text-white transition-colors group-hover:text-white/70 sm:text-3xl">
                      {story.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative isolate overflow-hidden bg-[#C1272D] py-16 text-white md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 select-none font-display text-[clamp(12rem,28vw,28rem)] font-black leading-none text-transparent opacity-10 [-webkit-text-stroke:2px_#fff]"
        >
          IM
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2),transparent_62%)]"
        />
        <div aria-hidden className="im-noise absolute inset-0 opacity-20" />

        <div className="container-wide relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div data-reveal>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-white/70 sm:text-[10px]">
              The Next Chapter
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.7rem,7vw,5.6rem)] font-black uppercase leading-[0.86] tracking-[-0.03em]">
              This Is
              <br />
              Indus Matworks.
            </h2>
            <p className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-2xl">
              The Future Of Wrestling Starts Here.
            </p>
            <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/75 sm:text-base">
              Professional wrestling built around championship competition, fearless athletes, and
              an Indian identity made for the global stage.
            </p>
          </div>

          <div
            className="border border-white/25 bg-black/10 p-5 backdrop-blur-sm"
            data-reveal
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/60">
              The Roster Awaits
            </p>

            <Link
              href="/roster"
              className="group mt-7 flex items-end justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="font-display text-2xl font-black uppercase leading-[0.92] sm:text-3xl">
                Discover
                <br />
                The Roster
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 font-mono text-sm transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#C1272D]">
                <span aria-hidden>→</span>
              </span>
            </Link>

            <div className="mt-6 grid grid-cols-2 gap-2 border-t border-white/25 pt-5">
              <Link
                href="/about"
                className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
              >
                Our Story
              </Link>
              <Link
                href="/events"
                className="text-right font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
