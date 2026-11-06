"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

/**
 * Pins the contact section and scrubs [data-contact-line] elements up from
 * below as the closing finale. Desktop + motion-allowed only.
 */
export default function PinnedContact({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || window.innerWidth < 768) return;
      const el = container.current;
      if (!el) return;

      const lines = gsap.utils.toArray<HTMLElement>("[data-contact-line]", el);
      if (!lines.length) return;

      gsap.from(lines, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=70%",
          scrub: true,
          pin: true,
          pinType: "transform",
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container, dependencies: [reduced] },
  );

  return <div ref={container}>{children}</div>;
}
