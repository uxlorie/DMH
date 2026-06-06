const highlights = [
  {
    title: "Full Bar",
    description:
      "Cocktails, beer, and wine on Miracle Strip — plus billiards and shuffleboard in the back for a low-key night out.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 3.5h4.5M8.25 8.25h7.5M7 21h10a2 2 0 002-2V8.25a2 2 0 00-.59-1.41l-4.16-4.16A2 2 0 0013.66 2H10.34a2 2 0 00-1.41.59L4.59 6.84A2 2 0 004 8.25V19a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "Fresh Pizza",
    description:
      "Specialty pizzas made with fresh local ingredients and dough crafted with local honey — a Fort Walton Beach favorite.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3c4.5 3 7.5 7 7.5 12a7.5 7.5 0 01-15 0c0-5 3-9 7.5-12z"
      />
    ),
  },
];

export default function VenueHighlights() {
  return (
    <section className="border-y border-border bg-surface/50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            The experience
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            More than a concert
          </h2>
          <p className="mt-4 text-muted">
            From upcoming local bands to world-renowned touring acts, Downtown
            Music Hall is downtown Fort Walton Beach&apos;s home for eclectic
            live entertainment — every genre, every crowd.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
