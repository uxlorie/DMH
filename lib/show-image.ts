import type { Show } from "./types";
import { urlFor } from "@/sanity/lib/image";

export function getShowPosterUrl(show: Show): string | null {
  if (show.posterUrl) return show.posterUrl;
  if (show.poster) {
    return urlFor(show.poster).width(600).height(750).fit("crop").url();
  }
  return null;
}

export function getShowPosterAlt(show: Show): string {
  return show.poster?.alt ?? `${show.title} poster`;
}
