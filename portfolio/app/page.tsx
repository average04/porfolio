"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import VelocityMarquee from "@/app/components/scroll/VelocityMarquee";
import Parallax from "@/app/components/scroll/Parallax";
import PinnedHero from "@/app/components/scroll/PinnedHero";
import HorizontalProjects from "@/app/components/scroll/HorizontalProjects";
import PinnedContact from "@/app/components/scroll/PinnedContact";

const ShaderBackground = dynamic(
  () => import("@/app/components/webgl/ShaderBackground"),
  { ssr: false },
);

// ─── Data ──────────────────────────────────────────────────────────────────

const projects = [
  {
    num: "01",
    title: "EMBERS",
    year: "2026",
    desc: "Thoughtful journaling platform for capturing and sharing ideas. Real-time sync, clean and distraction-free.",
    stack: ["Next.js", "Supabase", "TypeScript"],
    href: "https://www.embersthoughts.com/",
  },
  {
    num: "02",
    title: "Talinhaga",
    year: "2026",
    desc: "Minimalist blog platform for stories, poems, and essays. Optimized for focused reading.",
    stack: ["Next.js", "Supabase", "TypeScript"],
    href: "https://talinhaga.jayrb.dev",
  },
  {
    num: "03",
    title: "Bemy",
    year: "2026",
    desc: "Interactive Valentine's app for personalized greetings. Designed, built, and deployed in a single day.",
    stack: ["Next.js", "TypeScript"],
    href: "https://bemy-web-app.vercel.app/",
  },
  {
    num: "04",
    title: "Cityland",
    year: "2026",
    desc: "Real estate listing platform for browsing and managing property listings.",
    stack: ["Next.js", "Supabase", "TypeScript"],
    href: "https://realstate-liard.vercel.app/",
  },
  {
    num: "05",
    title: "KaraParty",
    year: "2026",
    desc: "AI-powered karaoke web app that separates vocal tracks and generates synced lyrics for any song. Built on microservices with Azure AI and ChatGPT.",
    stack: ["C# .NET 10", "Next.js", "Azure", "ChatGPT API", "Microservices"],
    href: "https://agreeable-pebble-05ce40f00.6.azurestaticapps.net/",
  },
  {
    num: "06",
    title: "Kamee Fitness",
    year: "2026",
    desc: "Fitness tracking app with workout and run/walk logging, progress visualization, and goal setting. Built with React Native and Supabase for seamless cross-platform experience.",
    stack: ["React Native", "Supabase", "NextJS"],
    href: "https://kamee.fit/",
  },
  {
    num: "07",
    title: "Bayani TD",
    year: "2026",
    desc: "Filipino hero-themed tower defense game playable in the browser. Canvas gameplay built on Phaser 3, with a Supabase backend.",
    stack: ["Phaser 3", "TypeScript", "Vite", "Supabase"],
    href: "https://bayani.jayrb.dev/",
  },
];

const email = "bayogjayr@gmail.com";

const skills = [
  "C# / .NET", "React / Next.js", "Azure Cloud",
  "REST APIs", "Microservices", "Docker",
  "CI/CD", "PostgreSQL", "AI Tools",
];

