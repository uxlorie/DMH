import { syncEventbriteShows } from "../lib/eventbrite-sync";
import { EVENTBRITE_FALLBACK_SHOWS } from "../lib/eventbrite-fallback-shows";

async function main() {
  const result = await syncEventbriteShows(EVENTBRITE_FALLBACK_SHOWS);

  console.log(`Synced ${result.shows.length} shows at ${result.syncedAt}`);

  if (result.newEventIds.length > 0) {
    console.log("New events:", result.newEventIds.join(", "));
  } else {
    console.log("No new events since last sync.");
  }

  for (const show of result.shows) {
    console.log(`- ${show.date} | ${show.title}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
