"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImLogo } from "@/components/logo/ImLogo";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/navigation/MobileMenu";

const primaryNavLinks = [
  { href: "/", label: "Home" },
  { href: "/roster", label: "Wrestlers" },
  { href: "/championships", label: "Championships" },
  { href: "/events", label: "Events" },
  { href: "/results", label: "Results" },
  { href: "/news", label: "News" },
  { href: "/media", label: "Media" },
];

const actionNavLinks = [
  { href: "/events", label: "Tickets", variant: "primary" as const },
  { href: "/media", label: "Watch", variant: "ghost" as const },
  { href: "/shop", label: "Shop", variant: "ghost" as const },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/90 shadow-lg shadow-black/30 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="container-wide flex items-center justify-between gap-4">
          {/* Left — Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Indus Matworks — Home"
          >
            <ImLogo size="md" priority />
          </Link>

          {/* Center — Primary Nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center xl:flex"
          >
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-3 py-5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {link.label}

                {/* Active / hover underline */}
                <span
                  className={cn(
                    "absolute bottom-3.5 left-3 right-3 h-[1.5px] rounded-full bg-accent-red transition-all duration-300",
                    isActive(link.href)
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Right — Actions */}
          <div className="flex items-center gap-1">
            {/* Watch — ghost, desktop only */}
            <Link
              href="/media"
              className="hidden items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground-muted transition-colors duration-200 hover:text-foreground xl:flex"
              aria-label="Watch Indus Matworks"
            >
              Watch
            </Link>

            {/* Shop — ghost, desktop only */}
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground-muted transition-colors duration-200 hover:text-foreground xl:flex"
              aria-label="Shop"
            >
              Shop
            </Link>

            {/* Tickets CTA */}
            <Link
              href="/events"
              className="hidden items-center px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-background transition-all duration-200 bg-accent-red hover:bg-accent-red-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex"
              aria-label="Get tickets"
            >
              Tickets
            </Link>

            {/* Hamburger — mobile */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="ml-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] text-foreground transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="block h-[1.5px] w-5 bg-current transition-all duration-300" />
              <span className="block h-[1.5px] w-5 bg-current transition-all duration-300" />
              <span className="block h-[1.5px] w-3 self-start bg-current transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={primaryNavLinks}
        pathname={pathname}
        isActive={isActive}
      />
    </>
  );
}
