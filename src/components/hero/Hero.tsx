"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { events } from "@/data";

const heroSlides = [
  {
    src: "/images/hero-wrestler.png",
    alt: "Indus Matworks — Where wrestling meets the subcontinent",
    priority: true,
  },
  {
    src: "https://picsum.photos/seed/hero-ring-action/1920/1080",
    alt: "Indus Matworks arena at capacity",
    priority: false,
  },
  {
    src: "https://picsum.photos/seed/hero-championship/1920/1080",
    alt: "Championship moment at Indus Matworks",
    priority: false,
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const upcomingEvent = events.find((e) => e.status === "upcoming");

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
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
      {/* ─── BACKGROUND SLIDES ─── */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1500 ease-in-out",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slide.priority}
              loading={slide.priority ? "eager" : "lazy"}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Gradient layers — cinematic dark treatment */}
        {/* Bottom fade — strongest, brings text up */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
        {/* Left fade — pushes text area into dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        {/* Top fade — keeps header area readable */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/60 to-transparent" />

        {/* Grain */}
        <div className="im-grain absolute inset-0 pointer-events-none" />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="container-wide relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-20 sm:pt-0">
        <div className="max-w-xl lg:max-w-2xl">


          {/* Overline — promotion identity */}
          <div
            className={cn(
              "mb-5 flex items-center gap-3 transition-all duration-700",
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <span
              className="h-px w-7 bg-accent-red sm:w-8"
              aria-hidden="true"
            />

            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-accent-red sm:text-[10px] sm:tracking-[0.28em]">
              Indus Matworks
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={cn(
              "font-display text-[2.65rem] font-black uppercase leading-[0.94] tracking-[-0.025em] text-foreground transition-all duration-700 sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem]",
              loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            Where
            <br />
            Wrestling
            <br />
            Meets The{" "}
            <span className="text-accent-red">
              Sub
              <wbr />
              continent.
            </span>
          </h1>

          {/* Divider */}
          <div
            className={cn(
              "my-5 h-px w-10 bg-accent-red transition-all duration-700 sm:my-6 sm:w-12",
              loaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            )}
            style={{
              transitionDelay: "350ms",
              transformOrigin: "left",
            }}
            aria-hidden="true"
          />

          {/* Next event */}
          {upcomingEvent && (
            <div
              className={cn(
                "mb-7 transition-all duration-700",
                loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
              style={{ transitionDelay: "420ms" }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground-muted/60">
                  Next Event
                </p>

                <span
                  className="h-1 w-1 rounded-full bg-accent-red/70"
                  aria-hidden="true"
                />

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
              "flex flex-wrap items-center gap-2.5 transition-all duration-700 sm:gap-3",
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            <Link
              href={upcomingEvent ? `/events/${upcomingEvent.slug}` : "/events"}
              className="inline-flex min-h-11 items-center justify-center bg-accent-red px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.11em] text-background transition-all duration-200 hover:-translate-y-px hover:bg-accent-red-hover active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:text-sm"
            >
              Get Tickets
            </Link>

            <Link
              href="/events"
              className="inline-flex min-h-11 items-center justify-center border border-foreground-muted/30 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.11em] text-foreground-muted transition-all duration-200 hover:-translate-y-px hover:border-foreground-muted hover:text-foreground active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:text-sm"
            >
              Explore Events
            </Link>
          </div>


        </div>
      </div>


      {/* ─── SLIDE INDICATORS ─── */}
      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
        role="tablist"
        aria-label="Hero slides"
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "im-slide-dot transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-red",
              index === currentIndex && "active"
            )}
          />
        ))}
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
