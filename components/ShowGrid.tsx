"use client";

import { useMemo, useState } from "react";

import type { Show } from "@/lib/types";

import EmptyShows from "./EmptyShows";
import ShowCard from "./ShowCard";

interface ShowGridProps {
  shows: Show[];
  genres: string[];
}

export default function ShowGrid({ shows, genres }: ShowGridProps) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredShows = useMemo(() => {
    if (!activeGenre) return shows;
    return shows.filter((show) => show.genres?.includes(activeGenre));
  }, [activeGenre, shows]);

  if (shows.length === 0) {
    return <EmptyShows />;
  }

  return (
    <div>
      {genres.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by genre">
          <button
            type="button"
            onClick={() => setActiveGenre(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeGenre === null
                ? "bg-accent text-background"
                : "border border-border text-muted hover:border-accent/40 hover:text-foreground"
            }`}
          >
            All genres
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setActiveGenre(genre)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeGenre === genre
                  ? "bg-accent text-background"
                  : "border border-border text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      ) : null}

      {filteredShows.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface px-6 py-10 text-center text-muted">
          No shows match that genre. Try another filter or check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredShows.map((show) => (
            <ShowCard key={show._id} show={show} />
          ))}
        </div>
      )}
    </div>
  );
}
