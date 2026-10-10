
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  WrestlerPortrait,
  portraitToWrestler,
} from "@/components/wrestlers/WrestlerPortrait";
import { championships } from "@/data";
import type { Championship } from "@/types";
import worldChampionship from "@/app/world_championship.png";
import divaWorldChampionship from "@/app/diva_world_chamionship.png";
import maleTagTeam from "@/app/male_tag_team.png";
import divaTagTeam from "@/app/diva_tag_team.png";
import nationalChampionship from "@/app/national_championship.png";

const BELT_IMAGES = {
  "im world championship": worldChampionship,
  "im women's world championship": divaWorldChampionship,
  "im men's tag team championship": maleTagTeam,
  "im women's tag team championship": divaTagTeam,
  "im national championship": nationalChampionship,
};

function getBeltImage(championship: Championship) {
  const name = championship.name.trim().toLowerCase();

  return BELT_IMAGES[
    name as keyof typeof BELT_IMAGES
  ] ?? championship.image;
}

export function ChampionshipSpotlight() {
  const featured = championships.filter(
    (championship) => championship.currentChampion
  );

  if (featured.length === 0) return null;

  return (
    <section
      aria-labelledby="championship-spotlight-heading"
      className="relative isolate overflow-hidden border-y border-border bg-[#080808] py-10 sm:py-12 lg:py-14"
    >
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.10),transparent_55%)]" />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(193,39,45,0.09),transparent_70%)] blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07),transparent_70%)] blur-3xl" />
      </div>

      <div className="container-wide relative">
        {/* Section heading */}
        <header className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-accent-gold"
              />
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-accent-gold sm:text-[10px]">
                The Ones Who Reign
              </p>
            </div>

            <h2
              id="championship-spotlight-heading"
              className="font-display text-3xl font-black uppercase leading-none tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Champions{" "}
              <span className="text-accent-gold">
                of the Throne.
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-muted">
              The title holders of Indus Matworks. Every reign has a
              legacy to defend.
            </p>
          </div>

          <Link
            href="/championships"
            className={cn(
              "group inline-flex min-h-10 w-fit shrink-0 items-center gap-3 border border-border px-4 py-2.5",
              "font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-foreground-muted",
              "transition-colors hover:border-accent-gold/60 hover:text-accent-gold",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            )}
          >
            All Championships
            <span
              aria-hidden="true"
              className="text-accent-gold transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </header>

        {/* Horizontal championship carousel */}
        <div>
          <div
            aria-label="Current championship holders"
            className={cn(
              "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4",
              "scroll-smooth [scrollbar-color:rgba(212,175,55,0.45)_transparent] [scrollbar-width:thin]",
              "sm:gap-5"
            )}
          >
            {featured.map((championship, index) => (
              <ChampionCard
                key={championship.id}
                championship={championship}
                index={index}
              />
            ))}
          </div>

          <p className="mt-1 text-right font-mono text-[8px] uppercase tracking-[0.16em] text-foreground-muted sm:text-[9px]">
            <span aria-hidden="true">← </span>
            Swipe or scroll to explore
            <span aria-hidden="true"> →</span>
          </p>
        </div>

        {/* Brand footer */}
        <div className="mt-4 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-gradient-to-r from-accent-gold/30 to-transparent"
          />

          <p className="shrink-0 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-foreground-muted sm:text-[9px] sm:tracking-[0.2em]">
            Wrestling From India. Built For The World.
          </p>

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-gradient-to-l from-accent-gold/30 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}

