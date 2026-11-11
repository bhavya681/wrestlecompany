"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/data";

type Campaign = {
  id: string;
  type: "event";
  title: string;
  description: string;
  date?: string;
  image?: string;
  href: string;
  cta: string;
};

const DISMISS_KEY = "im-promo-dismissed";
const DELAY_MS = 4500;

function getCampaign(): Campaign | null {
  const upcoming = events.find((e) => e.status === "upcoming" && e.posterImage);
  if (!upcoming) return null;
  return {
    id: `event-${upcoming.id}`,
    type: "event",
    title: upcoming.name,
    description: upcoming.tagline || (upcoming.venue ? `${upcoming.venue}, ${upcoming.city}` : upcoming.city),
    date: upcoming.date,
    image: upcoming.posterImage,
    href: `/events/${upcoming.slug}`,
    cta: "View Event",
  };
}

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const campaign = useMemo(getCampaign, []);

  useEffect(() => {
    if (!campaign) return;
    try {
      const dismissed = localStorage.getItem(DISMISS_KEY);
      if (dismissed === campaign.id) return;
    } catch {}
    const timer = window.setTimeout(() => {
      setOpen(true);
      window.requestAnimationFrame(() => setReady(true));
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [campaign]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!campaign || !open) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, campaign!.id);
    } catch {}
    setOpen(false);
  }

  const formattedDate = campaign.date
    ? new Date(campaign.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
    >
      <button
        type="button"
        aria-label="Close promotion"
        onClick={dismiss}
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"
      />
      <div
        ref={panelRef}
        className={[
          "relative z-10 max-h-[100dvh] w-full overflow-y-auto border border-white/15 bg-[#080808] text-white shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:max-h-[calc(100dvh-3rem)] sm:max-w-5xl",
          "transition-all duration-300 ease-out",
          ready ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        ].join(" ")}
      >
        <div className="h-[3px] bg-[#C1272D]" aria-hidden />
        <div className="grid md:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
          <div className="relative min-h-[240px] overflow-hidden bg-[#141414] sm:min-h-[300px] md:min-h-[470px]">
            {campaign.image ? (
              <Image
                src={campaign.image}
                alt={`${campaign.title} poster`}
                fill
                className="object-contain object-center p-4 sm:p-6"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
              />
            ) : null}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent md:bg-gradient-to-r"
              aria-hidden
            />
            <div className="absolute left-4 top-4 border border-[#C1272D] bg-[#C1272D] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white">
              Featured Event
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#DC2626]">
              Next from Indus Matworks
            </p>
            <h2
              id="promo-title"
              className="mt-3 font-display text-[clamp(2.1rem,6vw,3.6rem)] font-black uppercase leading-[0.9] tracking-tight"
            >
              {campaign.title}
            </h2>
            {formattedDate ? (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                {formattedDate}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl font-body text-sm leading-7 text-white/60">
              {campaign.description}
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href={campaign.href}
                onClick={dismiss}
                className="inline-flex min-h-12 items-center justify-center border border-[#C1272D] bg-[#C1272D] px-6 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#991B1B] hover:bg-[#991B1B]"
              >
                {campaign.cta}
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={dismiss}
                className="inline-flex min-h-12 items-center justify-center border border-white/25 px-6 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Not Now
              </button>
            </div>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">
              Wrestling From India. Built For The World.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
