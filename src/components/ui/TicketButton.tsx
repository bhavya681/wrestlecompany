import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface TicketButtonProps extends ComponentProps<"a"> {
  date?: string;
  soldOut?: boolean;
}

export function TicketButton({ date, soldOut = false, className, children = "Get Tickets", href = "#", ...props }: TicketButtonProps) {
  if (soldOut) {
    return (
      <span className={cn("inline-flex min-h-11 items-center justify-center border border-[var(--im-border)] bg-[var(--im-surface)] px-5 font-display text-xs font-bold uppercase tracking-[0.1em] text-[var(--im-muted)]", className)}>
        Sold Out
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("im-link inline-flex min-h-11 items-center justify-center gap-3 border border-[#C1272D] bg-[#C1272D] px-5 font-display text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#991B1B] hover:border-[#991B1B]", className)}
      {...props}
    >
      <span>{children}</span>
      {date && <span className="font-mono text-[9px] tracking-[0.12em] text-white/80">{date}</span>}
    </a>
  );
}
