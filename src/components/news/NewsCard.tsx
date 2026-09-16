import Image from "next/image";
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
      <a
        href={`/news/${article.slug}`}
        className="group block focus:outline-none focus:ring-2 focus:ring-accent-red"
      >
        <div className="flex gap-3">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover grayscale transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-0"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Badge variant="default" size="sm" className="mb-1">
              {getCategoryName(article.category)}
            </Badge>
            <h3 className="font-display text-sm font-bold text-foreground line-clamp-2 group-hover:text-accent-red">
              {article.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 font-body text-xs text-foreground-muted">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime} min</span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (variant === "featured") {
    return (
      <a
        href={`/news/${article.slug}`}
        className="group block focus:outline-none focus:ring-2 focus:ring-accent-red md:col-span-2"
      >
        <div className="relative overflow-hidden border border-border md:aspect-[16/9] md:flex">
          <div className="relative h-48 w-full md:h-auto md:w-1/2">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <Badge variant="red" size="sm">
              {getCategoryName(article.category)}
            </Badge>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
              {article.title}
            </h3>
            <p className="mt-3 font-body text-sm text-foreground-muted line-clamp-3">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 font-body text-xs text-foreground-muted">
              <span>{article.author}</span>
              <span>·</span>
              <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`/news/${article.slug}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-accent-red"
    >
      <div className="flex flex-col">
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover grayscale transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-0"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <Badge variant="default" size="sm">
            {getCategoryName(article.category)}
          </Badge>
          <h3 className="mt-2 font-display text-sm font-bold text-foreground group-hover:text-accent-red">
            {article.title}
          </h3>
          <div className="mt-2 font-body text-xs text-foreground-muted">
            {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>
      </div>
    </a>
  );
}
