"use client";

import { cloneElement, isValidElement, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "dark" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: ReactNode;
}

export function Button({ children, variant = "primary", size = "md", asChild = false, className, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 border font-display font-bold uppercase tracking-[0.08em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1272D] disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<ButtonVariant, string> = {
    primary: "border-[#C1272D] bg-[#C1272D] text-white hover:bg-[#991B1B] hover:border-[#991B1B]",
    secondary: "border-[var(--im-border)] bg-[var(--im-surface)] text-[var(--im-ink)] hover:border-[var(--im-ink)]",
    dark: "border-[#080808] bg-[#080808] text-white hover:bg-[#141414] dark:border-[#27272A] dark:bg-[#141414] dark:hover:bg-[#1c1c1f]",
    white: "border-white bg-white text-[#080808] hover:bg-white/92",
    ghost: "border-transparent bg-transparent text-[var(--im-muted)] hover:text-[var(--im-ink)]",
    outline: "border-[var(--im-ink)]/20 bg-transparent text-[var(--im-ink)] hover:border-[#C1272D] hover:text-[#C1272D] dark:text-white dark:border-white/25 dark:hover:border-white dark:hover:text-white",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "min-h-9 px-4 text-[11px]",
    md: "min-h-11 px-5 text-xs",
    lg: "min-h-12 px-6 text-sm",
  };
  const cls = cn(base, variants[variant], sizes[size], className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      className: cn(cls, (children.props as { className?: string })?.className),
      ...props,
    });
  }
  return <button className={cls} {...props}>{children}</button>;
}

type BadgeVariant = "red" | "gold" | "default" | "muted" | "white" | "dark";
type BadgeSize = "sm" | "md";

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

export function Badge({ children, variant = "default", size = "md", className, ...props }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    red: "border-[#C1272D]/35 bg-[#C1272D]/10 text-[#C1272D]",
    gold: "border-[#d4af37]/30 bg-[#d4af37]/10 text-[#b9962e] dark:text-[#d4af37]",
    default: "border-[var(--im-border)] bg-[var(--im-surface)] text-[var(--im-ink)]",
    muted: "border-[var(--im-border)] bg-transparent text-[var(--im-muted)]",
    white: "border-white/20 bg-white/10 text-white",
    dark: "border-[#27272A] bg-[#141414] text-white",
  };
  const sizes: Record<BadgeSize, string> = { sm: "px-2 py-0.5 text-[9px]", md: "px-2.5 py-1 text-[10px]" };
  return (
    <span className={cn("inline-flex items-center border font-mono font-bold uppercase tracking-[0.14em]", variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
