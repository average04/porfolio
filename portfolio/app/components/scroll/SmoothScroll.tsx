"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

/**
 * Initializes Lenis in NATIVE scroll mode and bridges it to GSAP's ticker,
 * so ScrollTrigger and Framer Motion's useScroll all read window scroll.
 * Skips entirely under prefers-reduced-motion (native scroll instead).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Snapshot only — does not respond to runtime OS changes.
    // The CSS @media block in globals.css handles dynamic preference shifts.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // keep native momentum on touch devices
    });

    // Bridge: Lenis tells ScrollTrigger to update; GSAP's ticker drives Lenis.
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate pins/triggers AFTER the next paint (so all child pin
    // ScrollTriggers have registered and layout has settled), then again once
    // web fonts finish loading (display:swap can shift display-text height and
    // throw off pin distances).
    const refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
    let fontsActive = true;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (fontsActive) ScrollTrigger.refresh();
      });
    }

    return () => {
      fontsActive = false;
      cancelAnimationFrame(refreshRaf);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP default
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
