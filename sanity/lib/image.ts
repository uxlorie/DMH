import { createImageUrlBuilder } from "@sanity/image-url";

import type { SanityImage } from "@/lib/types";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
