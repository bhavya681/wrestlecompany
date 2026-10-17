"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { events } from "@/data";
import worldBeltPng from "@/app/world_championship.png";

const heroImage = "/images/hero-wrestler.png";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const upcomingEvent = events.find((e) => e.status === "upcoming");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const formatEventDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section
      className="relative isolate min-h-screen w-full overflow-hidden"
      aria-label="Indus Matworks hero"
    >
      {/* ─── BACKGROUND IMAGE ─── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={heroImage}
          alt="Indus Matworks championship moment"
          fill
          priority
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Cinematic dark treatment */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-background/65 to-transparent" />

        {/* Controlled red accent glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-accent-red/8 blur-[120px] pointer-events-none"
        />

        {/* Grain texture */}
        <div className="im-grain absolute inset-0 pointer-events-none" />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="container-wide relative z-10 flex min-h-screen flex-col justify-end pb-20 pt-28 sm:justify-center sm:pb-24 sm:pt-0">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Overline — promotion identity */}
          <div
            className={cn(
              "mb-6 flex items-center gap-3 transition-all duration-700",
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <span
              className="h-px w-8 bg-accent-red sm:w-10"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent-red sm:text-[11px]">
              Indus Matworks
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={cn(
              "font-display font-black uppercase leading-[0.9] tracking-tight text-foreground transition-all duration-700 sm:text-6xl lg:text-[5rem] xl:text-[6rem]",
              loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            )}
            style={{ letterSpacing: "-0.03em", transitionDelay: "220ms" }}
          >
            Wrestling From India.
            <br />
            <span className="text-accent-red">Built For The World.</span>
          </h1>

          {/* Divider */}
          <div
            className={cn(
              "my-8 h-px w-16 bg-accent-red transition-all duration-700 sm:my-10 sm:w-20",
              loaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            )}
            style={{ transitionDelay: "380ms", transformOrigin: "left" }}
            aria-hidden="true"
          />

          {/* Next event */}
          {upcomingEvent && (
            <div
              className={cn(
                "mb-10 transition-all duration-700",
                loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
              style={{ transitionDelay: "460ms" }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-muted/60">
                  Next Event
                </p>
                <span className="h-1 w-1 rounded-full bg-accent-red/70" aria-hidden="true" />
                <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground-secondary sm:text-base">
                  {upcomingEvent.name}
                </p>
              </div>
              <p className="mt-1 font-mono text-[11px] text-foreground-muted sm:text-xs">
                {upcomingEvent.city}
                <span className="mx-2 text-foreground-muted/40">—</span>
                {formatEventDate(upcomingEvent.date)}
              </p>
            </div>
          )}

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-3 sm:gap-4 transition-all duration-700",
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ transitionDelay: "540ms" }}
          >
            <Link
              href={upcomingEvent ? `/events/${upcomingEvent.slug}` : "/events"}
              className="inline-flex min-h-11 items-center justify-center bg-accent-red px-6 py-2.5 font-display text-xs font-bold uppercase tracking-[0.12em] text-background transition-all duration-200 hover:-translate-y-px hover:bg-accent-red-hover active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-7 sm:text-sm"
            >
              Get Tickets
            </Link>

            <Link
              href="/roster"
              className="inline-flex min-h-11 items-center justify-center border border-foreground text-foreground px-6 py-2.5 font-display text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-px hover:border-accent-red hover:text-accent-red active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-7 sm:text-sm"
            >
              Explore Roster
            </Link>
          </div>

        </div>
      </div>

      {/* ─── BELT ACCENT (decorative, bottom-right) ─── */}
      <div
        className="absolute bottom-8 right-8 z-10 flex-col items-end gap-2 pointer-events-none sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-16"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-accent-gold text-right opacity-60 sm:text-[10px]">
          The Flagship Title
        </span>
        <Image
          src={worldBeltPng.src}
          alt=""
          width={160}
          height={78}
          className="object-contain opacity-30 rotate-[-3deg] drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] sm:width-[180px] sm:height-[88px]"
        />
      </div>

      {/* ─── BOTTOM SCROLL HINT ─── */}
      <div
        className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-foreground-muted/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-foreground-muted/30 to-transparent" />
      </div>
    </section>
  );
}
