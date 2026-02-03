"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "Enterprise Web Apps on Azure",
    description: "Built and maintained scalable .NET + React applications deployed to Azure, focusing on reliability and security.",
    stack: ["C#/.NET", "React", "Azure"],
    href: "https://example.com",
  },
  {
    title: "Payment Gateway Modernization",
    description: "Enhanced a C#/.NET payment gateway with automations, support tooling, and stability improvements.",
    stack: ["C#/.NET", "Payments", "Automation"],
    href: "https://example.com",
  },
  {
    title: "Notification & Reporting Platform",
    description: "Delivered microservice-based notifications and reporting using C#/.NET REST APIs and React UI layers.",
    stack: ["C#/.NET", "React", "REST APIs"],
    href: "https://example.com",
  },
];

const skills = [
  "C#/.NET application dev",
  "React front-end",
  "Azure deployments",
  "REST APIs & microservices",
  "CI/CD & monitoring",
  "Cross-team collaboration",
];

const timeline = [
  {
    title: "Software Engineer",
    place: "DXC Technologies",
    time: "Sept 2025 — Present",
    summary: "Building and maintaining scalable .NET and ReactJS apps; deploying cloud solutions on Azure with secure delivery.",
  },
  {
    title: ".Net Developer",
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
    place: "Palawan Pawnshop Group of Companies",
    time: "Aug 2019 — Dec 2022",
    summary: "Built notification and reporting systems with C#/.NET REST APIs and ReactJS; enforced coding standards and deployment support.",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  const glow = isDark
    ? { a: "bg-cyan-500/25", b: "bg-indigo-500/25", c: "bg-emerald-500/22" }
    : { a: "bg-cyan-300/35", b: "bg-indigo-300/30", c: "bg-emerald-300/32" };

  return (
    <div className="relative min-h-screen overflow-hidden body-theme">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className={`absolute -left-40 top-10 h-96 w-96 rounded-full ${glow.a} blur-[140px]`} />
        <div className={`absolute right-0 top-40 h-96 w-96 rounded-full ${glow.b} blur-[150px]`} />
        <div className={`absolute -bottom-20 left-32 h-72 w-72 rounded-full ${glow.c} blur-[120px]`} />
      </div>

      <header className="sticky top-0 z-20 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 shadow-lg shadow-emerald-500/30" />
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Portfolio</p>
              <p className="text-base font-semibold text-primary">Jay-R Bayog</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a className="transition hover:text-primary" href="#about">About</a>
            <a className="transition hover:text-primary" href="#projects">Projects</a>
            <a className="transition hover:text-primary" href="#experience">Experience</a>
            <a className="transition hover:text-primary" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? "border border-white/20 text-primary hover:-translate-y-0.5 hover:border-cyan-300/60"
                  : "border border-slate-300 text-primary hover:-translate-y-0.5 hover:border-cyan-500/60"
              }`}
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
                {isDark ? (
                <span aria-label="Switch to light mode" role="img">
                  🌙
                </span>
                ) : (
                <span aria-label="Switch to dark mode" role="img">
                  ☀️
                </span>
                )}
            </button>
            <Link
              className={`rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${
                isDark
                  ? "border border-white/20 text-primary shadow-lg shadow-cyan-500/20 hover:border-cyan-300/60"
                  : "border border-slate-300 text-primary shadow-lg shadow-cyan-500/10 hover:border-cyan-500/60"
              }`}
              href="#contact"
            >
              Let&apos;s work together
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-12">
        <section className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-950 dark:text-cyan-600">Software Engineer</p>
            <h1 className="text-4xl font-semibold leading-tight text-primary sm:text-5xl">
              I build reliable, cloud-ready web platforms.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              I deliver scalable .NET and React solutions, with a focus on clean APIs, Azure deployments, and resilient systems. From enterprise apps to payment gateways, I align engineering craft with business outcomes.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span className="chip px-4 py-2">Available for software roles</span>
              <span className="chip px-4 py-2" style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.22), rgba(16,185,129,0.22))" }}>
                Based in PH · Open to remote
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <Link
                className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5"
                href="#projects"
              >
                View work
              </Link>
              <Link
                className={`rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5 soft-border ${
                  isDark ? "" : ""
                }`}
                href="#contact"
              >
                Contact
              </Link>
              <a
                className="rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5 soft-border text-primary"
                href="/Resume%20-%20Bayog,%20Jay-R.pdf"
                download
                target="_blank"
                rel="noreferrer"
              >
                Download resume
              </a>
              <div className="flex items-center gap-3 text-muted">
                <a className="transition hover:text-primary" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <span className="text-muted">/</span>
                <a className="transition hover:text-primary" href="https://github.com" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <span className="text-muted">/</span>
                <a className="transition hover:text-primary" href="mailto:you@example.com">
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-cyan-400/10 blur-3xl" />
            <div className="rounded-3xl card p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
                  <Image
                    src="/avatar.png"
                    alt="Jay-R Bayog portrait"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-muted">Software Engineer</p>
                  <p className="text-xl font-semibold text-primary">Jay-R Bayog</p>
                  <p className="text-sm text-muted">.NET · React · Azure</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400" />
                <div>
                  <p className="text-sm text-muted">Currently</p>
                  <p className="text-lg font-semibold text-primary">Engineering scalable .NET + React apps</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted">
                <div className="rounded-2xl card p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Focus</p>
                  <p className="mt-2 text-base font-semibold text-primary">Scalability & reliability</p>
                </div>
                <div className="rounded-2xl card p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Style</p>
                  <p className="mt-2 text-base font-semibold text-primary">Pragmatic, test-focused</p>
                </div>
                <div className="rounded-2xl card p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Collab</p>
                  <p className="mt-2 text-base font-semibold text-primary">Ship with product & ops</p>
                </div>
                <div className="rounded-2xl card p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Edge</p>
                  <p className="mt-2 text-base font-semibold text-primary">Cloud & API depth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-950 dark:text-cyan-600">About</p>
            <h2 className="text-2xl font-semibold text-primary">Backend-solid, frontend-sharp</h2>
            <p className="text-base leading-relaxed text-muted">
              I bridge .NET backends with React frontends, keeping APIs clean, deployments stable, and experiences fast. I enjoy untangling legacy code, improving reliability, and collaborating closely with teams to ship dependable features.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="rounded-2xl card px-5 py-4 text-sm font-semibold text-primary shadow-lg shadow-emerald-500/10"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-950 dark:text-cyan-600">Selected work</p>
              <h2 className="text-2xl font-semibold text-primary">Projects that keep systems running</h2>
            </div>
           
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl card p-6 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-1 hover:border-cyan-200/40"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/30 to-emerald-400/30 blur-3xl transition duration-500 group-hover:scale-125" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted">Case study</p>
                    <h3 className="mt-2 text-xl font-semibold text-primary">{project.title}</h3>
                  </div>
                  <span className="chip px-3 py-1 text-xs">View</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-cyan-900/80 dark:text-cyan-100/90">
                  {project.stack.map((item) => (
                    <span key={item} className="chip bg-white/10 px-3 py-1 text-primary">
                      {item}
                    </span>
                  ))}
                 </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-950 dark:text-cyan-600">Experience</p>
          <h2 className="text-2xl font-semibold text-primary">Where I have been crafting</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <div
                key={`${item.place}-${item.title}-${item.time}`}
                className="rounded-2xl card p-5 shadow-lg shadow-emerald-500/10"
              >
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>{item.place}</span>
                  <span className="chip px-3 py-1 text-xs">{item.time}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-3xl card p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-950 dark:text-cyan-600">Contact</p>
              <h2 className="text-2xl font-semibold text-primary">Let&apos;s build something distinct</h2>
              <p className="text-sm text-muted">Share a brief, or just say hi — I respond within one business day.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <a
                className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
                href="mailto:you@example.com"
              >
                Email me
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
