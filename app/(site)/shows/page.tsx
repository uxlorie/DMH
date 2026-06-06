import type { Metadata } from "next";

import SectionHeading from "@/components/SectionHeading";
import ShowGrid from "@/components/ShowGrid";
import {
  getAllGenres,
  getSiteSettings,
  getUpcomingShows,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Shows",
  description:
    "Browse upcoming concerts and events at Downtown Music Hall. All genres welcome — get tickets for your next night out.",
  openGraph: {
    title: "Upcoming Shows | Downtown Music Hall",
    description:
      "Browse upcoming concerts and events at Downtown Music Hall in the Florida Panhandle.",
  },
};

export default async function ShowsPage() {
  const [shows, settings] = await Promise.all([
    getUpcomingShows(),
    getSiteSettings(),
  ]);
  const genres = getAllGenres(shows);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Calendar"
        title="Upcoming shows"
        description={`${settings.tagline}. Filter by genre or browse the full lineup.`}
      />
      <ShowGrid shows={shows} genres={genres} />
    </div>
  );
}
