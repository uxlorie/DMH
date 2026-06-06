import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Syne } from "next/font/google";

import { getSiteSettings } from "@/sanity/lib/queries";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: settings.venueName,
      template: `%s | ${settings.venueName}`,
    },
    description: settings.tagline,
    openGraph: {
      title: settings.venueName,
      description: settings.tagline,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
