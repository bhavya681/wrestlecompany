"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ImLogo } from "@/components/logo/ImLogo";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  id?: string;
  open: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
  pathname: string;
  isActive: (href: string) => boolean;
}

export function MobileMenu({
  id,
  open,
  onClose,
  navLinks,
  isActive,
}: MobileMenuProps) {
  /* Escape key close */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    /* Backdrop */
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-background transition-all duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Subtle grain overlay */}
      <div className="im-grain absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-border px-5 py-4">
        <Link href="/" onClick={onClose} aria-label="Indus Matworks — Home">
          <ImLogo size="md" />
        </Link>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
          aria-label="Close menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <line
              x1="1"
              y1="1"
              x2="17"
              y2="17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
            <line
              x1="17"
              y1="1"
              x2="1"
              y2="17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      {/* Main nav links */}
      <nav
        aria-label="Mobile navigation"
        className="relative z-10 flex flex-1 flex-col justify-center px-8 py-6"
      >
        <ul className="space-y-1">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
              className={cn(
                "transition-all duration-300",
                open
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              )}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-4 py-3 font-display text-3xl font-black uppercase leading-none tracking-tight transition-colors duration-200 sm:text-4xl",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {/* Number indicator */}
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-foreground-muted/40 transition-colors group-hover:text-accent-red">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {link.label}

                {/* Active indicator */}
                {isActive(link.href) && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-red" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Separator */}
        <div className="my-6 h-px bg-border" />

        {/* Action links */}
        <div className="flex items-center gap-4">
          <Link
            href="/events"
            onClick={onClose}
            className="inline-flex items-center bg-accent-red px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-background transition-colors hover:bg-accent-red-hover"
          >
            Get Tickets
          </Link>
          <Link
            href="/shop"
            onClick={onClose}
            className="inline-flex items-center border border-border px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:border-foreground-muted hover:text-foreground"
          >
            Shop
          </Link>
        </div>
      </nav>

      {/* Bottom — social + copyright */}
      <div className="relative z-10 flex flex-col gap-4 border-t border-border px-8 py-6">
        <div className="flex items-center gap-5">
          <SocialLink href="#" label="Instagram">
            <InstagramIcon />
          </SocialLink>
          <SocialLink href="#" label="YouTube">
            <YouTubeIcon />
          </SocialLink>
          <SocialLink href="#" label="X / Twitter">
            <XIcon />
          </SocialLink>
          <SocialLink href="#" label="Facebook">
            <FacebookIcon />
          </SocialLink>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-muted/40">
          © {new Date().getFullYear()} Indus Matworks
        </p>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center border border-border text-foreground-muted transition-all duration-200 hover:border-accent-red hover:text-accent-red"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
