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
      // Tailwind `lg:` is min-width:1024px; gate the pin on the same boundary
      // so 1024px (e.g. iPad landscape) gets the desktop layout WITH scroll.
      if (reduced || window.innerWidth < 1024) return;
      const trackEl = track.current;
      const sectionEl = section.current;
      if (!trackEl || !sectionEl) return;

      // Exact horizontal overflow of the track, container-agnostic.
      const distance = () => trackEl.scrollWidth - trackEl.clientWidth;

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          pinType: "transform",
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
          className="flex flex-col gap-6 lg:flex-row lg:gap-8 lg:flex-nowrap lg:[will-change:transform]"
        >
          {projects.map((p) => (
            <Link
              key={p.num}
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
