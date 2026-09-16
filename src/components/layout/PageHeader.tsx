import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface PageHeaderProps extends ComponentProps<"header"> {
  title: string;
  subtitle?: string;
  overline?: string;
  backgroundImage?: string;
}

export function PageHeader({
  title,
  subtitle,
  overline,
  backgroundImage,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex items-center border-b border-border bg-gradient-to-b from-background-secondary to-background py-20 md:py-28",
        backgroundImage && "bg-cover bg-center",
        className
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      {...props}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover opacity-10"
          aria-hidden="true"
        />
      )}

      <div className="container-wide relative z-10">
        {overline && (
          <span className="font-body text-xs font-medium tracking-widest uppercase text-foreground-muted">
            {overline}
          </span>
        )}
        <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl font-body text-sm text-foreground-muted md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
