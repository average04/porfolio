"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "EMBERS",
    description: "A simple, thoughtful journaling app for sharing and reflecting on ideas.",
    stack: ["React NextJS", "Supabase", "TypeScript"],
    href: "https://www.embersthougts.com/",
  },
  {
    title: "Bemy",
    description: "An interactive Valentine's app for sending playful, personalized greetings.",
    stack: ["React NextJS", "TypeScript"],
    href: "https://bemy.jayrb.dev",
  },
  {
    title: "Talinhaga",
    description: "A minimalist blog platform for sharing stories, poems, and musings with a clean, distraction-free design.",
    stack: ["React NextJS", "TypeScript", "Supabase"],
    href: "https://talinhaga.jayrb.dev",
  },
  {
    title: "KaraParty",
    description: "An AI-powered karaoke web app that generates dynamic lyrics and melodies based on user prompts.",
    stack: ["C# .NET 10", "React NextJS", "TypeScript", "ChatGPT API", "Azure"],
    href: "https://agreeable-pebble-05ce40f00.6.azurestaticapps.net/",
  },
];

const email = "bayogjayr@gmail.com";

const skills = [
  "C#/.NET",
  "React JS/NextJS",
  "Azure",
  "REST APIs & Microservices",
  "CI/CD",
  "Cross-team Collaboration",
];

