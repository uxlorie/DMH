import { client } from "./client";
import { isSanityConfigured } from "../env";
import { DEFAULT_SITE_SETTINGS } from "@/lib/defaults";
import {
  getFeaturedEventbriteShows,
  getUpcomingEventbriteShows,
} from "@/lib/eventbrite-shows";
import type { Show, SiteSettings } from "@/lib/types";

const showFields = `
  _id,
  title,
  slug,
  date,
  genres,
  ticketUrl,
  poster,
  description,
  featured
`;

export const upcomingShowsQuery = `
  *[_type == "show" && date >= now()] | order(date asc) {
    ${showFields}
  }
`;

export const featuredShowsQuery = `
  *[_type == "show" && date >= now() && featured == true] | order(date asc) [0...4] {
    ${showFields}
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    venueName,
    tagline,
    address,
    phone,
    email,
    socialLinks,
    defaultTicketUrl,
    mapEmbedUrl,
    hours,
    aboutText
  }
`;

export async function getUpcomingShows(): Promise<Show[]> {
  if (!isSanityConfigured) return getUpcomingEventbriteShows();

  const shows = await client.fetch<Show[]>(
    upcomingShowsQuery,
    {},
    { next: { revalidate: 60 } },
  );

  if (shows.length === 0) return getUpcomingEventbriteShows();
  return shows;
}

export async function getFeaturedShows(): Promise<Show[]> {
  if (!isSanityConfigured) return getFeaturedEventbriteShows();

  const featured = await client.fetch<Show[]>(
    featuredShowsQuery,
    {},
    { next: { revalidate: 60 } },
  );
  if (featured.length > 0) return featured;

  const upcoming = await getUpcomingShows();
  const featuredFromUpcoming = upcoming.filter((show) => show.featured);
  if (featuredFromUpcoming.length > 0) return featuredFromUpcoming.slice(0, 4);

  return upcoming.slice(0, 4);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return DEFAULT_SITE_SETTINGS;

  const settings = await client.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60 } },
  );

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...settings,
  };
}

export function getAllGenres(shows: Show[]): string[] {
  const genres = new Set<string>();
  for (const show of shows) {
    for (const genre of show.genres ?? []) {
      genres.add(genre);
    }
  }
  return Array.from(genres).sort((a, b) => a.localeCompare(b));
}
