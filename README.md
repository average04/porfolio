# Jay-R Bayog — Portfolio

Personal portfolio of Jay-R Bayog, full-stack software engineer (.NET, React, Azure).

**Live at [jayrb.dev](https://jayrb.dev)**

## Highlights

- **Pinned hero** with scroll-scrubbed scale and fade animations
- **Horizontal-scroll projects section** — cards pin and translate sideways as you scroll, with featured projects called out in a wider, accented card
- **Velocity marquee** that reacts to scroll speed
- **WebGL shader background** rendered with OGL
- **Smooth scrolling** via Lenis
- **Reduced-motion aware** — all scroll effects respect `prefers-reduced-motion` and fall back to a static layout
- Generated Open Graph image and favicons via Next.js metadata routes

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | GSAP + ScrollTrigger (`@gsap/react`), Framer Motion |
| Scrolling | Lenis |
| WebGL | OGL |

## Getting started

The Next.js app lives in the [`portfolio/`](portfolio/) directory:

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Structure

```
portfolio/app/
├── page.tsx                  # Single-page layout + project/skill data
├── layout.tsx                # Metadata, fonts, smooth-scroll provider
├── components/
│   ├── scroll/               # GSAP/ScrollTrigger sections
│   │   ├── PinnedHero.tsx
│   │   ├── HorizontalProjects.tsx
│   │   ├── VelocityMarquee.tsx
│   │   ├── Parallax.tsx
│   │   ├── PinnedContact.tsx
│   │   └── SmoothScroll.tsx
│   └── webgl/
│       └── ShaderBackground.tsx
├── hooks/
│   └── usePrefersReducedMotion.ts
└── lib/
    └── gsap.ts               # GSAP plugin registration
```
