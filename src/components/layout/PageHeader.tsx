import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends Omit<ComponentProps<"header">, "title"> {
  title: ReactNode;
  subtitle?: string;
  overline?: string;
  accentColor?: "red" | "black";
  backgroundImage?: string;
  compact?: boolean;
  dark?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  overline,
  backgroundImage,
  compact = false,
  dark,
  accentColor,
  className,
  ...props
}: PageHeaderProps) {
  void dark;
  void accentColor;

  return (
    <header
      className={cn(
        "im-cinematic relative isolate overflow-hidden border-b border-white/10 text-white",
        compact ? "py-12 md:py-16" : "py-16 md:py-24 lg:py-28",
        className
      )}
      {...props}
    >
      {backgroundImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/92 to-[#080808]/45"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"
          />
        </>
      ) : (
        <>
          <div aria-hidden className="im-grid-lines absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="absolute -right-[8%] top-0 h-full w-[52%] bg-[#991B1B]/20 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]"
          />
        </>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 right-2 select-none font-display text-[clamp(8rem,18vw,17rem)] font-black leading-none text-transparent opacity-[0.055] [-webkit-text-stroke:1px_#fff] sm:right-8"
      >
        IM
      </div>

      <div className="container-wide relative z-10">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-[2px] w-8 shrink-0 bg-[#C1272D]" />
          {overline ? (
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#DC2626]">
              {overline}
            </p>
          ) : null}
        </div>
        <h1 className="im-display mt-4 max-w-5xl text-balance text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.94]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-white/58 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
