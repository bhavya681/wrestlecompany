
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
import coupleTagTeam from "@/app/Couple_Tag_Team_Championship.png";

const BELT_IMAGES = {
  "im world championship": worldChampionship,
  "im women's world championship": divaWorldChampionship,
  "im men's tag team championship": maleTagTeam,
  "im women's tag team championship": divaTagTeam,
  "im national championship": nationalChampionship,
  "im couple tag team championship": coupleTagTeam,
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
      className="relative isolate overflow-hidden border-b border-border bg-[var(--im-page)] py-10 sm:py-12 lg:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.10),transparent_55%)]" />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(193,39,45,0.09),transparent_70%)] blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07),transparent_70%)] blur-3xl" />
      </div>
      <header className="mb-8 sm:mb-12">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent-gold" />
            <h2
              id="championship-spotlight-heading"
              className="font-display text-3xl font-black uppercase leading-none tracking-tight text-[var(--im-ink)] sm:text-4xl"
            >
              Champions
            </h2>
          </div>
        </header>
   
    </section>
  );
}

function ChampionCard({
  championship,
}: {
  championship: Championship;
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
    <article className="w-[250px] shrink-0 snap-start">
      <Link
        href={`/roster/${champion.wrestlerId}`}
        aria-label={`View ${champion.wrestler}, reigning ${championship.name} champion`}
        className="group relative block"
      >
        {beltImage && (
          <Image
            src={beltImage}
            alt=""
            width={110}
            height={44}
            className="absolute right-[-16px] top-[36%] translate-y-[-50%] z-10 hidden sm:block opacity-85 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
            sizes="110px"
          />
        )}

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

          <div className="absolute left-3 top-3 flex items-center gap-2 border border-accent-gold/25 bg-[var(--im-overlay)] px-2.5 py-1.5 backdrop-blur-sm">
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
            "block truncate font-display text-xl font-bold uppercase leading-none tracking-tight text-[var(--im-ink)]",
            "transition-colors duration-300 group-hover:text-accent-gold"
          )}
        >
          {champion.wrestler}
        </h3>

        <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-foreground-muted">
          {championship.shortName}
        </p>

        {champion.nickname && (
          <p className="mt-1 line-clamp-1 text-xs italic text-[var(--im-ink)]/50">
            {champion.nickname}
          </p>
        )}
      </Link>
    </article>
  );
}
