"use client";

import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-accent-red disabled:pointer-events-none disabled:opacity-50";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-accent-red text-background hover:bg-accent-red-hover active:scale-[0.98]",
    secondary:
      "border border-accent-red text-foreground hover:bg-accent-red hover:text-background active:scale-[0.98]",
    ghost:
      "text-foreground hover:text-accent-red active:scale-[0.98]",
    outline:
      "border border-foreground text-foreground hover:border-accent-red hover:text-accent-red active:scale-[0.98]",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs uppercase",
    md: "px-6 py-2.5 text-sm uppercase",
    lg: "px-8 py-3 text-sm md:text-base uppercase",
  };

  const combinedClassName = cn(
    base,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      className: cn(
        combinedClassName,
        (children.props as { className?: string })?.className
      ),
      ...props,
    });
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

type BadgeVariant = "red" | "gold" | "default" | "muted" | "white";
type BadgeSize = "sm" | "md";

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center font-body font-medium tracking-wider uppercase";

  const variants: Record<BadgeVariant, string> = {
    red: "bg-accent-red/10 text-accent-red border border-accent-red/30",
    gold: "bg-accent-gold/10 text-accent-gold border border-accent-gold/30",
    default: "bg-foreground/10 text-foreground border border-border",
    muted:
      "bg-foreground-muted/10 text-foreground-muted border border-border",
    white: "bg-foreground text-background border border-foreground",
  };

  const sizes: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[10px] leading-4",
    md: "px-2.5 py-1 text-xs leading-4",
  };

  return (
    <span
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
