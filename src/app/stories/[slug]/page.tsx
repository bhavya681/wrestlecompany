import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Badge } from "@/components/ui/Button";
import { stories, wrestlers } from "@/data";
import type { Wrestler } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return { title: "Not Found" };
  return {
    title: story.title,
    description: story.subtitle,
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) notFound();

  const participants = story.participants
    .map((id) => wrestlers.find((w) => w.id === id))
    .filter((w): w is Wrestler => w !== undefined);

  return (
    <article className="py-8 md:py-12">
      <div className="container-wide">
        <div className="mb-8">
          <Badge variant="default" size="sm">
            {story.status === "active" ? "ACTIVE STORYLINE" : "ARCHIVED STORYLINE"}
          </Badge>
        </div>

        <h1 className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {story.title}
        </h1>
        <p className="mt-2 font-display text-xl text-accent-red">
          {story.subtitle}
        </p>

        <div className="mt-8 aspect-[16/9] w-full overflow-hidden">
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover grayscale"
            priority
          />
        </div>

        <div className="mt-8 max-w-3xl">
          <ReactMarkdown
            components={{
              h1: ({ node: _node, ...props }) => (
                <h1
                  className="mt-8 font-display text-3xl font-bold text-foreground"
                  {...props}
                />
              ),
              h2: ({ node: _node, ...props }) => (
                <h2
                  className="mt-6 font-display text-2xl font-bold text-foreground"
                  {...props}
                />
              ),
              h3: ({ node: _node, ...props }) => (
                <h3
                  className="mt-4 font-display text-xl font-bold text-foreground"
                  {...props}
                />
              ),
              p: ({ node: _node, ...props }) => (
                <p
                  className="mb-4 font-body text-base leading-relaxed text-foreground-muted"
                  {...props}
                />
              ),
              strong: ({ node: _node, ...props }) => (
                <strong className="font-bold text-foreground" {...props} />
              ),
            }}
          >
            {story.content}
          </ReactMarkdown>
        </div>

        {participants.length > 0 && (
          <div className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              INVOLVED
            </h2>
            <div className="flex flex-wrap gap-6">
              {participants.map((wrestler) => (
                <Link
                  key={wrestler.id}
                  href={`/roster/${wrestler.id}`}
                  className="group block focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden">
                      <Image
                        src={wrestler.image}
                        alt={wrestler.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0"
                      />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-foreground group-hover:text-accent-red">
                        {wrestler.name}
                      </p>
                      <p className="font-body text-xs text-foreground-muted">
                        {wrestler.nickname}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