const stack = [
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", darkInvert: true },
  { name: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MSSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", darkInvert: true },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
];

const timeline = [
  {
    title: "Software Engineer",
    place: "DXC Technologies",
    time: "Sept 2025 — Present",
    summary: "Building and maintaining scalable .NET and ReactJS apps; deploying cloud solutions on Azure with secure delivery.",
  },
  {
    title: ".NET Developer",
    place: "Smartmoneta",
    time: "Sept 2024 — May 2025",
    summary: "Maintained and enhanced a C#/.NET payment gateway; delivered automations, application support, and technical support.",
  },
  {
    title: "Software Engineer",
    place: "Flexisource IT",
    time: "Jan 2023 — Sept 2024",
    summary: "Maintained a SaaS platform on C#/.NET and ReactJS; improved APIs and shipped features across the product.",
  },
  {
    title: "Software Engineer",
    place: "Palawan Pawnshop Group",
    time: "Aug 2019 — Dec 2022",
    summary: "Built notification and reporting systems with C#/.NET REST APIs and ReactJS; enforced coding standards and deployment support.",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let id: number;
    const step = () => {
      if (!paused.current && el) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    paused.current = true;
    startX.current = e.clientX;
    scrollStart.current = marqueeRef.current?.scrollLeft ?? 0;
    marqueeRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !marqueeRef.current) return;
    marqueeRef.current.scrollLeft = scrollStart.current - (e.clientX - startX.current);
  };
  const onPointerUp = () => {
    dragging.current = false;
    paused.current = false;
  };

  const isDark = theme === "dark";

  return (
    <div className="relative min-h-screen">
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-20 backdrop-blur-md"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-mono-code text-sm tracking-widest text-accent">jayrb.dev</span>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["01 · About", "#about"],
              ["02 · Stack", "#stack"],
              ["03 · Projects", "#projects"],
              ["04 · Experience", "#experience"],
              ["05 · Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono-code text-xs tracking-[0.15em] uppercase text-muted transition-colors hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="font-mono-code text-xs text-muted transition-all hover:text-accent"
              style={{ border: "1px solid var(--border)", padding: "6px 12px" }}
            >
              {isDark ? "LIGHT" : "DARK"}
            </button>
            <Link
              href="#contact"
              className="font-mono-code text-xs tracking-widest uppercase text-accent transition-all"
              style={{ border: "1px solid var(--accent)", padding: "6px 16px" }}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {/* ── Hero ── */}
        <section
          className="flex min-h-[88vh] flex-col justify-center pb-24 pt-16"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="mb-8 flex items-center gap-4">
            <div
              className="h-14 w-14 overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <Image
                src="/avatar.png"
                alt="Jay-R Bayog"
                width={56}
                height={56}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <p className="font-mono-code text-xs tracking-[0.4em] uppercase text-accent">
              Software Engineer · Available for roles
            </p>
          </div>

          <h1 className="font-display mb-6 text-6xl font-bold leading-[0.92] text-primary sm:text-7xl lg:text-8xl">
            Jay&#8209;R<br />Bayog.
          </h1>

          <p className="font-mono-code mb-6 max-w-xl text-sm leading-relaxed text-muted">
            Reliable, cloud-ready web platforms.
          </p>

          <p className="font-mono-code mb-10 max-w-md text-xs leading-relaxed text-muted">
            I write .NET backends and React frontends, ship to Azure, and make
            sure things don&apos;t break. Six years across fintech, SaaS, and enterprise.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#projects"
              className="font-mono-code text-xs tracking-widest uppercase transition-opacity hover:opacity-75"
              style={{ background: "var(--accent)", color: "var(--bg)", padding: "12px 24px" }}
            >
              View work
            </Link>
            <a
              href="/Resume%20-%20Bayog,%20Jay-R.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="font-mono-code text-xs tracking-widest uppercase text-muted transition-all hover:text-accent"
              style={{ border: "1px solid var(--border)", padding: "12px 24px" }}
            >
              Resume ↓
            </a>
            <div className="font-mono-code flex items-center gap-4 text-xs tracking-wider text-muted">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
              <span>·</span>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">GitHub</a>
              <span>·</span>
              <a href={`mailto:${email}`} className="transition-colors hover:text-accent">Email</a>
            </div>
          </div>

        </section>

        {/* ── 01 About ── */}
        <section
          id="about"
          className="py-20"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="font-mono-code mb-4 text-xs tracking-[0.3em] uppercase text-accent">01 / About</p>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-primary">
                Backend-solid,<br />frontend-sharp.
              </h2>
              <p className="font-mono-code text-xs leading-relaxed text-muted">
                I bridge .NET backends with React frontends — keeping APIs clean,
                deployments stable, and experiences fast. I enjoy untangling legacy
                code, improving reliability, and shipping dependable features.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="font-mono-code px-4 py-3 text-xs font-semibold tracking-wide text-primary"
                  style={{
                    borderLeft: "2px solid var(--accent)",
                    background: "var(--accent-dim)",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02 Stack ── */}
        <section
          id="stack"
          className="py-20"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <p className="font-mono-code mb-4 text-xs tracking-[0.3em] uppercase text-accent">02 / Stack</p>
          <h2 className="font-display mb-10 text-3xl font-bold text-primary">Technologies.</h2>
          <div
            ref={marqueeRef}
            className="flex cursor-grab select-none gap-3 overflow-x-hidden active:cursor-grabbing"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {[...stack, ...stack].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex min-w-[92px] flex-col items-center gap-3 p-4 transition-all"
                style={{ border: "1px solid var(--border)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={34}
                  height={34}
                  className={tech.darkInvert ? "dark:invert" : ""}
                  unoptimized
                />
                <span className="font-mono-code text-xs text-muted">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Projects ── */}
        <section
          id="projects"
          className="py-20"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <p className="font-mono-code mb-4 text-xs tracking-[0.3em] uppercase text-accent">03 / Projects</p>
          <h2 className="font-display mb-10 text-3xl font-bold text-primary">Hobby work.</h2>
          <div
            className="grid md:grid-cols-2"
            style={{ border: "1px solid var(--border)" }}
          >
            {projects.map((project, idx) => (
              <Link
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block p-6 transition-all"
                style={{
                  borderBottom: "1px solid var(--border)",
                  borderRight: idx % 2 === 0 ? "1px solid var(--border)" : undefined,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="font-mono-code text-xs text-muted">0{idx + 1}</span>
                  <span className="font-mono-code text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                </div>
                <h3 className="font-display mb-2 text-xl font-bold text-primary transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="font-mono-code mb-4 text-xs leading-relaxed text-muted">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="chip font-mono-code px-2 py-0.5 text-xs">{item}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 04 Experience ── */}
        <section
          id="experience"
          className="py-20"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <p className="font-mono-code mb-4 text-xs tracking-[0.3em] uppercase text-accent">04 / Experience</p>
          <h2 className="font-display mb-12 text-3xl font-bold text-primary">Where I&apos;ve built.</h2>
          <div className="relative">
            <div
              className="absolute bottom-0 left-0 top-0 w-px"
              style={{ background: "var(--border)" }}
            />
            <div className="space-y-10">
              {timeline.map((item, idx) => (
                <div key={`${item.place}-${idx}`} className="relative pl-8">
                  <div
                    className="absolute -left-[3px] top-2 h-[7px] w-[7px] rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-code text-xs tracking-wider text-accent">{item.place}</span>
                    <span className="font-mono-code text-xs text-muted">{item.time}</span>
                  </div>
                  <h3 className="font-display mb-2 text-lg font-bold text-primary">{item.title}</h3>
                  <p className="font-mono-code max-w-lg text-xs leading-relaxed text-muted">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 Contact ── */}
        <section id="contact" className="py-20">
          <p className="font-mono-code mb-8 text-xs tracking-[0.3em] uppercase text-accent">05 / Contact</p>
          <h2 className="font-display mb-4 max-w-xl text-5xl font-bold leading-tight text-primary sm:text-6xl">
            Let&apos;s build<br />
            <span className="text-accent">something</span><br />
            distinct.
          </h2>
          <p className="font-mono-code mb-10 max-w-xs text-xs leading-relaxed text-muted">
            Share a brief, or just say hi — I respond within one business day.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${email}`}
              className="font-mono-code text-xs tracking-widest uppercase transition-opacity hover:opacity-75"
              style={{ background: "var(--accent)", color: "var(--bg)", padding: "14px 32px" }}
            >
              Email me →
            </a>
            <a
              href="/Resume%20-%20Bayog,%20Jay-R.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="font-mono-code text-xs tracking-widest uppercase text-muted transition-all hover:text-accent"
              style={{ border: "1px solid var(--border)", padding: "14px 32px" }}
            >
              Download Resume
            </a>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--border)" }} className="py-6">
        <div className="font-mono-code mx-auto flex max-w-5xl items-center justify-between px-6 text-xs text-muted">
          <span>Jay-R Bayog · {new Date().getFullYear()}</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
