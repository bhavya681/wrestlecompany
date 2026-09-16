import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface PageHeaderProps extends ComponentProps<"header"> {
  title: string;
  subtitle?: string;
  overline?: string;
  backgroundImage?: string;
  accentColor?: "red" | "gold";
}

export function PageHeader({
  title,
  subtitle,
  overline,
  backgroundImage,
  accentColor = "red",
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex min-h-[240px] items-end border-b border-border bg-background-secondary pb-10 pt-28 md:min-h-[300px] md:pb-14 md:pt-32",
        className
      )}
      {...props}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </>
      )}

      {/* Subtle grain */}
      <div className="im-grain absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="container-wide relative z-10 w-full">
        {overline && (
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground-muted">
            {overline}
          </p>
        )}

        <h1 className="font-display text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 max-w-2xl font-body text-sm text-foreground-muted md:text-base">
            {subtitle}
          </p>
        )}

        {/* Accent rule below title */}
        <span
          className={cn(
            "mt-4 block h-0.5 w-12",
            accentColor === "gold" ? "bg-accent-gold" : "bg-accent-red"
          )}
          aria-hidden="true"
        />
      </div>

      {/* Bottom accent line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-px w-full opacity-30",
          accentColor === "gold"
            ? "bg-gradient-to-r from-transparent via-accent-gold to-transparent"
            : "bg-gradient-to-r from-transparent via-accent-red to-transparent"
        )}
        aria-hidden="true"
      />
    </header>
  );
}
