import Link from "next/link";

import EmptyShows from "@/components/EmptyShows";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ShowCard from "@/components/ShowCard";
import VenueHighlights from "@/components/VenueHighlights";
import { getFeaturedShows, getSiteSettings } from "@/sanity/lib/queries";

export default async function HomePage() {
  const [settings, featuredShows] = await Promise.all([
    getSiteSettings(),
    getFeaturedShows(),
  ]);

  return (
    <>
      <Hero tagline={settings.tagline} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="On the calendar"
          title="Upcoming shows"
          description="Every genre, one stage. Grab tickets before they sell out."
          href="/shows"
          linkLabel="View all shows"
        />

        {featuredShows.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredShows.map((show) => (
              <ShowCard key={show._id} show={show} />
            ))}
          </div>
        ) : (
          <EmptyShows />
        )}
      </section>

      <VenueHighlights />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-border bg-[linear-gradient(135deg,rgba(52,211,153,0.08),rgba(20,20,22,0.9))] p-8 sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Plan your night
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">
            All genres. All welcome.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            From Sunday brunch sets to late-night headliners, Downtown Music Hall
            brings downtown Fort Walton Beach together for live music without
            boundaries — rock, country, hip-hop, comedy, and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shows"
              className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              See the calendar
            </Link>
            <Link
              href="/visit"
              className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              Directions & hours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
