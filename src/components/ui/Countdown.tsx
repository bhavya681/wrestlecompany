"use client";

import { useEffect, useState } from "react";
import { calculateCountdown } from "@/lib/utils";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps extends ComponentProps<"div"> {
  targetDate: string;
  label?: string;
}

export function Countdown({
  targetDate,
  label = "NEXT EVENT IN",
  className,
  ...props
}: CountdownProps) {
  const [time, setTime] = useState(calculateCountdown(targetDate));
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setTime(calculateCountdown(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, reduced]);

  const { days, hours, minutes, seconds, expired } = time;

  if (expired) {
    return (
      <div
        className={cn(
          "font-mono text-sm tracking-wider text-foreground-muted",
          className
        )}
        {...props}
      >
        EVENT UNDERWAY
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1 font-mono text-center",
        className
      )}
      {...props}
    >
      <span className="text-xs font-medium tracking-wider uppercase text-foreground-muted">
        {label}
      </span>
      <div className="flex items-center justify-center gap-3 text-2xl font-bold text-foreground sm:text-3xl">
        <TimeUnit value={days} label="DAYS" />
        <span className="text-accent-red">:</span>
        <TimeUnit value={hours} label="HOURS" />
        <span className="text-accent-red">:</span>
        <TimeUnit value={minutes} label="MINUTES" />
        <span className="text-accent-red">:</span>
        <TimeUnit value={seconds} label="SECONDS" />
      </div>
    </div>
  );
}

function TimeUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="tabular-nums">{value.toString().padStart(2, "0")}</span>
      <span className="text-[10px] font-medium tracking-widest text-foreground-muted">
        {label}
      </span>
    </div>
  );
}
