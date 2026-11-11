import Image from "next/image";
import Link from "next/link";
import type { Championship } from "@/types";

interface ChampionshipCardProps {
  championship: Championship;
  variant?: "default" | "compact";
  onClick?: () => void;
}

export function ChampionshipCard({ championship, variant = "default" }: ChampionshipCardProps) {
  const champion = championship.currentChampion;
  const href = `/championships/${championship.id}`;

  if (variant === "compact") {
    return (
      <div className="group flex items-center gap-4 border border-[var(--im-border)] bg-[var(--im-page)] p-4 transition-colors hover:border-[#C1272D]/40">
        <div className="relative h-14 w-20 shrink-0">
          <Image src={championship.image} alt={championship.name} fill className="object-contain" sizes="80px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)]">
            {championship.shortName}
          </p>
          <h3 className="mt-1 truncate font-display text-lg font-bold uppercase text-[var(--im-ink)]">
            {championship.name}
          </h3>
          <p className="mt-1 truncate font-body text-sm text-[var(--im-muted)]">{champion?.wrestler || "Vacant"}</p>
        </div>
        <Link
          href={href}
          className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#C1272D] hover:text-[var(--im-ink)]"
        >
          View
        </Link>
      </div>
    );
  }

  return (
    <article
      id={championship.id}
      className="group scroll-mt-28 overflow-hidden border border-[var(--im-border)] bg-[var(--im-page)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.1)]"
    >
      <div className="grid md:grid-cols-[240px_1fr]">
        <Link
          href={href}
          className="relative flex min-h-[200px] items-center justify-center overflow-hidden border-b border-white/10 bg-[#080808] p-6 md:min-h-[260px] md:border-b-0 md:border-r"
          aria-label={`${championship.name} details`}
        >
          <div className="im-grid-lines absolute inset-0 opacity-40" aria-hidden />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(193,39,45,0.25),transparent_60%)]"
          />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[#C1272D]" aria-hidden />
          <Image
            src={championship.image}
            alt={championship.name}
            width={260}
            height={130}
            className="relative h-auto w-full max-w-[190px] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#C1272D]">
              {championship.division || championship.shortName}
            </p>
            <span className="border border-[var(--im-border)] px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--im-muted)]">
              {championship.weightClass}
            </span>
          </div>

          <h3 className="mt-2 font-display text-[clamp(1.55rem,3vw,2rem)] font-bold uppercase leading-[0.95] text-[var(--im-ink)]">
            <Link href={href} className="transition-colors hover:text-[#C1272D]">
              {championship.name}
            </Link>
          </h3>

          {champion ? (
            <>
              <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-[var(--im-muted)]">
                Current Champion
              </p>
              {champion.wrestlerId ? (
                <Link
                  href={`/roster/${champion.wrestlerId}`}
                  className="mt-1 font-display text-2xl font-bold uppercase leading-none text-[var(--im-ink)] transition-colors hover:text-[#C1272D]"
                >
                  {champion.wrestler}
                </Link>
              ) : (
                <p className="mt-1 font-display text-2xl font-bold uppercase leading-none text-[var(--im-ink)]">
                  {champion.wrestler}
                </p>
              )}
              {champion.nickname ? (
                <p className="mt-1.5 font-body text-xs text-[var(--im-muted)]">{champion.nickname}</p>
              ) : null}

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--im-border)] pt-4">
                <Stat label="Reign" value={`#${championship.reign}`} />
                <Stat label="Days" value={String(championship.daysHeld)} />
                <Stat label="Defenses" value={String(championship.defenses)} />
              </div>
            </>
          ) : (
            <p className="mt-4 font-body text-sm text-[var(--im-muted)]">Championship currently vacant.</p>
          )}

          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--im-ink)] transition-colors hover:text-[#C1272D]"
          >
            Full Title History <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{label}</p>
      <p className="mt-1 font-display text-lg font-bold text-[var(--im-ink)]">{value}</p>
    </div>
  );
}
