# Downtown Music Hall

A sleek, dark-themed marketing website for **Downtown Music Hall** — a live music venue in the Florida Panhandle. Built with Next.js and Sanity CMS.

## Features

- Dark, genre-inclusive design
- Upcoming show calendar with genre filters
- External ticket links per show (Eventbrite, Ticketmaster, etc.)
- Venue highlights: full bar and pizza
- Automatic daily Eventbrite show sync
- Embedded Sanity Studio at `/studio` for staff to manage content

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sanity CMS](https://www.sanity.io/)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project.
2. Copy your **Project ID**.
3. Create a dataset named `production` (or use your preferred name).

### 3. Configure environment variables

Copy the example env file and fill in your Sanity credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=           # optional, for draft preview later
CRON_SECRET=your_random_secret   # required for daily Eventbrite sync job
```

### 4. Eventbrite show sync

When Sanity is not configured, shows are pulled from the [Downtown Music Hall Eventbrite organizer page](https://www.eventbrite.com/o/downtown-music-hall-31764488781).

- Shows are cached for **24 hours**
- A cron job runs **daily at 12:00 UTC** and refreshes the cache
- New Eventbrite listings are picked up automatically

**Manual sync (local):**

```bash
npm run sync:shows
```

**Trigger sync via API (requires `CRON_SECRET` in `.env.local`):**

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/sync-eventbrite
```

On Vercel, add `CRON_SECRET` to your project environment variables. The schedule is defined in [`vercel.json`](vercel.json).

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for the CMS.

## Managing content

### Shows

In Sanity Studio, create **Show** documents with:

| Field | Description |
|---|---|
| Title | Artist or event name |
| Slug | URL-friendly identifier |
| Date & Time | Show datetime (past shows auto-hide) |
| Genres | Tags for filtering (Rock, Jazz, etc.) |
| Ticket URL | External link to purchase tickets |
| Poster | Event image |
| Featured | Spotlight on homepage |
| Family Friendly | Badge for all-ages-friendly shows |

### Site settings

Create one **Site Settings** document to customize:

- Venue name, tagline, address
- Phone, email, social links
- Google Maps embed URL
- About page content

Default placeholder values are used until site settings are published in Sanity.

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example`.
4. Deploy.

Shows revalidate every 60 seconds (ISR), so new CMS content appears within about a minute.

### Sanity Studio

The studio is embedded at `/studio` on your deployed site. For production, configure CORS in your Sanity project settings to allow your Vercel domain.

## Project structure

```
app/
  (site)/          # Public marketing pages
  studio/          # Sanity Studio
components/        # UI components
sanity/
  schema/          # CMS content models
  lib/             # Client, queries, image helpers
lib/               # Shared types and defaults
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
