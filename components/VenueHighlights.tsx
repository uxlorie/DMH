const highlights = [
  {
    title: "Full Bar",
    emoji: "🍸",
    description:
      "Cocktails, beer, and wine on Miracle Strip — plus billiards and shuffleboard in the back for a low-key night out.",
  },
  {
    title: "Fresh Pizza",
    emoji: "🍕",
    description:
      "Specialty pizzas made with fresh local ingredients and dough crafted with local honey — a Fort Walton Beach favorite.",
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
              <div
                className="mb-4 inline-flex rounded-xl bg-accent/10 px-3 py-2"
                aria-hidden="true"
              >
                <span className="text-2xl leading-none">{item.emoji}</span>
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
