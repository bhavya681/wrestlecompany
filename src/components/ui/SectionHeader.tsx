import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps
  extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  overline?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  overline,
  className,
  ...props
}: SectionHeaderProps) {
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
