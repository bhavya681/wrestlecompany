import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface TicketButtonProps extends ComponentProps<"a"> {
  date?: string;
  soldOut?: boolean;
}

export function TicketButton({
  date,
  soldOut = false,
  className,
  children = soldOut ? "SOLD OUT" : "GET TICKETS",
  ...props
}: TicketButtonProps) {
  if (soldOut) {
    return (
      <a
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-none border border-foreground/30 bg-foreground-muted/5 px-6 py-2.5 font-body text-sm font-medium tracking-widest uppercase text-foreground-muted",
          className
        )}
        {...props}
      >
        <span className="text-xs">SOLD</span>
        {children}
      </a>
    );
  }

  return (
    <a
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden border border-accent-red bg-accent-red px-6 py-2.5 font-body text-sm font-bold tracking-widest uppercase text-background shadow-lg shadow-accent-red/30 transition-all duration-200 hover:bg-accent-red-hover hover:shadow-xl hover:shadow-accent-red/40 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="flex items-center gap-2">
        <span className="text-xs">TICKETS</span>
        {children}
      </span>
      {date && (
        <span className="ml-1 text-xs opacity-80">{date}</span>
      )}
    </a>
  );
}
