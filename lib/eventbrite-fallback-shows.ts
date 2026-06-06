import type { Show } from "./types";

const poster = (path: string) => `https://cdn.evbuc.com/images/${path}`;

/** Seed data for metadata merge and offline fallback. */
export const EVENTBRITE_FALLBACK_SHOWS: Show[] = [
  {
    _id: "eventbrite-1983650033649",
    title: "BOOGIE W1DERLAND",
    slug: { current: "boogie-w1derland" },
    date: "2026-06-06T20:00:00-05:00",
    genres: ["Dance", "70s", "80s"],
    ticketUrl:
      "https://www.eventbrite.com/e/hit-me-with-music-entertainment-presents-boogie-w1derland-tickets-1983650033649",
    posterUrl: poster("1178068062/489493003597/1/original.20260220-221558"),
    description:
      "A 70s and 80s dance party with Soul Train line dancing, costume contests, and hits from ABBA, Prince, Michael Jackson, and more.",
    featured: true,
  },
  {
    _id: "eventbrite-1984437277316",
    title: "The Filthy Heathens",
    slug: { current: "the-filthy-heathens" },
    date: "2026-06-19T19:00:00-05:00",
    genres: ["Southern Rock", "Country", "Alt Rock"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-music-hall-presents-the-filthy-heathens-tickets-1984437277316",
    posterUrl: poster("1178966306/489493003597/1/original.20260304-003316"),
    description:
      "Southern grit meets alt-edge — high-octane live country-rock from one of the Panhandle's fastest-rising bands.",
    featured: true,
  },
  {
    _id: "eventbrite-1984135300094",
    title: "Drake Bell",
    slug: { current: "drake-bell" },
    date: "2026-06-24T19:00:00-05:00",
    genres: ["Pop", "Rock"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-music-hall-presents-drake-bell-tickets-1984135300094",
    posterUrl: poster("1182077437/489493003597/1/original.20260413-205501"),
    description:
      "All-ages show with special guest Nick 2. VIP packages include a selfie and autographed poster.",
    featured: true,
  },
  {
    _id: "eventbrite-1984776229130",
    title: "We're Wolves / Donefor",
    slug: { current: "were-wolves-donefor" },
    date: "2026-06-25T19:00:00-05:00",
    genres: ["Metal", "Metalcore", "Rock"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-music-hall-presents-were-wolves-donefor-tickets-1984776229130",
    posterUrl: poster("1182422032/489493003597/1/original.20260417-170229"),
    description:
      "Beasts of the East Tour with special guest Skela — alternative, hard rock, and metalcore on Miracle Strip.",
    featured: false,
  },
  {
    _id: "eventbrite-1985724305853",
    title: "Family Values Tribute Show",
    slug: { current: "family-values-tribute-show" },
    date: "2026-07-11T19:00:00-05:00",
    genres: ["Nu Metal", "Rock", "Tribute"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-music-hall-presents-family-values-tribute-show-tickets-1985724305853",
    posterUrl: poster("1180468290/489493003597/1/original.20260323-143018"),
    description:
      "Tribute performances by Deuce (Korn), Counterfeit (Limp Bizkit), and Fatejacket.",
    featured: true,
  },
  {
    _id: "eventbrite-1987332667506",
    title: "Tunnel Vision / Drifting Roots",
    slug: { current: "tunnel-vision-drifting-roots" },
    date: "2026-07-15T19:00:00-05:00",
    genres: ["Reggae", "Punk", "Surf"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-music-hall-presents-tunnel-vision-drifting-roots-tickets-1987332667506",
    posterUrl: poster("1182423920/489493003597/1/original.20260417-172438"),
    description:
      "Florida tour stop with special guests Capital Dub and Nothing Short of Pure.",
    featured: false,
  },
  {
    _id: "eventbrite-1990745040004",
    title: "The Stolen Faces",
    slug: { current: "the-stolen-faces" },
    date: "2026-08-08T19:00:00-05:00",
    genres: ["Rock", "Tribute"],
    ticketUrl:
      "https://www.eventbrite.com/e/downtown-music-hall-presents-the-stolen-faces-tickets-1990745040004",
    posterUrl: poster("1185825444/489493003597/1/original.20260601-000022"),
    description:
      "Nashville's tribute to the Grateful Dead — expansive catalog, improvisational energy, and a night built for Deadheads.",
    featured: false,
  },
  {
    _id: "eventbrite-1983558916114",
    title: "PRESSURE",
    slug: { current: "pressure" },
    date: "2026-08-29T13:00:00-05:00",
    genres: ["EDM", "Dubstep", "Festival"],
    ticketUrl:
      "https://www.eventbrite.com/e/bassick-events-presents-pressure-tickets-1983558916114",
    posterUrl: poster("1177961093/489493003597/1/original.20260219-185321"),
    description:
      "Bassick Events' all-day dubstep festival — 2 stages, 20+ artists, 1 PM–4 AM at Downtown Music Hall.",
    featured: false,
  },
];
