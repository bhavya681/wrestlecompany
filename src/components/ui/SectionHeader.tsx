import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  overline?: string;
  dark?: boolean;
}

export function SectionHeader({ title, subtitle, align = "left", overline, dark = false, className, ...props }: SectionHeaderProps) {
  const center = align === "center";
  return (
    <div className={cn("mb-8 flex flex-col gap-2 md:mb-10", center && "items-center text-center", className)} {...props}>
      {overline && <span className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.22em]", dark ? "text-[#C1272D]" : "text-[#C1272D]")}>{overline}</span>}
      <h2 className={cn("im-display text-4xl sm:text-5xl md:text-[3.25rem]", dark ? "text-white" : "text-[var(--im-ink)]")}>{title}</h2>
      {subtitle && <p className={cn("max-w-2xl font-body text-sm leading-6 sm:text-base", dark ? "text-white/62" : "text-[var(--im-muted)]", center && "mx-auto")}>{subtitle}</p>}
      <span className={cn("mt-2 block h-[2px] w-12 bg-[#C1272D]", center && "mx-auto")} aria-hidden />
    </div>
  );
}
