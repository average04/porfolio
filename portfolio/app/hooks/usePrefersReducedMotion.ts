"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion.
 * Reads the initial OS setting lazily (SSR-safe) and updates live
 * whenever the OS setting changes.
 */
export function usePrefersReducedMotion(): boolean {
  // Lazy initializer: runs once on the client, returns false on the server.
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
