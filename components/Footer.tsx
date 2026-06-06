import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-foreground">
            {settings.venueName}
          </p>
          <p className="mt-2 text-sm text-muted">{settings.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Visit
          </p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-muted whitespace-pre-line">
            {settings.address}
          </address>
          {settings.phone ? (
            <p className="mt-2 text-sm text-muted">
              <a
                href={`tel:${settings.phone.replace(/\D/g, "")}`}
                className="transition-colors hover:text-accent"
              >
                {settings.phone}
              </a>
            </p>
          ) : null}
          {settings.email ? (
            <p className="mt-1 text-sm text-muted">
              <a
                href={`mailto:${settings.email}`}
                className="transition-colors hover:text-accent"
              >
                {settings.email}
              </a>
            </p>
          ) : null}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Connect
          </p>
          <ul className="mt-3 space-y-2">
            {(settings.socialLinks ?? []).map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/shows"
            className="mt-6 inline-flex text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Browse upcoming shows →
          </Link>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6">
        <p className="mx-auto max-w-6xl text-center text-xs text-muted">
          © {year} {settings.venueName}. All genres welcome.
        </p>
      </div>
    </footer>
  );
}
