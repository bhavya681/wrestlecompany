import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface StatBlockProps extends ComponentProps<"div"> {
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function StatBlock({
  wins,
  losses,
  draws,
  winRate,
  label,
  size = "md",
  className,
  ...props
}: StatBlockProps) {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-7xl",
  };

  const labelSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-3 items-center gap-2 font-mono",
        className
      )}
      {...props}
    >
      <StatNumber
        value={wins.toString()}
        label="WINS"
        labelSize={labelSize[size]}
        valueSize={sizeClasses[size]}
        color="text-foreground"
      />
      <StatNumber
        value={losses.toString()}
        label="LOSSES"
        labelSize={labelSize[size]}
        valueSize={sizeClasses[size]}
        color="text-foreground-muted"
      />
      <StatNumber
        value={draws.toString()}
        label="DRAWS"
        labelSize={labelSize[size]}
        valueSize={sizeClasses[size]}
        color="text-foreground-muted"
      />

      {label && (
        <div className="col-span-3 mt-2 text-center">
          <span
            className={cn(
              "font-display font-bold text-accent-gold",
              labelSize[size]
            )}
          >
            {label}
          </span>
        </div>
      )}

      <div className="col-span-3 mt-2 text-center">
        <span className={cn("font-display text-3xl font-bold text-accent-red", labelSize[size])}>
          {winRate}%
        </span>
        <span className={cn("font-mono text-foreground-muted", labelSize[size])}>
          {" "}
          WIN RATE
        </span>
      </div>
    </div>
  );
}

function StatNumber({
  value,
  label,
  valueSize,
  labelSize,
  color,
}: {
  value: string;
  label: string;
  valueSize: string;
  labelSize: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={cn(
          "font-display font-black tabular-nums",
          valueSize,
          color
        )}
      >
        {value}
      </span>
      <span className={cn("tracking-widest uppercase", labelSize)}>
        {label}
      </span>
    </div>
  );
}
