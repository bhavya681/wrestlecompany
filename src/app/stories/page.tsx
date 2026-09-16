import { StoryCard } from "@/components/stories/StoryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { stories } from "@/data";

export default function StoriesPage() {
  const sortedStories = [...stories].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return new Date(b.image).getTime() - new Date(a.image).getTime();
  });

  const activeStories = sortedStories.filter((s) => s.status === "active");
  const pastStories = sortedStories.filter((s) => s.status === "past");

  return (
    <>
      <PageHeader
        title="STORIES"
        subtitle="The rivalries, the betrayals, the moments that define Indus Matworks."
        overline="EDITORIAL"
        backgroundImage="https://picsum.photos/seed/stories-hero/1920/1080"
      />

      <section className="py-12">
        <div className="container-wide">
          <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
            ACTIVE STORYLINES
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="default" />
            ))}
          </div>

          {pastStories.length > 0 && (
            <>
              <h2 className="mb-6 mt-12 font-display text-2xl font-bold text-foreground">
                ARCHIVED STORIES
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastStories.map((story) => (
                  <StoryCard key={story.id} story={story} variant="compact" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
