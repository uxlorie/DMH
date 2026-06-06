import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";

import VenueHighlights from "@/components/VenueHighlights";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Downtown Music Hall — Fort Walton Beach's live music venue on the Emerald Coast, with a full bar and local-honey pizza.",
};

const defaultAbout = [
  "Downtown Music Hall is Fort Walton Beach's live music venue on the Emerald Coast — the only dedicated original-music room in town, with one of the most eclectic atmospheres in Northwest Florida.",
  "From local openers to touring rock, country, hip-hop, and comedy acts, our stage welcomes every genre. Specialty pizzas made with local honey dough, a full bar, billiards, and shuffleboard mean you can make a whole evening of it without leaving Miracle Strip.",
  "Catch live music Friday and Saturday nights, or join us for Sunday brunch performances on Miracle Strip.",
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Our story
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Live music for everyone
        </h1>

        <div className="prose prose-invert mt-10 max-w-3xl space-y-6 text-muted">
          {settings.aboutText ? (
            <PortableText
              value={settings.aboutText}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="leading-relaxed text-muted">{children}</p>
                  ),
                },
              }}
            />
          ) : (
            defaultAbout.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Inclusive by design
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We book artists across genres and welcome every audience. Our
              calendar reflects the full spectrum of live music — because great
              shows shouldn&apos;t fit in one box.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Built for nights out
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A full bar and fresh pizza mean you can make a whole evening of it
              without leaving the building. Come for the music, stay for the vibe.
            </p>
          </div>
        </div>
      </div>

      <VenueHighlights />
    </>
  );
}
