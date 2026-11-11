"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImLogo } from "@/components/logo/ImLogo";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { events } from "@/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/roster", label: "Roster" },
  { href: "/championships", label: "Championships" },
  { href: "/events", label: "Events" },
  { href: "/results", label: "Results" },
  { href: "/news", label: "News" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
];

const moreLinks = [
  { href: "/tag-teams", label: "Tag Teams & Factions", description: "Groups, duos and alliances" },
  { href: "/stories", label: "Stories & Rivalries", description: "The narratives behind the ring" },
  { href: "/officials", label: "Officials", description: "Referees, managers and broadcast" },
  { href: "/matches", label: "Match Database", description: "Search every recorded match" },
  { href: "/shop", label: "Official Shop", description: "Indus Matworks merchandise" },
];

const upcoming = events.find((event) => event.status === "upcoming");

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const moreActive = moreLinks.some((link) => isActive(link.href));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 bg-[#C1272D] text-white transition-shadow duration-200",
          scrolled && "shadow-[0_10px_34px_rgba(8,8,8,0.3)]"
        )}
      >
        <div className="hidden border-b border-black/20 bg-[#080808] sm:block">
          <div className="container-wide flex h-8 items-center justify-between gap-4">
            <p className="flex min-w-0 items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
              <span className="inline-block h-1.5 w-1.5 shrink-0 bg-[#C1272D]" aria-hidden />
              <span className="truncate">
                {upcoming
                  ? `Next event: ${upcoming.name} — ${upcoming.city}`
                  : "Wrestling From India. Built For The World."}
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em]">
              <Link href="/results" className="text-white/70 transition-colors hover:text-white">
                Results
              </Link>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <Link href="/media" className="text-white/70 transition-colors hover:text-white">
                Watch
              </Link>
            </div>
          </div>
        </div>

        <div className="container-wide flex h-16 items-center justify-between gap-3 sm:h-[70px]">
          <Link href="/" aria-label="Indus Matworks home" className="shrink-0 text-white">
            <ImLogo size="md" priority className="h-7 sm:h-8" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.07em] transition-colors",
                    active ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 bottom-0 h-[2px] origin-left bg-white transition-transform duration-200",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-white/60"
                    )}
                  />
                </Link>
              );
            })}

            <div ref={moreRef} className="relative">
              <button
                ref={moreButtonRef}
                type="button"
                aria-expanded={moreOpen}
                aria-haspopup="true"
                aria-controls="more-menu"
                onClick={() => setMoreOpen((value) => !value)}
                className={cn(
                  "group relative flex items-center gap-1.5 px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.07em] transition-colors",
                  moreActive || moreOpen ? "text-white" : "text-white/80 hover:text-white"
                )}
              >
                More
                <svg
                  aria-hidden
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  className={cn("transition-transform duration-200", moreOpen && "rotate-180")}
                >
                  <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0 h-[2px] origin-left bg-white transition-transform duration-200",
                    moreActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-white/60"
                  )}
                />
              </button>

              {moreOpen ? (
                <div
                  id="more-menu"
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-80 border border-[#27272A] bg-[#080808] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                >
                  <div className="h-[2px] bg-[#C1272D]" aria-hidden />
                  <ul className="py-2">
                    {moreLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-[#141414] focus-visible:bg-[#141414] focus-visible:outline-none"
                        >
                          <span className="font-display text-sm font-bold uppercase tracking-[0.06em] text-white group-hover:text-[#DC2626]">
                            {link.label}
                          </span>
                          <span className="font-body text-[11px] text-white/50">{link.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/events"
              className="hidden min-h-10 items-center border border-white bg-white px-4 font-display text-[12px] font-bold uppercase tracking-[0.1em] text-[#C1272D] transition-colors hover:bg-white/90 sm:inline-flex"
            >
              Tickets
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        secondaryLinks={moreLinks}
        pathname={pathname}
        isActive={isActive}
      />
    </>
  );
}
