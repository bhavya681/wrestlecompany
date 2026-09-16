import { championships } from "@/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChampionshipCard } from "@/components/championships/ChampionshipCard";
import { Badge } from "@/components/ui/Button";

export default function ChampionshipsPage() {
  return (
    <>
      <PageHeader
        title="THE TITLES"
        subtitle="The championships that define greatness in Indus Matworks. Four belts. Four legacies. One standard."
        overline="CHAMPIONSHIPS"
        backgroundImage="https://picsum.photos/seed/championships-hero/1920/1080"
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="space-y-12">
            {championships.map((champ) => (
              <div key={champ.id} id={champ.id}>
                <div className="mb-8">
                  <ChampionshipCard championship={champ} variant="default" />
                </div>

                <div className="mt-8 border-t border-border pt-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      TITLE HISTORY
                    </h3>
                    <Badge variant="gold" size="sm">
                      {champ.history.length} REIGNS
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {champ.history.map((reign, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col justify-between gap-2 border-l border-accent-gold/20 pl-4 py-3 md:flex-row md:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-display text-2xl font-bold text-accent-gold">
                            #{reign.reign}
                          </span>
                          <span className="font-display text-lg font-bold text-foreground">
                            {reign.champion}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 font-mono text-sm text-foreground-muted">
                          <span>
                            {reign.from}{" "}
                            {reign.to ? `– ${reign.to}` : "– PRESENT"}
                          </span>
                          <span className="text-accent-gold">
                            {reign.days} DAYS
                          </span>
                          <span>{reign.defenses} DEFENSES</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
