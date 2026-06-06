import { unstable_cache } from "next/cache";

import { EVENTBRITE_FALLBACK_SHOWS } from "./eventbrite-fallback-shows";
import {
  EVENTBRITE_CACHE_TAG,
  EVENTBRITE_REVALIDATE_SECONDS,
  applyFeaturedShows,
  filterUpcomingShows,
  syncEventbriteShows,
} from "./eventbrite-sync";
import type { Show } from "./types";

export { EVENTBRITE_ORGANIZER_URL } from "./eventbrite-sync";

const getSyncedEventbriteShows = unstable_cache(
  async () => syncEventbriteShows(EVENTBRITE_FALLBACK_SHOWS),
  ["eventbrite-shows-sync"],
  {
    revalidate: EVENTBRITE_REVALIDATE_SECONDS,
    tags: [EVENTBRITE_CACHE_TAG],
  },
);

export async function getUpcomingEventbriteShows(): Promise<Show[]> {
  try {
    const { shows } = await getSyncedEventbriteShows();
    const upcoming = filterUpcomingShows(shows);
    if (upcoming.length > 0) return upcoming;
  } catch (error) {
    console.error("Eventbrite sync failed:", error);
  }

  return filterUpcomingShows(EVENTBRITE_FALLBACK_SHOWS);
}

export async function getFeaturedEventbriteShows(): Promise<Show[]> {
  try {
    const { shows } = await getSyncedEventbriteShows();
    const featured = applyFeaturedShows(shows)
      .filter((show) => show.featured)
      .slice(0, 4);

    if (featured.length > 0) {
      return filterUpcomingShows(featured);
    }
  } catch (error) {
    console.error("Eventbrite featured sync failed:", error);
  }

  const upcoming = await getUpcomingEventbriteShows();
  return upcoming.slice(0, 4);
}

/** Used by the cron route to force a fresh sync. */
export async function runEventbriteSyncJob() {
  return syncEventbriteShows(EVENTBRITE_FALLBACK_SHOWS);
}
