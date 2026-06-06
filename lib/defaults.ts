import type { SiteSettings } from "./types";

import { EVENTBRITE_ORGANIZER_URL } from "./eventbrite-shows";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  venueName: "Downtown Music Hall",
  tagline:
    "The top spot for live entertainment on the Emerald Coast — all genres welcome.",
  address: "212 Miracle Strip Pkwy SE\nFort Walton Beach, FL 32548",
  phone: "(850) 226-8307",
  hours:
    "Live music Friday and Saturday nights, plus Sunday brunch performances. Doors typically open one hour before showtime. Full bar and kitchen open during events.",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=212+Miracle+Strip+Pkwy+SE,+Fort+Walton+Beach,+FL+32548&output=embed",
  defaultTicketUrl: EVENTBRITE_ORGANIZER_URL,
  socialLinks: [
    { platform: "Website", url: "https://www.downtown850.com/" },
    { platform: "Eventbrite", url: EVENTBRITE_ORGANIZER_URL },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/Downtownmusichall850",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/downtown_music_hall",
    },
  ],
};
