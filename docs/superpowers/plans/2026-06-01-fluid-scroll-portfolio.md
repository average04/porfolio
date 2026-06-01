# Fluid-Scroll Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing single-page Next.js portfolio into a "fluid", Awwwards-style scroll experience — smooth momentum scrolling plus a pinned hero, horizontal-scroll projects, a pinned contact finale, parallax/velocity motion, and a WebGL shader hero background.

**Architecture:** A hybrid where all three animation engines read one scroll source of truth. **Lenis** drives native window scroll (momentum feel); **GSAP ScrollTrigger** (bridged to Lenis's RAF) handles pinning + horizontal; **Framer Motion** (already in the project) keeps existing reveals and adds parallax/velocity; **OGL** renders a lazy, offscreen-paused shader background. Every effect degrades to plain vertical scroll under `prefers-reduced-motion` and on touch/mobile.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Framer Motion 12 (existing), Lenis, GSAP + @gsap/react, OGL.

---

## Conventions for every task

- **Next app lives in `portfolio/`** (a subdirectory of the repo root `d:\Projects\portfolio`).
  - Run all `npm` / `next` commands from `d:\Projects\portfolio\portfolio`.
  - Run all `git` commands from anywhere in the repo; file paths in `git add` are **repo-root-relative** (e.g. `portfolio/app/...`).
- **Branch:** work happens on `feature/fluid-scroll` (already checked out). `main` stays untouched.
- **Path alias:** `@/*` → `./` (from `portfolio/`), so import app code as `@/app/...`.
- **Accent color:** the CSS token `--orange` is **blue** `#4F9EFF` (warm-dark bg is `#0C0A08`). Use the token / these values; do not introduce literal orange.
- **Verification model:** This feature is almost entirely visual and the project has **no test runner** (package.json scripts are only `dev`/`build`/`start`/`lint`). Per the approved spec, each task is verified by:
  1. `npm run build` succeeds (catches type/SSR errors), and
  2. a specific **manual check** in `npm run dev` (stated per task).
  Do not add a unit-test harness — it is out of scope for the approved spec.
- **Commit after every task.** Keep commits small and scoped.

---

## File map (what gets created / modified)

**Created:**
- `portfolio/app/hooks/usePrefersReducedMotion.ts` — single reduced-motion gate.
- `portfolio/app/lib/gsap.ts` — register ScrollTrigger once, export `gsap`/`ScrollTrigger`.
- `portfolio/app/components/scroll/SmoothScroll.tsx` — Lenis provider + GSAP bridge.
- `portfolio/app/components/scroll/VelocityMarquee.tsx` — scroll-velocity ticker (Framer Motion).
- `portfolio/app/components/scroll/Parallax.tsx` — reusable parallax wrapper (Framer Motion).
- `portfolio/app/components/scroll/PinnedHero.tsx` — GSAP pin wrapper for the hero.
- `portfolio/app/components/scroll/HorizontalProjects.tsx` — GSAP horizontal pin + vertical fallback.
- `portfolio/app/components/scroll/PinnedContact.tsx` — GSAP pin wrapper for the contact finale.
- `portfolio/app/components/webgl/ShaderBackground.tsx` — OGL shader, lazy + offscreen-paused.

**Modified:**
- `portfolio/package.json` — new deps.
- `portfolio/app/globals.css` — remove `scroll-behavior: smooth`, add Lenis CSS + reduced-motion block, drop ticker keyframe animation.
- `portfolio/app/layout.tsx` — wrap children in `<SmoothScroll>`.
- `portfolio/app/page.tsx` — compose the new components into the existing sections.

---

## Task 1: Install dependencies + confirm baseline

**Files:**
- Modify: `portfolio/package.json`, `portfolio/package-lock.json`

- [ ] **Step 1: Confirm a clean baseline build**

Run (from `portfolio/`): `npm run build`
Expected: build completes with no errors (establishes the pre-change baseline).

- [ ] **Step 2: Install the new dependencies**

Run (from `portfolio/`): `npm install lenis gsap @gsap/react ogl`
Expected: installs without peer-dependency errors. `package.json` now lists `lenis`, `gsap`, `@gsap/react`, `ogl` under `dependencies`.

- [ ] **Step 3: Re-build to confirm deps resolve**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add portfolio/package.json portfolio/package-lock.json
git commit -m "build: add lenis, gsap, @gsap/react, ogl for fluid scroll"
```

---

## Task 2: Reduced-motion hook

The single gate every effect consults. A client hook returning `true` when the user prefers reduced motion, reacting to live changes.

**Files:**
- Create: `portfolio/app/hooks/usePrefersReducedMotion.ts`

- [ ] **Step 1: Create the hook**

```ts
"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion.
 * Defaults to false on the server / first paint, then syncs on mount
 * and updates live if the OS setting changes.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds (the hook is unused so far; this confirms it type-checks).

- [ ] **Step 3: Commit**

```bash
git add portfolio/app/hooks/usePrefersReducedMotion.ts
git commit -m "feat: add usePrefersReducedMotion hook"
```

---

## Task 3: GSAP singleton registration

One module that registers `ScrollTrigger` exactly once (client-only) and re-exports `gsap`/`ScrollTrigger` so components never double-register.

**Files:**
- Create: `portfolio/app/lib/gsap.ts`

- [ ] **Step 1: Create the module**

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger touches `window`; only register in the browser.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add portfolio/app/lib/gsap.ts
git commit -m "feat: add gsap singleton with ScrollTrigger registered"
```

---

## Task 4: Lenis smooth scroll + GSAP bridge + CSS fixes

This is the foundation. Lenis animates native window scroll; we bridge it to ScrollTrigger's update loop so GSAP, Lenis, and Framer Motion all read one clock. We also remove the CSS `scroll-behavior: smooth` (it fights Lenis) and add a global reduced-motion block.

**Files:**
- Create: `portfolio/app/components/scroll/SmoothScroll.tsx`
- Modify: `portfolio/app/globals.css` (lines 21-23 area, and append new blocks)
- Modify: `portfolio/app/layout.tsx`

- [ ] **Step 1: Create the SmoothScroll provider**

```tsx
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

    // Recalculate any pins/triggers once layout + fonts settle.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Fix globals.css — remove smooth scroll-behavior**

In `portfolio/app/globals.css`, replace this (around lines 21-23):

```css
/* ─── Reset / base ────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
```

with:

```css
/* ─── Reset / base ────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

/* Lenis owns smooth scroll; native smooth-behavior fights it. */
html.lenis,
html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
```

- [ ] **Step 3: Add a global reduced-motion block at the end of globals.css**

Append to the end of `portfolio/app/globals.css`:

```css
/* ─── Reduced motion ──────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .ticker-track { animation: none !important; }
  .status-dot { animation: none !important; }
}
```

- [ ] **Step 4: Wrap the app in SmoothScroll**

In `portfolio/app/layout.tsx`, add the import and wrap `{children}`:

Add near the top (after the existing imports):

```tsx
import SmoothScroll from "@/app/components/scroll/SmoothScroll";
```

Change the body content from:

```tsx
      <body className={`${barlow.variable} ${instrument.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
```

to:

```tsx
      <body className={`${barlow.variable} ${instrument.variable} ${mono.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
```

- [ ] **Step 5: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds (no SSR errors — SmoothScroll is a client component and only touches `window` inside `useEffect`).

- [ ] **Step 6: Manual verification**

Run (from `portfolio/`): `npm run dev`, open the site.
Expected:
- Scrolling feels weighted / eased (momentum), not the native step scroll.
- Existing reveals, the top progress bar, and the ticker still work.
- In DevTools → Rendering → "Emulate prefers-reduced-motion: reduce", reload: scrolling is plain/native (no Lenis), nothing broken.

- [ ] **Step 7: Commit**

```bash
git add portfolio/app/components/scroll/SmoothScroll.tsx portfolio/app/globals.css portfolio/app/layout.tsx
git commit -m "feat: add Lenis smooth scroll bridged to GSAP ScrollTrigger"
```

---

## Task 5: Velocity-reactive ticker (Framer Motion)

Replace the CSS-only marquee with a Framer Motion marquee whose speed/direction reacts to scroll velocity. Under reduced motion it renders a static row.

**Files:**
- Create: `portfolio/app/components/scroll/VelocityMarquee.tsx`
- Modify: `portfolio/app/globals.css` (drop the `.ticker-track` keyframe animation)
- Modify: `portfolio/app/page.tsx` (swap the ticker block)

- [ ] **Step 1: Create VelocityMarquee**

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

export default function VelocityMarquee({
  items,
  baseVelocity = 2,
}: {
  items: string[];
  baseVelocity?: number;
}) {
  const reduced = usePrefersReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const directionFactor = useRef(1);

  // 4 copies so the -25% wrap is always covered.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  if (reduced) {
    return (
      <div className="ticker-wrap -mx-6">
        <div className="ticker-track">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot"> ✦ </span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-wrap -mx-6">
      <motion.div className="ticker-track" style={{ x }}>
        {row.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-dot"> ✦ </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Remove the CSS marquee animation**

In `portfolio/app/globals.css`, the JS now drives the transform, so delete the keyframe + its use. Replace:

```css
@keyframes ticker-move {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-track {
  display: inline-flex;
  white-space: nowrap;
  animation: ticker-move 28s linear infinite;
}
```

with:

```css
.ticker-track {
  display: inline-flex;
  white-space: nowrap;
  will-change: transform;
}
```

- [ ] **Step 3: Swap the ticker block in page.tsx**

Add this import near the other component imports at the top of `portfolio/app/page.tsx`:

```tsx
import VelocityMarquee from "@/app/components/scroll/VelocityMarquee";
```

Replace the whole ticker block (currently):

```tsx
        {/* ══ TICKER ══════════════════════════════════════════════ */}
        <div className="ticker-wrap mb-24 -mx-6">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="ticker-item">
                {item}
                <span className="ticker-dot"> ✦ </span>
              </span>
            ))}
          </div>
        </div>
```

with:

```tsx
        {/* ══ TICKER ══════════════════════════════════════════════ */}
        <div className="mb-24">
          <VelocityMarquee items={tickerItems} />
        </div>
```

- [ ] **Step 4: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Manual verification**

`npm run dev`:
- Ticker drifts slowly at rest; scrolling fast speeds it up and flips direction with scroll direction.
- Under emulated reduced-motion: ticker is static (no drift), not broken.

- [ ] **Step 6: Commit**

```bash
git add portfolio/app/components/scroll/VelocityMarquee.tsx portfolio/app/globals.css portfolio/app/page.tsx
git commit -m "feat: scroll-velocity reactive ticker"
```

---

## Task 6: Parallax wrapper + apply to headings/avatar

A reusable wrapper that offsets its content based on its own scroll progress through the viewport. No-op under reduced motion.

**Files:**
- Create: `portfolio/app/components/scroll/Parallax.tsx`
- Modify: `portfolio/app/page.tsx` (wrap a few elements)

- [ ] **Step 1: Create Parallax**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

/**
 * Vertical parallax. `speed` is the fraction of viewport to drift across the
 * full scroll-through (positive = moves up as you scroll). Renders plain under
 * reduced motion.
 */
export default function Parallax({
  children,
  speed = 0.15,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}px`, `${-speed * 100}px`],
  );

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Apply parallax to the avatar in page.tsx**

Add the import near the top of `portfolio/app/page.tsx`:

```tsx
import Parallax from "@/app/components/scroll/Parallax";
```

In the About section, wrap the avatar block. Replace:

```tsx
              <Reveal delay={0.18}>
                <div className="mb-4 overflow-hidden" style={{ width: 72, height: 72, border: "1px solid var(--border-md)" }}>
                  <Image
                    src="/avatar.png"
                    alt="Jay-R Bayog"
                    width={72}
                    height={72}
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(30%) sepia(10%)" }}
                    priority
                  />
                </div>
              </Reveal>
```

with:

```tsx
              <Reveal delay={0.18}>
                <Parallax speed={0.25}>
                  <div className="mb-4 overflow-hidden" style={{ width: 72, height: 72, border: "1px solid var(--border-md)" }}>
                    <Image
                      src="/avatar.png"
                      alt="Jay-R Bayog"
                      width={72}
                      height={72}
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(30%) sepia(10%)" }}
                      priority
                    />
                  </div>
                </Parallax>
              </Reveal>
```

- [ ] **Step 3: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Manual verification**

`npm run dev`: the avatar drifts slightly relative to surrounding text as you scroll the About section past. Under reduced-motion it sits still.

- [ ] **Step 5: Commit**

```bash
git add portfolio/app/components/scroll/Parallax.tsx portfolio/app/page.tsx
git commit -m "feat: reusable parallax wrapper, applied to avatar"
```

---

## Task 7: Pinned hero (GSAP) — first pin, de-risked

Per the spec's risk note, build and verify ONE pin end-to-end before the others. A wrapper that pins its children for ~0.8 viewport and scrubs a subtle transform on the name + body, then releases. No pin under reduced motion or below 768px.

**Files:**
- Create: `portfolio/app/components/scroll/PinnedHero.tsx`
- Modify: `portfolio/app/page.tsx` (wrap hero `<section>`, add data attributes)

- [ ] **Step 1: Create PinnedHero**

```tsx
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
```

- [ ] **Step 2: Wrap the hero and tag elements in page.tsx**

Add the import near the top of `portfolio/app/page.tsx`:

```tsx
import PinnedHero from "@/app/components/scroll/PinnedHero";
```

Wrap the hero `<section>`. Change the opening of the hero from:

```tsx
        {/* ══ HERO ════════════════════════════════════════════════ */}
        <section className="flex min-h-[92vh] flex-col justify-center pt-10 pb-10">
```

to:

```tsx
        {/* ══ HERO ════════════════════════════════════════════════ */}
        <PinnedHero>
        <section className="relative flex min-h-[92vh] flex-col justify-center pt-10 pb-10">
```

and change the hero section's closing `</section>` (the one immediately before the `{/* ══ TICKER */}` comment) to:

```tsx
        </section>
        </PinnedHero>
```

Tag the name wrapper — change:

```tsx
          {/* Name — each word clips up */}
          <div className="mb-8">
```

to:

```tsx
          {/* Name — each word clips up */}
          <div className="mb-8" data-hero-name>
```

Tag the tagline/description grid — change:

```tsx
          {/* Tagline + description */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] mb-10">
```

to:

```tsx
          {/* Tagline + description */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] mb-10" data-hero-body>
```

- [ ] **Step 3: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Manual verification (the critical one)**

`npm run dev`:
- The hero stays pinned for a beat as you scroll; the name scales up subtly and the tagline lifts/fades; then the page releases into the ticker with no jump.
- Resize the window mid-scroll, then scroll again — pin spacing recalculates (no overlap/gap). If it drifts, confirm `ScrollTrigger.refresh()` fires (it runs on resize automatically + in SmoothScroll).
- Under emulated reduced-motion or at <768px width: hero renders normally with NO pin.

- [ ] **Step 5: Commit**

```bash
git add portfolio/app/components/scroll/PinnedHero.tsx portfolio/app/page.tsx
git commit -m "feat: pinned hero scene with scrubbed transforms"
```

---

## Task 8: Horizontal-scroll projects (GSAP) + vertical fallback

Pin the projects section and translate a horizontal track of project cards as the user scrolls down. On touch/≤1024px/reduced-motion, GSAP doesn't run and the same markup stacks vertically.

**Files:**
- Create: `portfolio/app/components/scroll/HorizontalProjects.tsx`
- Modify: `portfolio/app/page.tsx` (replace the projects list markup)

- [ ] **Step 1: Create HorizontalProjects**

```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

export type Project = {
  num: string;
  title: string;
  year: string;
  desc: string;
  stack: string[];
  href: string;
};

export default function HorizontalProjects({ projects }: { projects: Project[] }) {
  const reduced = usePrefersReducedMotion();
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced || window.matchMedia("(max-width: 1024px)").matches) return;
      const trackEl = track.current;
      const sectionEl = section.current;
      if (!trackEl || !sectionEl) return;

      // Exact horizontal overflow of the track, container-agnostic.
      const distance = () => trackEl.scrollWidth - trackEl.clientWidth;
      if (distance() <= 0) return;

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: section, dependencies: [reduced, projects.length] },
  );

  return (
    <section
      id="projects"
      ref={section}
      className="lg:h-screen lg:overflow-hidden py-20 lg:py-0"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="lg:h-full lg:flex lg:flex-col lg:justify-center">
        <p className="label mb-6">02 / Projects</p>
        <h2
          className="font-display font-black uppercase mb-10"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95, color: "var(--text)" }}
        >
          Hobby work.
        </h2>

        <div
          ref={track}
          className="flex flex-col gap-6 lg:flex-row lg:gap-8 lg:flex-nowrap will-change-transform"
        >
          {projects.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block w-full shrink-0 lg:w-[440px] p-6"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs" style={{ color: "var(--dim)" }}>{p.num}</span>
                  <h3
                    className="font-display font-bold uppercase transition-colors duration-200"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1, color: "var(--text)", letterSpacing: "-0.01em" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                  >
                    {p.title}
                  </h3>
                </div>
                <span className="font-mono text-xs" style={{ color: "var(--dim)" }}>{p.year}</span>
              </div>
              <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs px-2 py-1"
                    style={{ border: "1px solid var(--border)", color: "var(--dim)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Use it in page.tsx**

Add the import near the top of `portfolio/app/page.tsx`:

```tsx
import HorizontalProjects from "@/app/components/scroll/HorizontalProjects";
```

Replace the entire existing projects `<section id="projects"> ... </section>` block (the one starting with the `{/* ══ PROJECTS */}` comment and ending at its `</section>`) with:

```tsx
        {/* ══ PROJECTS ════════════════════════════════════════════ */}
        <HorizontalProjects projects={projects} />
```

Note: `HorizontalProjects` renders its own `<section id="projects">`, so the nav anchor still works. It now sits inside `<main className="mx-auto max-w-6xl px-6 pb-32">`; the cards extend within that max-width on desktop and scroll horizontally inside it. This is intentional and acceptable for v1.

- [ ] **Step 3: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Manual verification**

`npm run dev`:
- On a desktop-width window: the Projects section pins and the cards slide left→right as you scroll down, then releases.
- Resize narrower than 1024px (or DevTools device toolbar): cards stack vertically, no pin, normal scroll.
- Under reduced-motion: vertical stack, no pin.
- The "Projects" nav link still scrolls to the section.

- [ ] **Step 5: Commit**

```bash
git add portfolio/app/components/scroll/HorizontalProjects.tsx portfolio/app/page.tsx
git commit -m "feat: horizontal-scroll projects with vertical fallback"
```

---

## Task 9: Pinned contact finale (GSAP)

Pin the contact section and scrub the three headline lines in from below as the closing beat. Desktop + motion-allowed only; otherwise the lines render normally.

**Files:**
- Create: `portfolio/app/components/scroll/PinnedContact.tsx`
- Modify: `portfolio/app/page.tsx` (wrap contact, convert the 3 lines)

- [ ] **Step 1: Create PinnedContact**

```tsx
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
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container, dependencies: [reduced] },
  );

  return <div ref={container}>{children}</div>;
}
```

- [ ] **Step 2: Wrap the contact section and convert the lines in page.tsx**

Add the import near the top of `portfolio/app/page.tsx`:

```tsx
import PinnedContact from "@/app/components/scroll/PinnedContact";
```

The existing contact headline uses Framer Motion `whileInView` on each line; on desktop GSAP will now own that animation, so replace the motion lines with plain tagged spans. Replace this block:

```tsx
          <div className="overflow-hidden mb-8">
            {["Let's build", "something", "great."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  <span
                    className="font-display font-black uppercase block"
                    style={{
                      fontSize: "clamp(3rem, 9vw, 7rem)",
                      lineHeight: 0.92,
                      letterSpacing: "-0.01em",
                      color: i === 2 ? "var(--orange)" : "var(--text)",
                    }}
                  >
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
```

with:

```tsx
          <div className="overflow-hidden mb-8">
            {["Let's build", "something", "great."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <span
                  data-contact-line
                  className="font-display font-black uppercase block"
                  style={{
                    fontSize: "clamp(3rem, 9vw, 7rem)",
                    lineHeight: 0.92,
                    letterSpacing: "-0.01em",
                    color: i === 2 ? "var(--orange)" : "var(--text)",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
```

Wrap the contact `<section>`. Change its opening:

```tsx
        {/* ══ CONTACT ═════════════════════════════════════════════ */}
        <section id="contact" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
```

to:

```tsx
        {/* ══ CONTACT ═════════════════════════════════════════════ */}
        <PinnedContact>
        <section id="contact" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
```

and change its closing `</section>` (immediately before `</main>`) to:

```tsx
        </section>
        </PinnedContact>
```

- [ ] **Step 3: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Manual verification**

`npm run dev`:
- Scrolling into Contact pins it; the three lines rise/stagger in as you scroll, "great." in blue last; then releases to the buttons + footer.
- Under reduced-motion / <768px: lines are simply visible, no pin, section scrolls normally.

- [ ] **Step 5: Commit**

```bash
git add portfolio/app/components/scroll/PinnedContact.tsx portfolio/app/page.tsx
git commit -m "feat: pinned contact finale with scrubbed line stagger"
```

---

## Task 10: WebGL shader hero background (OGL)

A lazy-loaded, offscreen-paused OGL shader behind the hero: a slow flowing blue-on-warm-dark gradient. DPR-capped, single static frame under reduced motion, fully client-only.

**Files:**
- Create: `portfolio/app/components/webgl/ShaderBackground.tsx`
- Modify: `portfolio/app/page.tsx` (lazy import + mount inside hero)

- [ ] **Step 1: Create ShaderBackground**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float t = uTime * 0.06;
    float n =
      sin(uv.x * 3.0 + t) * 0.5 +
      sin(uv.y * 4.0 - t * 1.3) * 0.5 +
      sin((uv.x + uv.y) * 2.0 + t * 0.7) * 0.5;
    n = n / 1.5 * 0.5 + 0.5;

    vec3 base   = vec3(0.047, 0.039, 0.031); // #0C0A08
    vec3 accent = vec3(0.31, 0.62, 1.0);     // #4F9EFF
    vec3 col = mix(base, accent, smoothstep(0.5, 1.0, n) * 0.30);

    float d = distance(uv, vec2(0.5));
    col *= 1.0 - d * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: false,
    });
    const gl = renderer.gl;
    gl.clearColor(0.047, 0.039, 0.031, 1);
    mount.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const render = (t: number) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };

    if (reduced) {
      renderer.render({ scene: mesh }); // one static frame
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [reduced]);

  return <div ref={ref} aria-hidden className="absolute inset-0 -z-10" />;
}
```

- [ ] **Step 2: Lazy-mount it behind the hero in page.tsx**

At the top of `portfolio/app/page.tsx`, with the other imports, add `dynamic` and the lazy component (page.tsx is already `"use client"`, so `ssr: false` is allowed):

```tsx
import dynamic from "next/dynamic";

const ShaderBackground = dynamic(
  () => import("@/app/components/webgl/ShaderBackground"),
  { ssr: false },
);
```

The hero `<section>` already gained `relative` in Task 7. Add the shader as its first child plus an `isolate` so the `-z-10` stays scoped to the hero. Change:

```tsx
        <PinnedHero>
        <section className="relative flex min-h-[92vh] flex-col justify-center pt-10 pb-10">
```

to:

```tsx
        <PinnedHero>
        <section className="relative isolate flex min-h-[92vh] flex-col justify-center pt-10 pb-10">
          <ShaderBackground />
```

- [ ] **Step 3: Build**

Run (from `portfolio/`): `npm run build`
Expected: build succeeds (ShaderBackground is never imported on the server thanks to `ssr: false`).

- [ ] **Step 4: Manual verification**

`npm run dev`:
- A subtle flowing blue/dark gradient animates behind the hero text; text stays fully readable above it.
- Scroll far down, then back: confirm no console WebGL warnings; the rAF pauses when the hero is offscreen (the IntersectionObserver gate).
- Under reduced-motion: background is a single static frame (no animation).
- Throttle to a mobile device profile: page still loads; shader is DPR-capped (not melting the GPU).

- [ ] **Step 5: Commit**

```bash
git add portfolio/app/components/webgl/ShaderBackground.tsx portfolio/app/page.tsx
git commit -m "feat: OGL shader hero background (lazy, offscreen-paused)"
```

---

## Task 11: Final integration pass + full verification

Confirm everything composes, lint passes, and run the spec's full manual checklist.

**Files:**
- Modify: `portfolio/app/page.tsx` (only if cleanup needed)

- [ ] **Step 1: Lint + build**

Run (from `portfolio/`): `npm run lint` then `npm run build`
Expected: both pass with no errors. Fix any unused-import warnings introduced by the refactors (e.g. if the old ticker/`motion` usage left anything unused).

- [ ] **Step 2: Full manual verification (desktop, motion on)**

`npm run dev`:
- Smooth momentum scroll throughout.
- Hero pins → name scales/body lifts → releases cleanly into the velocity ticker.
- Ticker reacts to scroll speed/direction.
- Avatar parallax in About.
- Projects pin and scroll horizontally, then release.
- Contact pins and the three lines stagger in.
- Shader animates behind the hero.
- All nav anchors (About/Projects/Stack/Experience/Contact) still jump correctly.

- [ ] **Step 3: Reduced-motion verification**

DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`, reload:
- Native scroll (no Lenis), no pins, projects vertical, ticker static, shader static, simple fades only. Nothing overlaps or is cut off.

- [ ] **Step 4: Mobile / touch verification**

DevTools device toolbar (e.g. iPhone) or narrow window <1024px:
- Projects stack vertically (no pin), hero/contact not pinned, page scrolls normally, shader still renders behind hero without jank.

- [ ] **Step 5: Performance check**

Run a Lighthouse pass (Performance) on the production build (`npm run build` then `npm run start`, audit the local URL).
Expected: performance score not materially worse than baseline; no long-task or memory red flags from the WebGL/scroll work. Note the score in the commit body.

- [ ] **Step 6: Commit**

```bash
git add -A portfolio
git commit -m "chore: final integration pass for fluid scroll (lint, verify)"
```

---

## Self-review notes (verified against the spec)

- **Spec coverage:** smooth scroll (T4), horizontal projects (T8), pinned hero (T7), pinned contact finale (T9), parallax + velocity (T5/T6), OGL shader background (T10), reduced-motion + touch fallbacks (every task + T11), perf (T10 pause/DPR + T11 Lighthouse), file split (T2–T10 create focused modules). Image-distortion WebGL is correctly **excluded** (deferred in spec).
- **Engine cooperation:** the Lenis↔GSAP bridge is centralized in T4; Framer Motion `useScroll` reads the same native scroll. GSAP-owned elements (hero name/body, contact lines, project track) are distinct from Framer Motion-owned elements (reveals), so the two engines never animate the same property on the same node.
- **No placeholders / consistent names:** `usePrefersReducedMotion`, `gsap`/`ScrollTrigger` from `@/app/lib/gsap`, and the `data-hero-name` / `data-hero-body` / `data-contact-line` hooks are used consistently across tasks.
