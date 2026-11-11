import Image from "next/image";
import { Badge } from "@/components/ui/Button";
import type { MediaItem } from "@/types";

interface VideoCardProps { item: MediaItem; variant?: "featured" | "default" | "compact"; }

export function VideoCard({ item, variant = "default" }: VideoCardProps) {
  if (variant === "compact") {
    return (
      <a href={item.url} className="group flex gap-4 border-b border-[var(--im-border)] py-4 last:border-b-0">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
          <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="128px" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Play /></div>
        </div>
        <div className="min-w-0">
          <Badge variant="default" size="sm">{item.category.replace(/-/g, " ")}</Badge>
          <h3 className="mt-2 line-clamp-2 font-display text-base font-bold uppercase leading-tight text-[var(--im-ink)] group-hover:text-[#C1272D]">{item.title}</h3>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{item.duration || item.date}</p>
        </div>
      </a>
    );
  }

  if (variant === "featured") {
    return (
      <a href={item.url} className="group block overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)] transition-colors hover:border-[#C1272D]/45">
        <div className="relative aspect-[16/9]">
          <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width:1024px) 100vw, 66vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/45 backdrop-blur-sm transition-colors group-hover:border-[#C1272D] group-hover:bg-[#C1272D]"><Play large /></div></div>
          <div className="absolute inset-x-0 top-0 h-[2px] bg-[#C1272D] opacity-70" aria-hidden />
          <div className="absolute left-4 top-4 border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">{item.category.replace(/-/g, " ")}</div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-3xl font-bold uppercase leading-[0.95] text-[var(--im-ink)] group-hover:text-[var(--im-ink)]">{item.title}</h3>
          <p className="mt-2 line-clamp-2 font-body text-sm leading-6 text-[var(--im-muted)]">{item.description}</p>
        </div>
      </a>
    );
  }

  return (
    <a href={item.url} className="group block overflow-hidden border border-[var(--im-border)] bg-[var(--im-page)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/35 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[16/9] border-b border-[var(--im-border)] bg-[var(--im-surface)]">
        <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 33vw" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition-opacity group-hover:opacity-100"><Play /></div>
        {item.duration && <span className="absolute bottom-2 right-2 border border-white/15 bg-black/65 px-1.5 py-0.5 font-mono text-[9px] text-white">{item.duration}</span>}
      </div>
      <div className="p-4">
        <Badge variant="default" size="sm">{item.category.replace(/-/g, " ")}</Badge>
        <h3 className="mt-2 line-clamp-2 font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)] group-hover:text-[#C1272D]">{item.title}</h3>
      </div>
    </a>
  );
}

function Play({ large }: { large?: boolean }) {
  return (
    <svg className={large ? "h-7 w-7 text-white" : "h-5 w-5 text-white"} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
