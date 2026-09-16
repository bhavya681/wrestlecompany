import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps
  extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  overline?: string;
  number?: string;
  variant?: "default" | "editorial";
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  overline,
  number,
  variant = "default",
  className,
  ...props
}: SectionHeaderProps) {
  if (variant === "editorial") {
    return (
      <div
        className={cn(
          "mb-10 flex flex-col gap-2",
          align === "center" && "items-center text-center",
          className
        )}
        {...props}
      >
        {/* Number + Overline row */}
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          {number && (
            <span className="im-section-number">{number}</span>
          )}
          {number && overline && (
            <span className="h-px w-8 bg-accent-red opacity-60" />
          )}
          {overline && (
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground-muted">
              {overline}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {title}
        </h2>

        {/* Accent rule */}
        <span className="im-accent-rule mt-1" aria-hidden="true" />

        {/* Subtitle */}
        {subtitle && (
          <p
            className={cn(
              "max-w-xl font-body text-sm text-foreground-muted md:text-base",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  /* DEFAULT variant */
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {overline && (
        <span className="font-body text-xs font-medium tracking-widest uppercase text-foreground-muted">
          {overline}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl font-body text-sm text-foreground-muted md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
