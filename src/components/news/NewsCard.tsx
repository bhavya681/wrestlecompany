import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Button";
import { getCategoryName } from "@/lib/utils";
import type { Article } from "@/types";

interface NewsCardProps {
  article: Article;
  variant?: "featured" | "default" | "compact";
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/news/${article.slug}`} className="group flex gap-4 border-b border-[var(--im-border)] py-4 last:border-b-0">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
          <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="112px" />
        </div>
        <div className="min-w-0">
          <Badge variant="red" size="sm">{getCategoryName(article.category)}</Badge>
          <h3 className="mt-2 line-clamp-2 font-display text-base font-bold uppercase leading-tight text-[var(--im-ink)] group-hover:text-[var(--im-muted)]">{article.title}</h3>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/news/${article.slug}`} className="group block overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width:1024px) 100vw, 66vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute left-4 top-4"><Badge variant="red" size="sm">{getCategoryName(article.category)}</Badge></div>
        </div>
        <div className="p-5 sm:p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--im-muted)]">
            {article.author} · {new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {article.readTime} min
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] text-[var(--im-ink)] group-hover:text-[var(--im-ink)] sm:text-4xl">{article.title}</h3>
          <p className="mt-3 line-clamp-3 font-body text-sm leading-6 text-[var(--im-muted)]">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.slug}`} className="group block overflow-hidden border border-[var(--im-border)] bg-[var(--im-page)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/35">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--im-border)]">
        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 33vw" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="red" size="sm">{getCategoryName(article.category)}</Badge>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">{new Date(article.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)] group-hover:text-[#C1272D]">{article.title}</h3>
        <p className="mt-2 line-clamp-2 font-body text-sm leading-6 text-[var(--im-muted)]">{article.excerpt}</p>
      </div>
    </Link>
  );
}
