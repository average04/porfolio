"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns true when the user prefers reduced motion.
 *
 * SSR-safe via useSyncExternalStore: the server and the first hydration render
 * use `false` (getServerSnapshot), then React syncs to the real client value
 * and updates live on change — with no hydration mismatch, even for consumers
 * that branch their rendered DOM on the result.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
