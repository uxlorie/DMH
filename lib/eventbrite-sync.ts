import type { Show } from "./types";

export const EVENTBRITE_ORGANIZER_URL =
  "https://www.eventbrite.com/o/downtown-music-hall-31764488781";

export const EVENTBRITE_CACHE_TAG = "eventbrite-shows";
export const EVENTBRITE_REVALIDATE_SECONDS = 60 * 60 * 24;

interface EventbriteEvent {
  id: string;
  name: string;
  url: string;
  start_date: string;
  start_time: string;
  timezone: string;
  summary?: string;
  is_cancelled?: boolean;
  image?: { url?: string };
}

interface SyncResult {
  shows: Show[];
  newEventIds: string[];
  syncedAt: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function cleanTitle(name: string): string {
  return name
    .replace(/^Downtown Music Hall Presents:\s*/i, "")
    .replace(/^Hit Me with Music Entertainment Presents:\s*/i, "")
    .replace(/^Bassick Events Presents:\s*/i, "")
    .trim();
}

function toISOInTimeZone(
  date: string,
  time: string,
  timeZone: string,
): string {
  const normalizedTime = time.length === 5 ? `${time}:00` : time;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second = "0"] = normalizedTime.split(":");

  let utcMs = Date.UTC(
    year,
    month - 1,
    day,
    Number(hour),
    Number(minute),
    Number(second),
  );

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(utcMs)).map((part) => [part.type, part.value]),
    );

    const localizedUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );

    const diff =
      Date.UTC(year, month - 1, day, Number(hour), Number(minute), Number(second)) -
      localizedUtc;

    utcMs += diff;
  }

  return new Date(utcMs).toISOString();
}

export function eventbriteImageToPosterUrl(imageUrl?: string): string | undefined {
  if (!imageUrl) return undefined;

  try {
    const decoded = decodeURIComponent(imageUrl);
    const match = decoded.match(/cdn\.evbuc\.com\/images\/(.+?)(?:\?|$)/);
    if (match) {
      return `https://cdn.evbuc.com/images/${match[1]}`;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function inferGenres(title: string): string[] {
  const normalized = title.toLowerCase();
  const genres = new Set<string>();

  if (normalized.includes("tribute")) genres.add("Tribute");
  if (normalized.includes("dubstep") || normalized.includes("pressure")) {
    genres.add("EDM");
    genres.add("Dubstep");
  }
  if (normalized.includes("boogie") || normalized.includes("disco")) {
    genres.add("Dance");
  }
  if (normalized.includes("jazz")) genres.add("Jazz");
  if (normalized.includes("country")) genres.add("Country");
  if (normalized.includes("metal") || normalized.includes("wolf")) genres.add("Metal");
  if (normalized.includes("rock") || normalized.includes("heathen")) genres.add("Rock");
  if (normalized.includes("hip-hop") || normalized.includes("rap")) genres.add("Hip-Hop");
  if (normalized.includes("comedy") || normalized.includes("stand-up")) genres.add("Comedy");

  if (genres.size === 0) genres.add("Live Music");

  return Array.from(genres);
}

function mapEventToShow(
  event: EventbriteEvent,
  existing?: Show,
): Show {
  const title = cleanTitle(event.name);
  const slug = slugify(title || event.name);

  return {
    _id: `eventbrite-${event.id}`,
    title,
    slug: { current: slug || `event-${event.id}` },
    date: toISOInTimeZone(event.start_date, event.start_time, event.timezone),
    genres: existing?.genres ?? inferGenres(title),
    ticketUrl: event.url,
    posterUrl:
      existing?.posterUrl ??
      eventbriteImageToPosterUrl(event.image?.url) ??
      undefined,
    description: existing?.description ?? event.summary?.trim() ?? undefined,
    featured: existing?.featured ?? false,
  };
}

export function filterUpcomingShows(shows: Show[]): Show[] {
  const now = Date.now();
  return shows
    .filter((show) => new Date(show.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function applyFeaturedShows(shows: Show[]): Show[] {
  const upcoming = filterUpcomingShows(shows);
  const featuredCount = upcoming.filter((show) => show.featured).length;

  if (featuredCount >= 4) return upcoming;

  return upcoming.map((show, index) => ({
    ...show,
    featured: show.featured || index < 4,
  }));
}

export async function fetchEventbriteEvents(): Promise<EventbriteEvent[]> {
  const response = await fetch(EVENTBRITE_ORGANIZER_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DowntownMusicHall/1.0; +https://www.downtown850.com)",
      Accept: "text/html,application/xhtml+xml",
    },
    next: {
      revalidate: EVENTBRITE_REVALIDATE_SECONDS,
      tags: [EVENTBRITE_CACHE_TAG],
    },
  });

  if (!response.ok) {
    throw new Error(`Eventbrite fetch failed with status ${response.status}`);
  }

  const html = await response.text();
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );

  if (!match) {
    throw new Error("Could not parse Eventbrite organizer page");
  }

  const data = JSON.parse(match[1]) as {
    props?: { pageProps?: { upcomingEvents?: EventbriteEvent[] } };
  };

  const events = data.props?.pageProps?.upcomingEvents ?? [];

  return events.filter((event) => !event.is_cancelled);
}

export async function syncEventbriteShows(
  existingShows: Show[] = [],
): Promise<SyncResult> {
  const events = await fetchEventbriteEvents();
  const existingById = new Map(existingShows.map((show) => [show._id, show]));
  const previousIds = new Set(existingShows.map((show) => show._id));

  const mapped = events.map((event) => {
    const id = `eventbrite-${event.id}`;
    return mapEventToShow(event, existingById.get(id));
  });

  const newEventIds = mapped
    .map((show) => show._id)
    .filter((id) => !previousIds.has(id));

  const shows = applyFeaturedShows(mapped);

  return {
    shows,
    newEventIds,
    syncedAt: new Date().toISOString(),
  };
}
