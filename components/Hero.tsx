import Link from "next/link";

interface HeroProps {
  tagline: string;
}

export default function Hero({ tagline }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(10,10,11,0.45))]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 py-24">
        <p className="animate-fade-up mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Fort Walton Beach · Emerald Coast
        </p>
        <h1 className="animate-fade-up-delay-1 font-display max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Downtown Music Hall
        </h1>
        <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {tagline}
        </p>
        <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
          <Link
            href="/shows"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-hover hover:shadow-[0_0_32px_rgba(52,211,153,0.25)]"
          >
            View Upcoming Shows
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            About the Venue
          </Link>
        </div>
      </div>
    </section>
  );
}
