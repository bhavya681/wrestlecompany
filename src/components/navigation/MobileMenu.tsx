"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ImLogo } from "@/components/logo/ImLogo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface MobileMenuProps {
  id?: string;
  open: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
  secondaryLinks: { href: string; label: string; description?: string }[];
  pathname: string;
  isActive: (href: string) => boolean;
}

export function MobileMenu({
  id,
  open,
  onClose,
  navLinks,
  secondaryLinks,
  isActive,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
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
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[70] xl:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        ref={panelRef}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-[#080808] text-white shadow-[-24px_0_70px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-[3px] shrink-0 bg-[#C1272D]" aria-hidden />
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link href="/" onClick={onClose} aria-label="Indus Matworks home" className="text-white">
            <ImLogo size="md" className="h-7" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-5">
          <p className="im-eyebrow mb-3 text-white/45">Explore</p>
          <ul className="border-t border-white/10">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-b border-white/10">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    style={{ transitionDelay: open ? `${index * 25}ms` : "0ms" }}
                    className={cn(
                      "group flex min-h-14 items-center justify-between gap-4 py-3 font-display text-[clamp(1.35rem,6vw,1.75rem)] font-bold uppercase leading-none tracking-tight transition-all duration-300",
                      active ? "text-[#DC2626]" : "text-white hover:text-[#DC2626]"
                    )}
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "font-mono text-[10px] tracking-[0.2em] text-white/30 transition-transform duration-200 group-hover:translate-x-1",
                        active && "text-[#DC2626]"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="im-eyebrow mb-3 mt-8 text-white/45">More</p>
          <ul className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {secondaryLinks.map((link) => (
              <li key={link.href} className="bg-[#080808]">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex min-h-[74px] flex-col justify-center px-3 py-3 transition-colors hover:bg-[#141414]",
                    isActive(link.href) ? "text-[#DC2626]" : "text-white"
                  )}
                >
                  <span className="font-display text-[13px] font-bold uppercase leading-tight tracking-[0.04em]">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-2">
            <Link
              href="/events"
              onClick={onClose}
              className="flex min-h-12 items-center justify-center border border-[#C1272D] bg-[#C1272D] px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#991B1B]"
            >
              Tickets & Events
            </Link>
            <Link
              href="/shop"
              onClick={onClose}
              className="flex min-h-12 items-center justify-center border border-white/25 px-4 py-3 text-center font-display text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white/5"
            >
              Official Shop
            </Link>
          </div>
        </nav>

        <div className="shrink-0 border-t border-white/10 px-5 py-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
            Wrestling From India. Built For The World.
          </p>
        </div>
      </div>
    </div>
  );
}
