"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: string;
  label?: string;
  className?: string;
  dark?: boolean;
}

function parts(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Mins" },
    { v: s, l: "Secs" },
  ];
}

export function Countdown({ targetDate, label = "Event Starts In", className, dark = false }: CountdownProps) {
  const [time, setTime] = useState(() => parts(targetDate));
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;
    const id = setInterval(() => setTime(parts(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!time) {
    return <div className={cn("border p-4", dark ? "border-[var(--im-border)] bg-[var(--im-surface)]" : "border-[var(--im-border)] bg-[var(--im-surface)]", className)}><p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.18em]", dark ? "text-[#C1272D]" : "text-[var(--im-ink)]")}>Live / In Progress</p></div>;
  }

  return (
    <div className={cn("border p-4 sm:p-5", dark ? "border-[var(--im-border)] bg-[var(--im-surface)]" : "border-[var(--im-border)] bg-[var(--im-surface)]", className)}>
      <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.18em]", dark ? "text-[var(--im-muted)]" : "text-[var(--im-muted)]")}>{label}</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {time.map((u) => (
          <div key={u.l} className={cn("border px-2 py-3 text-center", dark ? "border-[var(--im-border)] bg-[var(--im-page)]" : "border-[var(--im-border)] bg-[var(--im-page)]")}>
            <p className={cn("font-display text-2xl font-bold tabular-nums leading-none sm:text-3xl", dark ? "text-[var(--im-ink)]" : "text-[var(--im-ink)]")}>
              {String(u.v).padStart(2, "0")}
            </p>
            <p className={cn("mt-1 font-mono text-[8px] uppercase tracking-[0.16em]", dark ? "text-[var(--im-muted)]" : "text-[var(--im-muted)]")}>{u.l}</p>
          </div>
        ))}
      </div>
      {reduced && <p className={cn("mt-2 font-mono text-[9px] uppercase tracking-[0.14em]", dark ? "text-[var(--im-muted)]" : "text-[var(--im-muted)]")}>Countdown reduced for accessibility.</p>}
    </div>
  );
}
