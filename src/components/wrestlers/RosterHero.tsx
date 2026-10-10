
import { cn } from "@/lib/utils";

export interface RosterHeroStat {
  label: string;
  value: number;
  tone?: "default" | "gold";
}

interface RosterHeroProps {
  stats: RosterHeroStat[];
}

/**
 * Editorial roster masthead.
 * Rendered on the server.
 */
export function RosterHero({ stats }: RosterHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Base wash */}
        <div className="absolute inset-0 bg-[linear-gradient(170deg,#0d0d0e_0%,#080808_48%,#0a0a0b_100%)]" />

        {/* Red stage light */}
        <div className="absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(193,39,45,0.22),transparent_65%)] blur-2xl" />

        {/* Gold key light */}
        <div className="absolute -right-20 -top-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.10),transparent_65%)] blur-2xl" />

        {/* Fine grid */}
        <div className="im-hairline-grid absolute inset-0" />

        {/* Oversized background wordmark */}
        <span
          className={cn(
            "im-outline-type im-hero-ghost",
            "absolute right-[-4%] top-1/2 hidden -translate-y-1/2 lg:block"
          )}
        >
          Roster
        </span>

        {/* Grain texture */}
        <div className="im-grain absolute inset-0" />
      </div>

      {/* Main content */}
      <div className="container-wide relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl">
          {/* Overline */}
          <p className="im-hero-fade flex flex-wrap items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-foreground-muted sm:text-[10px]">
            <span
              aria-hidden="true"
              className="inline-block h-px w-8 shrink-0 bg-accent-red"
            />

            <span>Indus Matworks</span>

            <span
              aria-hidden="true"
              className="text-foreground-muted/40"
            >
              /
            </span>

            <span>The Roster</span>
          </p>

          {/* Masthead */}
          <h1 className="mt-5 font-display font-black uppercase leading-[0.86] tracking-[-0.035em] text-foreground">
            <span
              className="im-hero-fade block text-[clamp(1.05rem,2.4vw,1.9rem)] font-medium tracking-[0.24em] text-foreground-muted"
              style={{ animationDelay: "80ms" }}
            >
              Meet The
            </span>

            <span
              className="im-hero-fade mt-2 block text-[clamp(2.9rem,10.5vw,8rem)]"
              style={{ animationDelay: "140ms" }}
            >
              Fighters
              <span className="text-accent-red">.</span>
            </span>
          </h1>

          {/* Accent rule */}
          <span
            aria-hidden="true"
            className="im-hero-rule mt-6 block h-px w-full max-w-md bg-[linear-gradient(90deg,var(--accent-red),rgba(212,175,55,0.55)_45%,transparent)]"
          />

          {/* Description */}
          <p
            className="im-hero-fade mt-5 max-w-xl font-body text-sm leading-7 text-foreground-muted sm:text-[15px]"
            style={{ animationDelay: "220ms" }}
          >
            Athletes. Tag Teams. Champions. The personalities shaping the
            future of professional wrestling from India for the world.
          </p>

          {/* Brand tagline */}
          <p
            className="im-hero-fade mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-accent-gold/90 sm:text-[10px] sm:tracking-[0.22em]"
            style={{ animationDelay: "280ms" }}
          >
            Wrestling From India. Built For The World.
          </p>
        </div>

        {/* Statistics registry */}
        {stats.length > 0 && (
          <div
            className="im-hero-fade mt-10 grid grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-3 lg:mt-14 lg:grid-cols-6"
            style={{ animationDelay: "340ms" }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative min-w-0 bg-background px-3 py-5 text-center transition-colors duration-300 hover:bg-background-secondary sm:px-4"
              >
                {/* Hover accent */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-10",
                    stat.tone === "gold"
                      ? "bg-accent-gold"
                      : "bg-accent-red"
                  )}
                />

                {/* Number */}
                <p
                  className={cn(
                    "break-words font-display text-3xl font-black leading-none sm:text-4xl",
                    stat.tone === "gold"
                      ? "text-accent-gold"
                      : "text-foreground"
                  )}
                >
                  {stat.value}
                </p>

                {/* Label */}
                <p className="mt-2 break-words font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-foreground-muted sm:tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent-red)_35%,var(--accent-gold)_65%,transparent)] opacity-40"
      />
    </section>
  );
}
