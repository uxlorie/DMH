import Image from "next/image";
import Link from "next/link";

import { formatShowDate } from "@/lib/format";
import { getShowPosterAlt, getShowPosterUrl } from "@/lib/show-image";
import type { Show } from "@/lib/types";

interface ShowCardProps {
  show: Show;
}

export default function ShowCard({ show }: ShowCardProps) {
  const imageUrl = getShowPosterUrl(show);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-elevated">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={getShowPosterAlt(show)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#1c1c1f,#182824)] p-6 text-center">
            <span className="font-display text-2xl font-bold text-accent/80">
              {show.title}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <time
          dateTime={show.date}
          className="text-xs font-medium uppercase tracking-wider text-accent"
        >
          {formatShowDate(show.date)}
        </time>
        <h3 className="font-display mt-2 text-xl font-bold leading-tight text-foreground">
          {show.title}
        </h3>
        {show.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {show.description}
          </p>
        ) : null}
        {show.genres && show.genres.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {show.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {genre}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto pt-5">
          <Link
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </article>
  );
}
