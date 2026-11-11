"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const dark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-10 min-w-10 items-center justify-center border border-white/25 px-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className
      )}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      <span aria-hidden className="text-sm leading-none">{mounted ? (dark ? "☀" : "◐") : "◐"}</span>
      <span className="sr-only">{mounted ? (dark ? "Light mode" : "Dark mode") : "Toggle theme"}</span>
    </button>
  );
}
