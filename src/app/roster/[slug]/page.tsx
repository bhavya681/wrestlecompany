import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { VideoCard } from "@/components/media/VideoCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";
import { cn, formatDate, getMatchTypeLabel } from "@/lib/utils";
import { getNameLines, getRecord, getWinRate, hasValue, isChampion } from "@/lib/roster";
import { wrestlers, matches, events, championships, stories, mediaItems } from "@/data";
import type { Championship, Match, Wrestler } from "@/types";

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return wrestlers.map((wrestler) => ({ slug: wrestler.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wrestler = wrestlers.find((item) => item.id === slug);
  if (!wrestler) return { title: "Not Found" };
  const imageUrl = wrestler.imageFull || wrestler.image;
  return {
    title: wrestler.ringName,
    description: wrestler.bio,
    openGraph: { title: wrestler.ringName, description: wrestler.bio, images: imageUrl ? [{ url: imageUrl }] : [] },
  };
}

export default async function WrestlerProfile({ params }: PageProps) {
  const { slug } = await params;
  const wrestler = wrestlers.find((item) => item.id === slug);
  if (!wrestler) notFound();

  const record = getRecord(wrestler);
  const winRate = getWinRate(wrestler);
  const winRateLabel = record.total > 0 ? `${winRate}%` : "N/A";
  const champion = isChampion(wrestler);
  const nameLines = getNameLines(wrestler.ringName);

  const roleLabel =
    wrestler.role === "manager" ? "Manager" :
    wrestler.role === "tag-team" ? "Tag Team" :
    wrestler.role === "referee" ? "Official" :
    wrestler.role === "announcer" ? "Ring Announcer" :
    wrestler.role === "commentator" || wrestler.role === "commentators" ? "Commentator" : "Wrestler";

  const wrestlerMatches = matches
    .filter((match) => match.competitors.some((c) => c.wrestlerId === wrestler.id) && match.result.winner !== "")
    .sort((a, b) => b.date.localeCompare(a.date));

  const wrestlerChampionships = championships.filter((c) =>
    wrestler.championships.includes(c.id) || c.currentChampion?.wrestlerId === wrestler.id
  );

  const relatedStories = stories.filter((story) => story.participants.includes(wrestler.id));
  const rivals = wrestler.rivalries
    .map((id) => wrestlers.find((r) => r.id === id))
    .filter((r): r is Wrestler => Boolean(r));
  const relatedMedia = wrestler.relatedMedia
    .map((id) => mediaItems.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const attributes = [
    { label: "Ring Name", value: wrestler.ringName },
    { label: "Billed From", value: wrestler.from },
    { label: "Height", value: wrestler.height },
    { label: "Weight", value: wrestler.weight },
    { label: "Division", value: wrestler.division },
    { label: "Style", value: wrestler.style },
    { label: "Finisher", value: wrestler.finisher },
    { label: "Debut", value: wrestler.debut },
    { label: "Status", value: wrestler.status },
  ].filter((a) => hasValue(a.value));

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-64px)] flex-col overflow-hidden border-b border-[#27272A] bg-[#080808] text-white sm:min-h-[calc(100svh-68px)]">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(193,39,45,0.22),transparent_42%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#080808_0%,#080808_28%,rgba(8,8,8,0.86)_52%,rgba(8,8,8,0.35)_100%)] lg:bg-[linear-gradient(90deg,#080808_0%,#080808_34%,rgba(8,8,8,0.72)_58%,rgba(8,8,8,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.18)_0%,rgba(8,8,8,0)_30%,rgba(8,8,8,0.55)_78%,#080808_100%)]" />
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#C1272D] to-transparent opacity-80" />
        </div>

        <div className="container-wide relative z-10 pt-6 sm:pt-8">
          <Link href="/roster" className="inline-flex min-h-10 items-center gap-2 border border-white/15 bg-black/20 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm transition-colors hover:border-[#C1272D] hover:text-white">
            <span aria-hidden>&larr;</span> Back to Roster
          </Link>
        </div>

        <div className="container-wide relative z-10 grid flex-1 items-end gap-8 pb-10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,42vw)] lg:pb-14 lg:pt-10">
          <div className="min-w-0 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={wrestler.status === "active" ? "red" : "white"} size="sm">{wrestler.status}</Badge>
              <Badge variant={champion ? "dark" : "white"} size="sm">{roleLabel}</Badge>
              <Badge variant="white" size="sm">{wrestler.division}</Badge>
              {champion && <Badge variant="red" size="sm">Champion</Badge>}
            </div>

            {nameLines.kicker && <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#C1272D]">{nameLines.kicker}</p>}
            <h1 className="im-display mt-2 text-[clamp(3rem,11vw,7.5rem)] leading-[0.86] text-white">{nameLines.display || wrestler.ringName}</h1>
            {wrestler.nickname && hasValue(wrestler.nickname) && (
              <p className="mt-3 font-display text-xl font-semibold uppercase tracking-[0.04em] text-white/62 sm:text-2xl md:text-3xl">“{wrestler.nickname}”</p>
            )}
            <span className="mt-5 block h-[2px] w-16 bg-[#C1272D]" aria-hidden />

            <p className="mt-6 max-w-2xl font-body text-sm leading-7 text-white/68 sm:text-base">{wrestler.bio}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-4">
              <QuickStat label="Wins" value={record.wins} />
              <QuickStat label="Losses" value={record.losses} />
              <QuickStat label="Draws" value={record.draws} />
              <QuickStat label="Win Rate" value={winRateLabel} accent />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:h-full lg:max-w-none">
            <div className="relative aspect-[3/4] min-h-[360px] overflow-hidden border border-[#27272A] bg-[#141414] shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:min-h-[460px] lg:aspect-auto lg:h-full lg:min-h-[min(78svh,760px)]">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(255,255,255,0.08),transparent_52%)]" />
              <WrestlerPortrait wrestler={wrestler} mask="hero" priority halo sizes="(max-width:1024px) 92vw, 52vw" className="h-full w-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1272D]" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-12 md:py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1272D]">Biography</p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-[var(--im-ink)]">Profile &amp; Background</h2>
            <p className="mt-5 max-w-3xl font-body text-base leading-8 text-[var(--im-muted)]">{wrestler.bio}</p>
            {wrestler.members?.length ? (
              <div className="mt-8 border border-[var(--im-border)] bg-[var(--im-surface)] p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--im-muted)]">Members</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {wrestler.members.map((m) => <span key={m} className="border border-[var(--im-border)] bg-[var(--im-page)] px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-[0.04em] text-[var(--im-ink)]">{m}</span>)}
                </div>
              </div>
            ) : null}
          </div>
          <aside className="h-fit border border-[var(--im-border)] bg-[var(--im-surface)] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#C1272D]">Athlete Details</p>
            <dl className="mt-4 divide-y divide-[var(--im-border)]">
              {attributes.map((a) => (
                <div key={a.label} className="grid grid-cols-[110px_1fr] gap-3 py-3">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{a.label}</dt>
                  <dd className="font-body text-sm text-[var(--im-ink)]">{a.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[110px_1fr] gap-3 py-3">
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">Record</dt>
                <dd className="font-body text-sm text-[var(--im-ink)]">{record.wins}W-{record.losses}L-{record.draws}D ({winRateLabel})</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {wrestlerChampionships.length > 0 && (
        <section className="border-b border-[var(--im-border)] bg-[var(--im-surface)] py-12 md:py-16">
          <div className="container-wide">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1272D]">Championships</p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-[var(--im-ink)]">Title Legacy</h2>
            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {wrestlerChampionships.map((c) => <ChampionshipBlock key={c.id} championship={c} isCurrent={c.currentChampion?.wrestlerId === wrestler.id} />)}
            </div>
          </div>
        </section>
      )}

      {rivals.length > 0 && (
        <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-12 md:py-16">
          <div className="container-wide">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1272D]">Rivalries</p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-[var(--im-ink)]">Key Opponents</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rivals.map((r) => (
                <Link key={r.id} href={`/roster/${r.id}`} className="group flex items-center gap-4 border border-[var(--im-border)] bg-[var(--im-page)] p-3 transition-colors hover:border-[#C1272D]/45">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]"><WrestlerPortrait wrestler={r} mask="none" sizes="64px" className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]" /></div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-xl font-bold uppercase text-[var(--im-ink)] group-hover:text-[#C1272D]">{r.ringName}</p>
                    <p className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--im-muted)]">{r.division}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-[#252525] bg-[#080808] py-12 text-white md:py-16">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">Match History</p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-white">Recorded Matches</h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">{wrestlerMatches.length} matches</p>
          </div>
          <div className="mt-8 space-y-3">
            {wrestlerMatches.length ? wrestlerMatches.map((m) => <MatchHistoryItem key={m.id} match={m} wrestler={wrestler} />) : (
              <div className="border border-[#27272A] bg-[#141414] p-6 font-body text-sm text-white/62">No completed matches on record.</div>
            )}
          </div>
        </div>
      </section>

      {(relatedStories.length > 0 || relatedMedia.length > 0) && (
        <section className="bg-[var(--im-page)] py-12 md:py-16">
          <div className="container-wide grid gap-10 lg:grid-cols-2">
            {relatedStories.length > 0 && (
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1272D]">Stories</p>
                <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-[var(--im-ink)]">Related Narratives</h2>
                <div className="mt-6 space-y-4">{relatedStories.map((s) => <StoryCard key={s.id} story={s} />)}</div>
              </div>
            )}
            {relatedMedia.length > 0 && (
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#C1272D]">Media</p>
                <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-[var(--im-ink)]">Related Media</h2>
                <div className="mt-6 grid gap-4">{relatedMedia.map((m) => <VideoCard key={m.id} item={m} variant="compact" />)}</div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

function QuickStat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="border border-[#27272A] bg-[#141414] px-4 py-4">
      <p className={cn("font-display text-3xl font-bold", accent ? "text-[#C1272D]" : "text-white")}>{value}</p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">{label}</p>
    </div>
  );
}

function ChampionshipBlock({ championship, isCurrent }: { championship: Championship; isCurrent: boolean }) {
  return (
    <article className="border border-[var(--im-border)] bg-[var(--im-page)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="relative h-14 w-36 shrink-0">
          <Image src={championship.image} alt={championship.name} fill className="object-contain object-left" sizes="144px" />
        </div>
        <Badge variant={isCurrent ? "red" : "default"} size="sm">{isCurrent ? "Current Champion" : "Title History"}</Badge>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold uppercase text-[var(--im-ink)]">{championship.name}</h3>
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--im-border)] pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
        <p>Reign <strong className="block mt-1 font-display text-xl text-[var(--im-ink)]">#{championship.reign}</strong></p>
        <p>Days <strong className="block mt-1 font-display text-xl text-[var(--im-ink)]">{championship.daysHeld}</strong></p>
        <p>Defenses <strong className="block mt-1 font-display text-xl text-[var(--im-ink)]">{championship.defenses}</strong></p>
      </div>
    </article>
  );
}

function MatchHistoryItem({ match, wrestler }: { match: Match; wrestler: Wrestler }) {
  const opponent = match.competitors.find((c) => c.wrestlerId !== wrestler.id);
  const opponentW = opponent ? wrestlers.find((w) => w.id === opponent.wrestlerId) : null;
  const win = match.result.winner === wrestler.id;
  const draw = match.result.winner === "draw";
  const event = events.find((e) => e.id === match.eventId);
  const label = draw ? "Draw" : win ? "Win" : "Loss";
  return (
    <article className="grid gap-4 border border-[#27272A] bg-[#141414] p-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
      <div className={cn("inline-flex h-11 w-11 items-center justify-center border font-display text-xl font-bold", win ? "border-[#C1272D]/50 text-[#C1272D]" : "border-[#27272A] text-white/55")}>{draw ? "D" : win ? "W" : "L"}</div>
      <div className="min-w-0">
        <p className="font-display text-xl font-bold uppercase leading-tight text-white">
          {wrestler.ringName} <span className="text-[#C1272D]">vs</span> {opponentW?.ringName || opponent?.wrestler || "Unknown Opponent"}
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/52">
          {event?.name || match.eventName} · {match.city} · {formatDate(match.date)} · {getMatchTypeLabel(match.type)}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-[#252525] pt-3 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-4 md:pt-0">
        <span className={cn("border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em]", win ? "border-[#C1272D]/40 text-[#C1272D]" : "border-[#27272A] text-white/55")}>{label}</span>
        <div className="text-right">
          {!draw && <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/52">{match.result.method}{match.result.time ? ` · ${match.result.time}` : ""}</p>}
          {match.rating ? <div className="mt-1 flex justify-end"><RatingStars rating={match.rating} size="sm" /></div> : null}
        </div>
      </div>
    </article>
  );
}