const techStack = [
  { name: "C#",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: ".NET",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Azure",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Supabase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redis",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "RabbitMQ",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" },
  { name: "MSSQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", invert: true },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Selenium",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
];

const tickerItems = [
  "C# .NET", "React", "Next.js", "TypeScript", "Azure",
  "REST APIs", "Microservices", "Docker", "PostgreSQL",
  "Supabase", "Redis", "RabbitMQ", "Git", "CI/CD", "AI Tools",
];

const timeline = [
  {
    title: "Software Engineer",
    place: "DXC Technologies",
    time: "Sept 2025 — Present",
    desc: "Building and maintaining scalable .NET and React applications. Shipping cloud-native solutions on Azure with robust CI/CD pipelines.",
    current: true,
  },
  {
    title: ".NET Developer",
    place: "Smartmoneta",
    time: "Sept 2024 — May 2025",
    desc: "Maintained and enhanced a C#/.NET payment gateway. Delivered fintech automations and technical application support.",
    current: false,
  },
  {
    title: "Software Engineer",
    place: "Flexisource IT",
    time: "Jan 2023 — Sept 2024",
    desc: "Maintained a SaaS platform on C#/.NET and React. Improved APIs and shipped product features across the full stack.",
    current: false,
  },
  {
    title: "Software Engineer",
    place: "Palawan Pawnshop Group",
    time: "Aug 2019 — Dec 2022",
    desc: "Built notification and reporting systems with .NET REST APIs and React. Enforced coding standards and managed production deployments.",
    current: false,
  },
];

// ─── Animation helpers ─────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
  x = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  x?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TimelineEntry({ item, delay }: { item: typeof timeline[number]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Reveal delay={delay}>
      <div className="relative pl-8" ref={ref}>
        <div className={`tl-dot${item.current ? " current" : ""}${inView ? "" : ""}`} />
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-3">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--orange)" }}>
            {item.place}
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--dim)" }}>{item.time}</span>
        </div>
        <div className="mb-2 flex items-center gap-3">
          <h3 className="font-display text-2xl font-bold uppercase tracking-wide" style={{ color: "var(--text)" }}>
            {item.title}
          </h3>
          {item.current && (
            <span className="font-mono text-xs px-2 py-0.5" style={{ border: "1px solid var(--orange)", color: "var(--orange)" }}>
              NOW
            </span>
          )}
        </div>
        <p className="font-body max-w-lg text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {item.desc}
        </p>
      </div>
    </Reveal>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35 });

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Progress bar */}
      <motion.div className="progress-bar" style={{ scaleX, width: "100%" }} />

      {/* ══ HEADER ══════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(12,10,8,0.85)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--orange)" }}>jayrb.dev</span>

          <nav className="hidden items-center gap-8 md:flex">
            {["About", "Projects", "Stack", "Experience", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: EASE }}
                className="font-mono text-xs tracking-widest uppercase transition-colors"
                style={{ color: "var(--muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <Link href="#contact" className="btn-primary">Hire me →</Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-6xl px-6 pb-32">

        {/* ══ HERO ════════════════════════════════════════════════ */}
        <PinnedHero>
        <section className="relative isolate flex min-h-[92vh] flex-col justify-center pt-10 pb-10">
          <ShaderBackground />

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="mb-8 inline-flex w-fit items-center gap-2.5"
          >
            <div className="status-dot" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
              Available for roles
            </span>
          </motion.div>

          {/* Name — each word clips up */}
          <div className="mb-8" data-hero-name>
            {[
              { text: "JAY-R",  color: "var(--text)" },
              { text: "BAYOG.", color: "var(--orange)" },
            ].map(({ text, color }, i) => (
              <div key={text} className="overflow-hidden leading-none">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: EASE }}
                >
                  <span
                    className="font-display block font-black uppercase"
                    style={{
                      fontSize: "clamp(5rem, 18vw, 14rem)",
                      lineHeight: 0.88,
                      letterSpacing: "-0.01em",
                      color,
                    }}
                  >
                    {text}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.75, ease: EASE }}
            className="mb-8 rule"
            style={{ transformOrigin: "left" }}
          />

          {/* Tagline + description */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] mb-10" data-hero-body>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
              className="font-body text-lg leading-snug"
              style={{ color: "var(--muted)" }}
            >
              Full-stack engineer —{" "}
              <span style={{ color: "var(--text)" }}>.NET backends</span>,{" "}
              <span style={{ color: "var(--text)" }}>React frontends</span>,{" "}
              Azure cloud.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Six years building production systems across fintech, SaaS, and
              enterprise. I write clean code, ship on time, and make things
              that don&apos;t break. I leverage AI tools like Claude to move
              faster and build smarter.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
            className="mb-10 flex flex-wrap items-center gap-4"
          >
            <Link href="#projects" className="btn-primary">View work →</Link>
            <a
              href="/Resume%20-%20Bayog,%20Jay-R.pdf"
              download target="_blank" rel="noreferrer"
              className="btn-outline"
            >
              Resume ↓
            </a>
            <div className="flex items-center gap-5" style={{ marginLeft: "4px" }}>
              {[
                ["LinkedIn", "https://www.linkedin.com"],
                ["GitHub",   "https://github.com"],
                ["Email",    `mailto:${email}`],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="font-mono text-xs tracking-widest uppercase transition-colors"
                  style={{ color: "var(--dim)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--orange)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--dim)")}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
            className="flex flex-wrap gap-10 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {[["6+", "Years exp"], ["4", "Companies"], ["5+", "Side projects"]].map(([n, l]) => (
              <div key={l}>
                <div
                  className="font-display font-black uppercase"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1, color: "var(--orange)" }}
                >
                  {n}
                </div>
                <div className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: "var(--dim)" }}>
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </section>
        </PinnedHero>

        {/* ══ TICKER ══════════════════════════════════════════════ */}
        <div className="mb-24">
          <VelocityMarquee items={tickerItems} />
        </div>

        {/* ══ ABOUT ═══════════════════════════════════════════════ */}
        <section id="about" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
          <Reveal>
            <p className="label mb-6">01 / About</p>
          </Reveal>

          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Reveal delay={0.1}>
                <h2
                  className="font-display font-black uppercase mb-6"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "var(--text)" }}
                >
                  Backend-solid,{" "}
                  <span style={{ color: "var(--orange)" }}>frontend-sharp.</span>
                </h2>
              </Reveal>

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

              <Reveal delay={0.22}>
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                  I bridge .NET backends with React frontends — keeping APIs clean,
                  deployments stable, and experiences fast. I enjoy untangling
                  legacy systems and shipping features that last.
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  I use AI tools — including Claude — as part of my daily workflow
                  to prototype faster, debug smarter, and document better.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-3">
              <Reveal delay={0.1}>
                <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--dim)" }}>
                  Core skills
                </p>
              </Reveal>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <Reveal key={s} delay={0.12 + i * 0.04}>
                    <div className="skill-tag">{s}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ════════════════════════════════════════════ */}
        <HorizontalProjects projects={projects} />

        {/* ══ STACK ═══════════════════════════════════════════════ */}
        <section id="stack" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
          <Reveal>
            <p className="label mb-6">03 / Stack</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-black uppercase mb-10"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95, color: "var(--text)" }}
            >
              Technologies.
            </h2>
          </Reveal>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
            {techStack.map((t, i) => (
              <Reveal key={t.name} delay={0.04 + i * 0.03}>
                <div className="tech-chip">
                  <Image
                    src={t.icon}
                    alt={t.name}
                    width={32}
                    height={32}
                    className={t.invert ? "invert opacity-75" : ""}
                    unoptimized
                  />
                  <span className="font-mono text-center" style={{ fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.04em" }}>
                    {t.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ EXPERIENCE ══════════════════════════════════════════ */}
        <section id="experience" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
          <Reveal>
            <p className="label mb-6">04 / Experience</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-black uppercase mb-14"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95, color: "var(--text)" }}
            >
              Where I&apos;ve built.
            </h2>
          </Reveal>

          <div className="relative">
            <div
              className="absolute bottom-0 left-0 top-0 w-px"
              style={{ background: "linear-gradient(to bottom, var(--orange), var(--border) 80%, transparent)" }}
            />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <TimelineEntry key={item.place} item={item} delay={0.06 + i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ═════════════════════════════════════════════ */}
        <PinnedContact>
        <section id="contact" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
          <Reveal>
            <p className="label mb-8">05 / Contact</p>
          </Reveal>

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

          <Reveal delay={0.2}>
            <p className="font-body text-sm mb-10 max-w-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Open to full-time roles, freelance work, and interesting side
              projects. I respond within one business day.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${email}`} className="btn-primary">
                Email me →
              </a>
              <a
                href="/Resume%20-%20Bayog,%20Jay-R.pdf"
                download target="_blank" rel="noreferrer"
                className="btn-outline"
              >
                Download Resume
              </a>
            </div>
          </Reveal>
        </section>
        </PinnedContact>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid var(--border)" }} className="py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--dim)" }}>
            Jay-R Bayog · {new Date().getFullYear()}
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--orange)" }}>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
