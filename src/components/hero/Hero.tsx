"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ImLogo } from "@/components/logo/ImLogo";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const heroImages = [
  {
    src: "https://picsum.photos/seed/hero-wrestler/1920/1080",
    alt: "Indus Matworks wrestlers in the ring",
  },
  {
    src: "https://i.pravatar.cc/1920?img=11",
    alt: "Arjun Rao - The Lion of Mumbai",
  },
  {
    src: "https://picsum.photos/seed/hero-ring/1920/1080",
    alt: "Wrestling ring at sunset",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate h-screen min-h-[90vh] w-full">
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={img.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        <div className="absolute inset-0 im-grain" />
      </div>

      <div className="container-wide relative flex h-full items-center">
        <div className="max-w-lg space-y-6 pb-20 pt-20 sm:pt-32">
          <ImLogo size="xl" priority />

          <div className="space-y-2">
            <h1 className="font-display text-4xl font-black tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              THE FUTURE OF
              <br />
              <span className="text-accent-red">INDIAN WRESTLING.</span>
            </h1>
            <p className="font-body text-sm tracking-widest text-foreground-muted">
              INDIA • PROFESSIONAL WRESTLING
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/media">WATCH NOW</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/events">EXPLORE EVENTS</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
