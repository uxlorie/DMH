"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PrismaticBurst = dynamic(() => import("@/components/PrismaticBurst"), {
  ssr: false,
});

export default function PageBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
      aria-hidden="true"
    >
      {!reducedMotion && (
        <PrismaticBurst
          animationType="rotate3d"
          intensity={2.5}
          speed={0.5}
          distort={1}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={24}
          mixBlendMode="lighten"
          colors={["#10B981", "#34d399", "#6ee7b7", "#7C3AED", "#ffffff"]}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.08),transparent_50%),linear-gradient(to_bottom,rgba(10,10,11,0.55),rgba(10,10,11,0.92))]" />
    </div>
  );
}
