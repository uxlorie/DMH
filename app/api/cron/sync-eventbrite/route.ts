import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { EVENTBRITE_CACHE_TAG } from "@/lib/eventbrite-sync";
import { runEventbriteSyncJob } from "@/lib/eventbrite-shows";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return true;

  return request.headers.get("x-cron-secret") === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runEventbriteSyncJob();
    revalidateTag(EVENTBRITE_CACHE_TAG, "max");

    return NextResponse.json({
      ok: true,
      syncedAt: result.syncedAt,
      totalShows: result.shows.length,
      upcomingShows: result.shows.filter(
        (show) => new Date(show.date).getTime() >= Date.now(),
      ).length,
      newEvents: result.newEventIds,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
