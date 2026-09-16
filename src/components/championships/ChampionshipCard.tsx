import Image from "next/image";
import { Badge } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Championship } from "@/types";

interface ChampionshipCardProps {
  championship: Championship;
  variant?: "default" | "compact";
  onClick?: () => void;
}

export function ChampionshipCard({
  championship,
  variant = "default",
  onClick,
}: ChampionshipCardProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "group relative cursor-pointer overflow-hidden border border-border bg-background-secondary p-4 transition-all duration-300 hover:border-accent-red/50",
          onClick && "hover:shadow-xl hover:shadow-accent-red/5"
        )}
        onClick={onClick}
      >
        <div className="mb-3 flex h-20 w-full items-center justify-center">
          <Image
            src={championship.image}
            alt={championship.name}
            width={200}
            height={80}
            className="h-16 w-auto object-contain"
          />
        </div>
        <h3 className="font-display text-sm font-bold tracking-wider text-foreground">
          {championship.name}
        </h3>
        {championship.currentChampion && (
          <p className="mt-1 font-body text-sm text-foreground-muted">
            {championship.currentChampion.wrestler}
          </p>
        )}
        <div className="mt-2 flex items-center gap-4 font-mono text-xs text-foreground-muted">
          <span>{championship.daysHeld} DAYS</span>
          <span>{championship.defenses} DEFENSES</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-accent-gold/20 bg-background-secondary transition-all duration-300 hover:border-accent-gold/50",
        onClick && "cursor-pointer hover:shadow-xl hover:shadow-accent-gold/5"
      )}
      onClick={onClick}
    >
      <div className="relative flex flex-col md:flex-row">
        <div className="flex items-center justify-center bg-gradient-to-b from-background-tertiary to-background-secondary p-6 md:w-1/3">
          <Image
            src={championship.image}
            alt={championship.name}
            width={280}
            height={140}
            className="h-32 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        <div className="p-6 md:w-2/3">
          <Badge variant="gold" size="sm">
            {championship.shortName} Championship
          </Badge>

          <h3 className="mt-3 font-display text-3xl font-bold tracking-wider text-accent-gold">
            {championship.name}
          </h3>

          {championship.currentChampion ? (
            <div className="mt-6 space-y-1">
              <h4 className="font-display text-xl font-bold text-foreground">
                CURRENT CHAMPION
              </h4>
              <p className="font-display text-2xl font-bold text-accent-gold">
                {championship.currentChampion.wrestler}
              </p>
              <p className="font-body text-sm text-foreground-muted">
                {championship.currentChampion.nickname}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-sm">
                <div>
                  <span className="text-foreground-muted">REIGN</span>
                  <span className="ml-2 font-bold text-foreground">
                    #{championship.reign}
                  </span>
                </div>
                <div>
                  <span className="text-foreground-muted">DAYS HELD</span>
                  <span className="ml-2 font-bold text-foreground">
                    {championship.daysHeld}
                  </span>
                </div>
                <div>
                  <span className="text-foreground-muted">DEFENSES</span>
                  <span className="ml-2 font-bold text-foreground">
                    {championship.defenses}
                  </span>
                </div>
                {championship.lastDefense && (
                  <div>
                    <span className="text-foreground-muted">
                      LAST DEFENSE
                    </span>
                    <span className="ml-2 font-bold text-foreground">
                      {championship.lastDefense.event}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-6 font-body text-foreground-muted">
              Vacant — tournament to be announced
            </p>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 via-transparent to-transparent opacity-100" />
    </div>
  );
}
