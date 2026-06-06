import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Show {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  genres?: string[];
  ticketUrl: string;
  poster?: SanityImage;
  posterUrl?: string;
  description?: string;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  venueName: string;
  tagline: string;
  address: string;
  phone?: string;
  email?: string;
  socialLinks?: SocialLink[];
  defaultTicketUrl?: string;
  mapEmbedUrl?: string;
  hours?: string;
  aboutText?: PortableTextBlock[];
}