function ChampionCard({
  championship,
  index,
}: {
  championship: Championship;
  index: number;
}) {
  const champion = championship.currentChampion;

  if (!champion) return null;

  const wrestler = portraitToWrestler({
    wrestlerId: champion.wrestlerId,
    wrestlerName: champion.wrestler,
    wrestlerNickname: champion.nickname,
    wrestlerImage: champion.image,
  });

  const beltImage = getBeltImage(championship);

  return (
    <article className="w-[270px] shrink-0 snap-start sm:w-[300px] lg:w-[320px]">
      <Link
        href={`/roster/${champion.wrestlerId}`}
        aria-label={`View ${champion.wrestler}, reigning ${championship.name} champion`}
        className={cn(
          "group relative block h-full overflow-hidden border border-white/10 bg-[#0b0b0c]",
          "transition-colors duration-300 hover:border-accent-gold/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
        )}
      >
        <div className="h-[3px] bg-gradient-to-r from-accent-gold/20 via-accent-gold to-accent-gold/20" />

        {/* Transparent championship belt showcase */}
        <div className="relative isolate flex h-[170px] items-center justify-center overflow-hidden border-b border-white/[0.08] bg-[#101011] px-4 sm:h-[185px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(212,175,55,0.20),transparent_65%)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(135deg,white_1px,transparent_1px)] [background-size:14px_14px]"
          />

          <span
            aria-hidden="true"
            className="absolute left-3 top-3 z-10 font-mono text-[8px] tracking-[0.18em] text-white/35"
          >
            IM / TITLE {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative h-[135px] w-full transition-transform duration-500 ease-out group-hover:scale-[1.06] sm:h-[150px]">
            <Image
              src={beltImage}
              alt={`${championship.name} championship belt`}
              fill
              sizes="(max-width: 639px) 270px, (max-width: 1023px) 300px, 320px"
              className="object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.75)]"
              priority={index === 0}
            />
          </div>

          <span className="absolute bottom-2 left-1/2 z-10 max-w-[90%] -translate-x-1/2 truncate border border-accent-gold/25 bg-black/70 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-accent-gold backdrop-blur-sm">
            {championship.shortName}
          </span>
        </div>

        {/* Champion portrait */}
        <div className="relative isolate h-[215px] overflow-hidden sm:h-[235px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,255,255,0.06),transparent_65%),linear-gradient(180deg,#151515,#0b0b0c)]"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 top-2 font-display text-[90px] font-black leading-none text-white/[0.035]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute inset-x-0 bottom-0 top-0">
            <WrestlerPortrait
              wrestler={wrestler}
              mask="none"
              sizes="(max-width: 639px) 270px, (max-width: 1023px) 300px, 320px"
              className="h-full w-full object-contain object-bottom grayscale-[20%] transition-all duration-500 group-hover:scale-[1.035] group-hover:grayscale-0"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0b0c]"
          />

          <div className="absolute left-3 top-3 flex items-center gap-2 border border-accent-gold/25 bg-black/65 px-2.5 py-1.5 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent-gold"
            />
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-accent-gold">
              Champion
            </span>
          </div>

          <div className="absolute inset-x-4 bottom-4 z-10">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent-gold">
              Reign #{championship.reign}
            </p>

            <h3 className="mt-1 break-words font-display text-2xl font-black uppercase leading-[0.95] tracking-tight text-white">
              {champion.wrestler}
            </h3>

            {champion.nickname && (
              <p className="mt-2 line-clamp-1 text-xs italic text-white/65">
                {champion.nickname}
              </p>
            )}
          </div>
        </div>

        {/* Championship information */}
        <div className="border-t border-white/[0.08] px-4 py-3">
          <p className="truncate font-display text-xs font-bold uppercase tracking-wide text-foreground sm:text-sm">
            {championship.name}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-foreground-muted">
                Days held
              </p>
              <p className="mt-1 font-display text-base font-bold tabular-nums text-foreground">
                {championship.daysHeld.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-foreground-muted">
                Defenses
              </p>
              <p className="mt-1 font-display text-base font-bold tabular-nums text-accent-gold">
                {championship.defenses.toLocaleString()}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-accent-gold transition-colors group-hover:border-accent-gold group-hover:bg-accent-gold group-hover:text-black"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}