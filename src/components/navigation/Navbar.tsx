"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImLogo } from "@/components/logo/ImLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/navigation/MobileMenu";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/events", label: "EVENTS" },
  { href: "/roster", label: "ROSTER" },
  { href: "/championships", label: "CHAMPIONSHIPS" },
  { href: "/matches", label: "MATCHES" },
  { href: "/stories", label: "STORIES" },
  { href: "/news", label: "NEWS" },
  { href: "/media", label: "MEDIA" },
  { href: "/shop", label: "SHOP" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
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
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 py-2 shadow-md shadow-black/20 backdrop-blur-sm"
            : "bg-transparent py-4",
          scrolled && "border-b border-border"
        )}
      >
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <ImLogo size="md" priority />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-accent-red",
                  isActive(link.href)
                    ? "text-accent-red"
                    : "text-foreground-muted"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-red" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <Link href="/media">WATCH</Link>
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <Link href="/events">TICKETS</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden hover:text-accent-red focus:text-accent-red"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-current transition-colors duration-200" />
              <span className="mt-1 block h-0.5 w-6 bg-current" />
              <span className="mt-1 block h-0.5 w-6 bg-current" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
        isActive={isActive}
      />
    </>
  );
}
