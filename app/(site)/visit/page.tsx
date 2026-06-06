import type { Metadata } from "next";

import BusinessHoursList from "@/components/BusinessHoursList";
import { BUSINESS_HOURS } from "@/lib/defaults";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Plan your visit to Downtown Music Hall at 212 Miracle Strip Pkwy SE, Fort Walton Beach, FL — hours, parking, and directions on the Emerald Coast.",
};

export default async function VisitPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Plan your visit
      </p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Find us in downtown FWB
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Downtown Music Hall sits at 212 Miracle Strip Pkwy SE in downtown Fort
        Walton Beach — minutes from the waterfront on Florida&apos;s Emerald Coast.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Location
            </h2>
            <address className="mt-3 not-italic leading-relaxed text-muted whitespace-pre-line">
              {settings.address}
            </address>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Hours
            </h2>
            <BusinessHoursList hours={BUSINESS_HOURS} />
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Contact
            </h2>
            <ul className="mt-3 space-y-2 text-muted">
              {settings.phone ? (
                <li>
                  Phone:{" "}
                  <a
                    href={`tel:${settings.phone.replace(/\D/g, "")}`}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {settings.phone}
                  </a>
                </li>
              ) : null}
              {settings.email ? (
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {settings.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Parking
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Street and nearby lot parking available along downtown Miracle Strip.
              Arrive early on busy Friday and Saturday nights — rideshare is a
              great option for sold-out shows. The venue is a short walk from the
              Fort Walton Beach waterfront.
            </p>
          </section>
        </div>

        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <iframe
            title="Downtown Music Hall map"
            src={settings.mapEmbedUrl}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </div>
  );
}
