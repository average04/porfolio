"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

/**
 * Pins the hero and scrubs a subtle scale on [data-hero-name] and a fade/lift
 * on [data-hero-body] as you scroll through. Desktop + motion-allowed only.
 */
export default function PinnedHero({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || window.innerWidth < 768) return;
      const el = container.current;
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=80%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        el.querySelector("[data-hero-name]"),
        { scale: 1.06, transformOrigin: "left center", ease: "none" },
        0,
      ).to(
        el.querySelector("[data-hero-body]"),
        { y: -40, opacity: 0.5, ease: "none" },
        0,
      );
    },
    { scope: container, dependencies: [reduced] },
  );

  return <div ref={container}>{children}</div>;
}
