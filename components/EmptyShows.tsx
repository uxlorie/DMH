import Link from "next/link";

export default function EmptyShows() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <p className="font-display text-2xl font-bold text-foreground">
        No upcoming shows yet
      </p>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Check back soon for new dates across every genre — rock, jazz, country,
        hip-hop, and more.
      </p>
      <Link
        href="/about"
        className="mt-8 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
      >
        Learn about the venue
      </Link>
    </div>
  );
}
