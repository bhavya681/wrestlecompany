import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { championships } from "@/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return championships.map((championship) => ({ slug: championship.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const championship = championships.find((item) => item.id === slug);
  if (!championship) return { title: "Not Found" };
  return {
    title: championship.name,
    description: `${championship.name} — current champion, reign statistics, defenses and complete title history from Indus Matworks.`,
  };
}

export default async function ChampionshipPage({ params }: PageProps) {
  const { slug } = await params;
  const championship = championships.find((item) => item.id === slug);
  if (!championship) notFound();

  const champion = championship.currentChampion;
  const mostDefenses = [...championship.history].sort((a, b) => b.defenses - a.defenses)[0];
  const longestReign = [...championship.history].sort((a, b) => b.days - a.days)[0];
  const firstReign = [...championship.history].sort((a, b) => a.from.localeCompare(b.from))[0];

  return (
    <>
      <section className="im-cinematic relative isolate overflow-hidden border-b border-white/10">
        <div aria-hidden className="im-grid-lines absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="absolute -right-[8%] top-0 h-full w-[55%] bg-[#991B1B]/25 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 right-0 select-none font-display text-[clamp(10rem,24vw,22rem)] font-black leading-none text-transparent opacity-[0.05] [-webkit-text-stroke:1px_#fff]"
        >
          {championship.shortName.charAt(0)}
        </div>

        <div className="container-wide relative z-10 pb-12 pt-6 md:pb-16">
          <Link
            href="/championships"
            className="inline-flex min-h-10 items-center gap-2 border border-white/15 bg-black/20 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-[#C1272D] hover:text-white"
          >
            <span aria-hidden>←</span> All Championships
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,.85fr)] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#DC2626]">
                {championship.division || "Championship"} · {championship.weightClass}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.7rem,7vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-white">
                {championship.name}
              </h1>
              {champion ? (
                <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4">
                  <div>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white/40">
                      Current Champion
                    </p>
                    <Link
                      href={`/roster/${champion.wrestlerId}`}
                      className="mt-1.5 block font-display text-3xl font-bold uppercase leading-none text-white transition-colors hover:text-[#DC2626]"
                    >
                      {champion.wrestler}
                    </Link>
                    {champion.nickname ? (
                      <p className="mt-2 font-body text-sm text-white/50">“{champion.nickname}”</p>
                    ) : null}
                  </div>
                  <div className="flex gap-6 border-l border-white/15 pl-6">
                    <div>
                      <p className="font-display text-3xl font-black leading-none text-[#DC2626]">
                        {championship.daysHeld}
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/40">
                        Days Held
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-3xl font-black leading-none text-white">
                        {championship.defenses}
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/40">
                        Defenses
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-6 font-display text-2xl font-bold uppercase text-white/60">
                  Championship Vacant
                </p>
              )}
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,39,45,0.3),transparent_62%)]"
              />
              <Image
                src={championship.image}
                alt={`${championship.name} belt`}
                width={520}
                height={260}
                className="relative mx-auto h-auto w-full object-contain drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-12 md:py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
          <div>
            <p className="im-eyebrow">Champion Profile</p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase leading-none text-[var(--im-ink)] sm:text-4xl">
              The Reign
            </h2>
            {champion ? (
              <Link
                href={`/roster/${champion.wrestlerId}`}
                className="group mt-6 block overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={champion.image}
                    alt={champion.wrestler}
                    fill
                    className="object-cover object-top grayscale-[0.12] transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#DC2626]">
                      Reign #{championship.reign}
                    </p>
                    <h3 className="mt-1.5 font-display text-3xl font-bold uppercase leading-none text-white">
                      {champion.wrestler}
                    </h3>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#C1272D]" aria-hidden />
                </div>
              </Link>
            ) : null}
          </div>

          <div>
            <div className="grid gap-px border border-[var(--im-border)] bg-[var(--im-border)] sm:grid-cols-2">
              {[
                { label: "Days Held", value: String(championship.daysHeld) },
                { label: "Defenses", value: String(championship.defenses) },
                { label: "Reign", value: `#${championship.reign}` },
                { label: "Division", value: championship.division || "Open" },
              ].map((item) => (
                <div key={item.label} className="bg-[var(--im-page)] px-4 py-5">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-display text-2xl font-bold uppercase leading-none text-[var(--im-ink)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-[var(--im-border)] bg-[var(--im-surface)] p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#C1272D]">
                Most Recent Defense
              </p>
              {championship.lastDefense ? (
                <div className="mt-3">
                  <p className="font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)]">
                    vs {championship.lastDefense.opponent}
                  </p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--im-muted)]">
                    {championship.lastDefense.event} ·{" "}
                    {new Date(championship.lastDefense.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ) : (
                <p className="mt-3 font-body text-sm text-[var(--im-muted)]">
                  No title defense recorded for this reign.
                </p>
              )}
            </div>

            <div className="mt-5 border border-[var(--im-border)] bg-[var(--im-page)] p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#C1272D]">
                Title Facts
              </p>
              <dl className="mt-3 space-y-3 font-body text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--im-border)] pb-2.5">
                  <dt className="text-[var(--im-muted)]">Longest reign</dt>
                  <dd className="text-right font-display font-bold uppercase text-[var(--im-ink)]">
                    {longestReign ? `${longestReign.champion} · ${longestReign.days}d` : "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--im-border)] pb-2.5">
                  <dt className="text-[var(--im-muted)]">Most defenses</dt>
                  <dd className="text-right font-display font-bold uppercase text-[var(--im-ink)]">
                    {mostDefenses ? `${mostDefenses.champion} · ${mostDefenses.defenses}` : "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[var(--im-muted)]">First recorded champion</dt>
                  <dd className="text-right font-display font-bold uppercase text-[var(--im-ink)]">
                    {firstReign ? firstReign.champion : "—"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--im-surface)] py-12 md:py-16">
        <div className="container-wide">
          <p className="im-eyebrow">Complete History</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
            Every Reign
          </h2>

          <ol className="mt-8 border border-[var(--im-border)] bg-[var(--im-page)]">
            {championship.history.map((reign, index) => {
              const current = reign.to === null;
              return (
                <li
                  key={`${reign.champion}-${index}`}
                  className={[
                    "grid gap-3 border-b border-[var(--im-border)] p-5 last:border-b-0 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:p-6",
                    current ? "bg-[#C1272D]/5" : "",
                  ].join(" ")}
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-[var(--im-border)] font-display text-lg font-black text-[var(--im-ink)]">
                    {String(reign.reign).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)] sm:text-2xl">
                      {reign.champion}
                      {current ? (
                        <span className="ml-2 border border-[#C1272D]/40 bg-[#C1272D]/10 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#C1272D]">
                          Current
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--im-muted)]">
                      {reign.from} — {reign.to || "Present"}
                      {reign.opponent ? ` · final defense vs ${reign.opponent}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--im-muted)]">
                    <span>
                      <strong className="block font-display text-base text-[var(--im-ink)]">{reign.days}</strong>
                      Days
                    </span>
                    <span>
                      <strong className="block font-display text-base text-[var(--im-ink)]">
                        {reign.defenses}
                      </strong>
                      Defenses
                    </span>
                  </div>
                </li>
              );
            })}
            {championship.history.length === 0 ? (
              <li className="p-6 font-body text-sm text-[var(--im-muted)]">No recorded title history.</li>
            ) : null}
          </ol>
        </div>
      </section>

      <section className="bg-[#C1272D] py-12 text-white md:py-16">
        <div className="container-wide flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
              The Next Challenger
            </p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase leading-none sm:text-4xl">
              Who takes the gold next?
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/roster" className="im-btn im-btn-light">
              Meet The Roster
            </Link>
            <Link href="/events" className="im-btn im-btn-outline">
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
