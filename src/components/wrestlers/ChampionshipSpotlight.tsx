
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
      className="relative isolate overflow-hidden border-b border-border bg-[#080808] py-10 sm:py-12 lg:py-14"
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
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
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
              className="font-display text-4xl font-black uppercase leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Meet Our{" "}
              <span className="text-accent-gold">Champions.</span>
            </h2>
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

        {/* Horizontal champion cards */}
        <div>
          <div
            aria-label="Current championship holders"
            className={cn(
              "flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-6",
              "scroll-smooth [scrollbar-color:rgba(212,175,55,0.45)_transparent] [scrollbar-width:thin]",
              "sm:gap-6"
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
        <div className="mt-6 flex items-center gap-4">
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

  return (
    <article className="w-[250px] shrink-0 snap-start">
      <Link
        href={`/roster/${champion.wrestlerId}`}
        aria-label={`View ${champion.wrestler}, reigning ${championship.name} champion`}
        className="group block"
      >
        {/* Champion portrait */}
        <div className="relative aspect-[1] overflow-hidden bg-background-secondary mb-3">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.05),transparent_70%)]"
          />

          <WrestlerPortrait
            wrestler={wrestler}
            mask="none"
            fit="contain"
            sizes="(max-width: 639px) 250px, (max-width: 1023px) 280px, 300px"
            className={cn(
              "h-full w-full object-contain object-center",
              "grayscale-[0.25] transition-[transform,filter] duration-500 ease-out",
              "group-hover:scale-[1.06] group-hover:grayscale-0"
            )}
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
        </div>

        <h3
          className={cn(
            "block truncate font-display text-xl font-bold uppercase leading-none tracking-tight text-white",
            "transition-colors duration-300 group-hover:text-accent-gold"
          )}
        >
          {champion.wrestler}
        </h3>

        <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-foreground-muted">
          {championship.shortName}
        </p>

        {champion.nickname && (
          <p className="mt-1 line-clamp-1 text-xs italic text-white/50">
            {champion.nickname}
          </p>
        )}
      </Link>
    </article>
  );
}
