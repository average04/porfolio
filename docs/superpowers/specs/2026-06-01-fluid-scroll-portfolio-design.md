# Fluid-Scroll Portfolio — Design Spec

**Date:** 2026-06-01
**Author:** Jay-R Bayog (with Claude)
**Status:** Approved design — ready for implementation planning

## Goal

Upgrade the existing live portfolio (`portfolio/app/page.tsx`) into a "fluid",
Awwwards-style scroll experience: true smooth/momentum scrolling plus richer
scroll-linked motion. This enhances the **real, shipping portfolio** (a
job-hunting site), so the bar is: visibly impressive *and* fast, accessible, and
non-janky on a recruiter's laptop or phone.

Intensity level: **bold & experimental** — within the constraint that it must
degrade gracefully.

## Current state (what already exists)

- **Stack:** Next.js 16.1.6 (App Router), React 19.2.3, Tailwind CSS v4,
  TypeScript, Framer Motion 12.38.0. Deployed on Netlify.
- **Design:** single-page, warm-dark editorial theme, orange accent
  (`--orange`), Barlow Condensed display type. Sections: Hero, Ticker, About,
  Projects, Stack, Experience, Contact, Footer.
- **Existing motion (Framer Motion):** reveal-on-scroll (`Reveal` via
  `useInView`), a scroll progress bar (`useScroll` + `useSpring`), hero name
  clip-up, a CSS marquee ticker.
- **Data:** 6 projects (text rows, **no images**), tech-stack grid, experience
  timeline. All content stays as-is; we enhance motion, not copy.

## Core design decision (why the hybrid is safe)

All three animation engines must read the **same scroll source of truth** so
they never drift or fight. Lenis runs in **native scroll mode** (it animates the
real `window` scroll, not a virtual CSS transform). Therefore:

- **Lenis** owns the smooth momentum feel.
- **GSAP ScrollTrigger** reads `window.scrollY`; we bridge it so Lenis drives
  GSAP's update loop:
  - `lenis.on('scroll', ScrollTrigger.update)`
  - `gsap.ticker.add((time) => lenis.raf(time * 1000))` and
    `gsap.ticker.lagSmoothing(0)`
- **Framer Motion** `useScroll` / `useVelocity` already read `window` scroll, so
  they keep working with zero changes.

Because Lenis scrolls the native window, the existing Framer Motion reveals,
progress bar, and ticker continue to work untouched. GSAP and WebGL are *layered
on top* — nothing existing is rewritten.

## Tech approach: Hybrid (chosen by user over leaner alternatives)

| Concern | Engine | Rationale |
|---------|--------|-----------|
| Smooth momentum scroll | **Lenis** | Purpose-built, ~3KB |
| Horizontal-scroll Projects | **GSAP ScrollTrigger** (pin + scrub) | ScrollTrigger's core strength |
| Pinned scroll scenes | **GSAP ScrollTrigger** | Robust pinning |
| Parallax + velocity skew | **Framer Motion** (`useTransform`/`useVelocity`) | Declarative, already present |
| Existing reveals | **Framer Motion** (keep `Reveal`) | No reason to touch |
| WebGL shader background | **OGL** | Lightweight (~10KB) animated backdrop |

New dependencies: `lenis`, `gsap`, `@gsap/react`, `ogl`.

## Signature moments (concrete behaviors)

1. **Hero pin.** Hero pins for ~1 viewport height. The giant "JAY-R BAYOG."
   name scales/tracks subtly while a WebGL shader gradient breathes behind it,
   then releases into the ticker.
2. **Horizontal Projects.** The Projects section pins and the 6 project cards
   translate left→right as the user scrolls down, with an 01–06 progress
   indicator. Mobile/touch + reduced-motion → falls back to the current vertical
   list.
3. **Contact finale (3rd pin).** The Contact section ("Let's build something
   great.") pins and its lines stagger in dramatically as the closing beat.
4. **Parallax + velocity.** Depth offsets on section headings and the avatar;
   the marquee ticker speeds up / skews with scroll velocity so fast scrolling
   feels physical.

## WebGL scope

- **In:** an animated shader background behind the hero — warm-dark
  gradient/noise matching the `--orange` palette, built with OGL, client-only
  and lazy-loaded.
- **Deferred:** image-distortion-on-hover. The projects are currently text rows
  with no images, so there is nothing to distort. Revisit if/when project
  thumbnails are added.

## File structure

`page.tsx` is currently 645 lines. We split responsibilities as we add to it:

```
app/
  lib/gsap.ts                      # register ScrollTrigger once, client-only
  hooks/usePrefersReducedMotion.ts # single source for the reduced-motion gate
  components/
    scroll/SmoothScroll.tsx        # Lenis provider + GSAP bridge (wraps page)
    scroll/HorizontalProjects.tsx  # pinned horizontal projects + vertical fallback
    scroll/PinnedHero.tsx          # hero pin scene
    scroll/PinnedContact.tsx       # contact finale pin scene
    scroll/Parallax.tsx            # parallax + velocity helpers (Framer Motion)
    webgl/ShaderBackground.tsx     # OGL shader, client-only, lazy, offscreen-paused
  page.tsx                         # composes the above; slimmed down
```

Existing helpers (`Reveal`, `TimelineEntry`) and all data arrays stay; the page
imports the new components and the project/section data is shared where needed.

## Accessibility & performance (non-negotiable, baked in)

- **`prefers-reduced-motion: reduce`:** Lenis disabled (native scroll), no pins
  or horizontal scroll (everything renders in normal vertical flow), WebGL
  freezes to a static gradient, only simple fades remain. Gated through
  `usePrefersReducedMotion`.
- **Touch / mobile:** Lenis `smoothTouch: false` (best practice); the horizontal
  Projects section renders as the vertical list; WebGL DPR-capped or disabled on
  small / low-power devices.
- **Performance:** WebGL paused when offscreen and DPR-capped; GSAP and the OGL
  shader are lazy-loaded / code-split so they don't bloat first paint; all
  browser-only code (Lenis, GSAP, OGL) is client-only guarded for SSR under the
  Next 16 App Router.

## Out of scope

- Image-distortion WebGL (deferred until thumbnails exist).
- Any content/copy changes, new sections, or visual redesign of existing
  sections beyond the motion described here.
- Adding project thumbnail images.

## Verification

Scroll animations cannot be meaningfully unit-tested, so verification is:

1. `next build` passes (no SSR / type errors).
2. Manual checks via the dev server:
   - Smooth-scroll feel and each signature moment behave as described.
   - `prefers-reduced-motion` path: native scroll, no pins, static gradient.
   - Mobile viewport: vertical Projects fallback, no horizontal jank.
   - Lighthouse performance pass to confirm the score isn't tanked vs. baseline.

## Open risks

- **Pinned + Lenis + Next App Router** interplay can be finicky (pin spacing,
  refresh on resize, route changes). Mitigation: centralize the Lenis↔GSAP
  bridge in `SmoothScroll.tsx`, call `ScrollTrigger.refresh()` on resize/font
  load, and build/verify one pinned scene end-to-end before adding the others.
- **Bundle size** from three engines. Mitigation: lazy-load GSAP + OGL, keep
  Framer Motion for what it already does, measure with Lighthouse.
