"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { championships, events, wrestlers } from "@/data";
import worldChampionship from "@/app/world_championship.png";

function reveal(ready: boolean, delay: number) {
  return {
    className: ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
    style: { transitionDelay: `${delay}ms` } as React.CSSProperties,
  };
}

export function Hero() {
  const [ready, setReady] = useState(false);
  const upcoming = events.find((event) => event.status === "upcoming");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setReady(true);
      return;
    }
    const timer = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      aria-label="Indus Matworks professional wrestling"
      className="im-cinematic relative isolate overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero/hero-desktop.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={[
            "hidden object-cover object-[50%_0%] md:block",
            "transition-[transform,opacity] duration-[1400ms] ease-out",
            ready ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
          ].join(" ")}
        />
        <Image
          src="/images/hero/hero-mobile.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={[
            "object-cover object-[50%_0%] md:hidden",
            "transition-[transform,opacity] duration-[1400ms] ease-out",
            ready ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
          ].join(" ")}
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[#080808]/0 via-[#080808]/35 to-[#080808]/95 md:bg-gradient-to-r from-[#080808]/0 via-[#080808]/45 to-[#080808]/85"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(193,39,45,0.30),transparent_55%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.85)]"
        />
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[#C1272D]" />
        <div
          className="pointer-events-none absolute -right-[8%] top-[8%] select-none font-display text-[clamp(14rem,32vw,38rem)] font-black leading-none text-transparent opacity-[0.035] [-webkit-text-stroke:1px_#fff]"
          aria-hidden
        >
          IM
        </div>
        <div
          className="pointer-events-none absolute -left-[6%] bottom-[10%] select-none font-display text-[clamp(10rem,26vw,26rem)] font-black leading-none text-transparent opacity-[0.025] [-webkit-text-stroke:1px_#fff] md:hidden"
          aria-hidden
        >
          IM
        </div>
      </div>

      <div
        className="container-wide relative z-10 flex min-h-[calc(100dvh-64px)] flex-col justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:min-h-[min(90svh,920px)] lg:pb-24"
      >
        <div className="max-w-4xl lg:max-w-none">
          <div className={["w-full", reveal(ready, 0).className].join(" ")} style={reveal(ready, 0).style}>
            <p className="inline-flex items-center gap-2.5 border border-[#C1272D]/55 bg-[#C1272D]/12 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#DC2626] sm:text-[10px]">
              <span className="h-1.5 w-1.5 bg-[#C1272D]" aria-hidden />
              India&apos;s Professional Wrestling Promotion
            </p>
          </div>

          <h1
            className={[
              "mt-5 font-display font-black uppercase leading-[0.8] tracking-[-0.035em] text-white",
              "text-[clamp(2.6rem,8.6vw,6.6rem)] sm:text-[clamp(3rem,9vw,7.2rem)]",
              reveal(ready, 90).className,
            ].join(" ")}
            style={reveal(ready, 90).style}
          >
            Wrestling
            <span className="block">
              From <span className="text-[#C1272D]">India.</span>
            </span>
            <span className="mt-2.5 block text-[0.34em] leading-none tracking-[0.04em] text-white/60 sm:mt-3">
              Built For The World.
            </span>
          </h1>

          <p
            className={[
              "mt-5 max-w-xl font-body text-[13px] leading-6 text-white/70 sm:mt-6 sm:text-base sm:leading-7",
              reveal(ready, 180).className,
            ].join(" ")}
            style={reveal(ready, 180).style}
          >
            New rivalries. Fearless competitors. Unforgettable moments. Experience the next
            generation of professional wrestling.
          </p>

          <div
            className={[
              "mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center",
              reveal(ready, 260).className,
            ].join(" ")}
            style={reveal(ready, 260).style}
          >
            <Link
              href="/roster"
              className="im-btn im-btn-light w-full sm:w-auto"
              aria-label="Explore the full roster"
            >
              Explore The Roster
            </Link>
            <Link
              href="/events"
              className="im-btn im-btn-outline w-full sm:w-auto"
              aria-label="View upcoming events"
            >
              Upcoming Events
            </Link>
          </div>

          <div
            className={[
              "mt-8 relative flex items-center gap-6 sm:mt-10 border-t border-white/10 pt-5 sm:pt-6",
              reveal(ready, 340).className,
            ].join(" ")}
            style={reveal(ready, 340).style}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-black leading-none text-white sm:text-2xl">
                {championships.length}
              </span>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/50 sm:text-[9px]">
                Championships
              </span>
            </div>

            {/* Championship belt on right side */}
            <Image
              src={worldChampionship}
              alt=""
              width={120}
              height={48}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block opacity-90 sm:opacity-100 transition-opacity duration-300"
              sizes="120px"
            />
          </div>

          <p className={["mt-8 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 sm:mt-10", reveal(ready, 400).className].join(" ")} style={reveal(ready, 400).style}>
            The Next Generation Starts Here
          </p>
        </div>

        {upcoming ? (
          <div
            className={["mt-10 sm:mt-0 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[340px]", reveal(ready, 420).className].join(" ")}
            style={reveal(ready, 420).style}
          >
            <Link
              href={`/events/${upcoming.slug}`}
              className="group block border border-white/15 bg-[#080808]/60 backdrop-blur-md transition-colors hover:border-[#C1272D]/70 hover:bg-[#080808]/80"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-[#DC2626] sm:text-[9px]">
                  Next Live Event
                </p>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45 sm:text-[9px]">
                  {upcoming.city}
                </span>
              </div>
              <div className="flex gap-4 p-4">
                <div className="relative h-[96px] w-[64px] shrink-0 overflow-hidden border border-white/10 bg-white/5">
                  <Image
                    src={upcoming.posterImage}
                    alt={`${upcoming.name} poster`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold uppercase leading-[0.95] text-white transition-colors group-hover:text-[#DC2626] sm:text-2xl">
                    {upcoming.name}
                  </h2>
                  <p className="mt-2 font-mono text-[8px] uppercase leading-5 tracking-[0.12em] text-white/45 sm:text-[9px]">
                    {new Date(upcoming.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <br />
                    {upcoming.venue || upcoming.city}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white sm:text-[9px]">
                    Event Details
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ) : null}
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[#080808]/40 backdrop-blur-sm">
        <div className="container-wide flex h-10 items-center justify-between gap-4 overflow-hidden">
          <p className="truncate font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-white/50 sm:text-[9px]">
            Wrestling From India. Built For The World.
          </p>
          <p className="hidden shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-white/35 sm:block">
            Live Events · Championships · Stories
          </p>
        </div>
      </div>
    </section>
  );
}
