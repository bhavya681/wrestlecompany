import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ImLogoProps extends Omit<ComponentProps<"div">, "children"> {
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: "h-6",
  md: "h-8",
  lg: "h-12",
  xl: "h-16",
};

export function ImLogo({
  size = "md",
  alt = "Indus Matworks",
  priority = false,
  className,
  ...props
}: ImLogoProps) {
  return (
    <div className="shrink-0" {...props}>
      <Image
        src="/logo.png"
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className={cn("h-auto w-auto", sizeMap[size], className)}
      />
    </div>
  );
}
