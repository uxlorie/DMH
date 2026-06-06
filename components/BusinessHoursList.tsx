"use client";

import { useEffect, useState } from "react";

import type { BusinessHoursEntry } from "@/lib/defaults";

interface BusinessHoursListProps {
  hours: BusinessHoursEntry[];
}

export default function BusinessHoursList({ hours }: BusinessHoursListProps) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "America/Chicago",
      }),
    );
  }, []);

  return (
    <dl className="mt-4 space-y-2">
      {hours.map(({ day, hours: dayHours }) => {
        const isToday = today !== null && day === today;

        return (
          <div
            key={day}
            className="flex items-baseline justify-between gap-4"
          >
            <dt
              className={
                isToday ? "font-semibold text-foreground" : "text-muted"
              }
            >
              {day}
            </dt>
            <dd
              className={
                isToday ? "font-semibold text-foreground" : "text-muted"
              }
            >
              {dayHours}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
