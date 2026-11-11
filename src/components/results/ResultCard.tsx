import Image from "next/image";
import Link from "next/link";
import { Badge, RatingStars } from "@/components/ui";
import { getMatchTypeLabel, formatDateShort, cn } from "@/lib/utils";
import type { Match, Wrestler } from "@/types";

interface ResultCardProps { match: Match; wrestlers: Wrestler[]; expanded?: boolean; }

function norm(src?: string | null) {
  if (!src) return null;
  const m = src.trim().match(/^\[.*?\]\((.*?)\)$/);
  return (m?.[1] || src).trim().replace(/^['"]|['"]$/g, "") || null;
}
function find(id: string, name: string, list: Wrestler[]) {
  return list.find((w) => w.id?.toLowerCase() === id?.toLowerCase()) || list.find((w) => (w.ringName || w.name).toLowerCase() === name?.toLowerCase());
}

export function ResultCard({ match, wrestlers, expanded = false }: ResultCardProps) {
  const c1 = match.competitors[0];
  const c2 = match.competitors[1];
  const w1 = find(c1?.wrestlerId, c1?.wrestler, wrestlers);
  const w2 = find(c2?.wrestlerId, c2?.wrestler, wrestlers);
  const img1 = norm(w1?.imageFull || w1?.image);
  const img2 = norm(w2?.imageFull || w2?.image);
  const winner = match.result?.winner || "";
  const w1Win = Boolean(winner && (winner === c1?.wrestlerId || winner === w1?.id));
  const w2Win = Boolean(winner && (winner === c2?.wrestlerId || winner === w2?.id));
  const draw = winner === "draw";

  return (
    <article className="border border-[var(--im-border)] bg-[var(--im-page)] p-4 transition-colors hover:border-[#C1272D]/30 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--im-border)] pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="red" size="sm">{match.eventName}</Badge>
          {match.championship && <Badge variant="dark" size="sm">Championship</Badge>}
          {match.isMainEvent && <Badge variant="default" size="sm">Main Event</Badge>}
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{formatDateShort(match.date)} · {match.city}</span>
      </div>

      <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Competitor wrestler={w1} fallback={c1?.wrestler} img={img1} won={w1Win} dim={!w1Win && !draw && !!winner} />
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-[#C1272D]">VS</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{getMatchTypeLabel(match.type)}</p>
        </div>
        <Competitor wrestler={w2} fallback={c2?.wrestler} img={img2} won={w2Win} dim={!w2Win && !draw && !!winner} right />
      </div>

      {expanded && match.description && <p className="mt-4 border-l-2 border-[#C1272D] pl-3 font-body text-sm leading-6 text-[var(--im-muted)]">{match.description}</p>}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--im-border)] pt-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
          {winner ? (draw ? "Decision: Draw" : `Winner: ${w1Win ? (w1?.ringName || c1?.wrestler) : (w2?.ringName || c2?.wrestler)} · ${match.result.method}${match.result.time ? ` · ${match.result.time}` : ""}`) : "Result pending"}
        </p>
        {match.rating ? <RatingStars rating={match.rating} size="sm" /> : null}
      </div>
    </article>
  );
}

function Competitor({ wrestler, fallback, img, won, dim, right }: { wrestler?: Wrestler; fallback?: string; img: string | null; won: boolean; dim: boolean; right?: boolean }) {
  const name = wrestler?.ringName || fallback || "Competitor";
  const inner = (
    <>
      <div className={cn("relative h-14 w-14 shrink-0 overflow-hidden border bg-[var(--im-surface)]", won ? "border-[#C1272D]" : "border-[var(--im-border)]", dim && "opacity-55")}>
        {img ? <Image src={img} alt={name} fill className={cn("object-cover object-top", dim && "saturate-50")} sizes="56px" /> : <div className="flex h-full items-center justify-center font-display text-lg font-bold text-[var(--im-muted)]">{name.charAt(0)}</div>}
      </div>
      <div className={cn("min-w-0", right && "sm:text-right")}>
        <p className={cn("font-mono text-[8px] font-bold uppercase tracking-[0.16em]", won ? "text-[#C1272D]" : "text-[var(--im-muted)]")}>{won ? "Winner" : dim ? "Result Recorded" : "Competitor"}</p>
        <p className="truncate font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)]">{name}</p>
      </div>
    </>
  );
  const cls = cn("flex min-w-0 items-center gap-3", right && "sm:flex-row-reverse");
  return wrestler ? <Link href={`/roster/${wrestler.id}`} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>;
}
