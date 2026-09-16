import Link from "next/link";
import { ImLogo } from "@/components/logo/ImLogo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center border-b border-border bg-background-secondary py-24">
      <div className="container-wide text-center">
        <ImLogo size="xl" />

        <div className="mt-8">
          <p className="font-display text-8xl font-black text-accent-red">
            404
          </p>
          <h1 className="font-display text-3xl font-bold text-foreground">
            PAGE NOT FOUND
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-sm text-foreground-muted">
            The page you&apos;re looking for doesn&apos;t exist. It may have
            been moved or removed.
          </p>
        </div>

        <div className="mt-8">
          <Button variant="primary" size="lg" asChild>
            <Link href="/">RETURN TO HOME</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
