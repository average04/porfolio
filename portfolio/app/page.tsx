"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AstronautScene = dynamic(
  () => import("./components/webgl/AstronautScene"),
  {
    ssr: false,
    loading: () => <p className="orbit-loading">Preparing your orbit…</p>,
  },
);

const selected = [
  {
    id: "01",
    name: "Kamee Fitness",
    category: "MOBILE APP · FITNESS",
    className: "kamee",
    headline: "A little stronger.\nEvery single day.",
    description:
      "A training companion that makes consistency feel achievable. Workouts, run tracking, and progress in one place.",
    image: "/projects/kamee.png",
    alt: "Kamee Fitness website with its turtle mascot, training plans, and workout features",
    stack: ["React Native", "Supabase", "Next.js"],
    href: "https://kamee.fit/",
    domain: "kamee.fit",
    challenge:
      "Build a fitness experience that connects daily activity with long-term progress, across mobile and the web.",
    build:
      "Workout and run/walk logging, progress visualization, and goal setting, backed by Supabase with a React Native mobile experience.",
  },
  {
    id: "02",
    name: "BetterSurallah",
    category: "WEB PLATFORM · CIVIC TECH",
    className: "surallah",
    headline: "Public information.\nActually accessible.",
    description:
      "An independent window into my hometown. Bringing public documents, budgets, and local officials into one searchable place.",
    image: "/projects/surallah.png",
    alt: "BetterSurallah transparency platform showing public documents, projects, and officials",
    stack: ["Next.js", "TypeScript", "Supabase"],
    href: "https://bettersurallah.org/",
    domain: "bettersurallah.org",
    challenge:
      "Make scattered local government information easier for residents to find and understand.",
    build:
      "A citizen-built platform with budget and document access, project funding information, and a searchable directory of local officials.",
  },
  {
    id: "03",
    name: "EMBERS",
    category: "WEB EXPERIENCE · JOURNALING",
    className: "embers",
    headline: "Some thoughts\ndeserve a place.",
    description:
      "A quiet space for capturing and sharing ideas. Built around thoughtful writing, real-time sync, and room to reflect.",
    image: "/projects/embers.png",
    alt: "Embers welcome screen, a minimal space to light your thoughts",
    stack: ["Next.js", "TypeScript", "Supabase"],
    href: "https://www.embersthoughts.com/",
    domain: "embersthoughts.com",
    challenge:
      "Give small, unfinished thoughts a home without a noisy or distracting interface.",
    build:
      "A focused journaling experience for capturing and sharing ideas, with real-time sync using Next.js and Supabase.",
  },
];

const experiments = [
  {
    name: "KaraParty",
    type: "AI",
    description: "Vocal separation. Synced lyrics. Your next karaoke night.",
    stack: ".NET · Azure AI · Next.js",
    href: "https://agreeable-pebble-05ce40f00.6.azurestaticapps.net/",
  },
  {
    name: "Bayani TD",
    type: "Games",
    description: "Filipino heroes meet browser-based tower defense.",
    stack: "Phaser 3 · TypeScript · Supabase",
    href: "https://bayani.jayrb.dev/",
  },
  {
    name: "Talinhaga",
    type: "Web",
    description: "A place for stories, poems, and a slower kind of reading.",
    stack: "Next.js · Supabase",
    href: "https://talinhaga.vercel.app/",
  },
  {
    name: "Bemy",
    type: "Web",
    description: "A personal Valentine, built and shipped in a day.",
    stack: "Next.js · TypeScript",
    href: "https://bemy-web-app.vercel.app/",
  },
  {
    name: "Cityland",
    type: "Web",
    description: "An easier way to explore and manage property listings.",
    stack: "Next.js · Supabase",
    href: "https://realstate-liard.vercel.app/",
  },
];

const experience = [
  {
    company: "DXC Technologies",
    role: "Software Engineer",
    date: "SEP 2025 — PRESENT",
    description:
      ".NET and React applications, Azure cloud solutions, and the pipelines that keep them shipping.",
    current: true,
  },
  {
    company: "Smartmoneta",
    role: ".NET Developer",
    date: "SEP 2024 — MAY 2025",
    description:
      "Payment gateway development, fintech automations, and technical application support.",
  },
  {
    company: "Flexisource IT",
    role: "Software Engineer",
    date: "JAN 2023 — SEP 2024",
    description:
      "Full-stack SaaS development with C#/.NET and React. Better APIs, new features, steady improvements.",
  },
  {
    company: "Palawan Pawnshop Group",
    role: "Software Engineer",
    date: "AUG 2019 — DEC 2022",
    description:
      "Notification and reporting systems, REST APIs, and production deployments.",
  },
];
const email = "bayogjayr@gmail.com";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function OrbitMark() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="22"
        cy="22"
        rx="22"
        ry="7"
        transform="rotate(-35 22 22)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="37" cy="11" r="3" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const [orbit, setOrbit] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [filter, setFilter] = useState("All");
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleExperiments = experiments.filter(
    (project) => filter === "All" || project.type === filter,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-revealed");
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((element) => sections.observe(element));
    return () => {
      observer.disconnect();
      sections.disconnect();
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menu]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus("Copy unavailable. Use the email link.");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus(""), 3500);
  }

  return (
    <div className={`portfolio ${motionPaused ? "motion-paused" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Jay-R Bayog, home">
          <OrbitMark />
          <span>
            JAY-R BAYOG<span className="wordmark-sub">SOFTWARE ENGINEER</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {[
            ["projects", "Work"],
            ["about", "About"],
            ["experience", "Experience"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span className="nav-dot" />
              {label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Let’s talk <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          type="button"
          ref={menuButton}
          aria-expanded={menu}
          aria-controls="mobile-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close −" : "Menu +"}
        </button>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["projects", "Selected work"],
              ["about", "About me"],
              ["experience", "Experience"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <Arrow diagonal />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-topline">
            <p className="eyebrow">
              <span className="status-dot" /> OPEN TO NEW OPPORTUNITIES
            </p>
            <p className="eyebrow">
              BASED IN THE PHILIPPINES <span className="tiny-star">✳︎</span>
            </p>
          </div>
          <div className="hero-heading">
            <p className="eyebrow hero-kicker">
              A LITTLE CURIOSITY GOES A LONG WAY.
            </p>
            <h1 id="hero-title">
              <span>SERIOUS CODE.</span>
              <span className="outline-word">CURIOUS MIND.</span>
            </h1>
          </div>
          <div className={`hero-art ${orbit ? "is-orbit" : ""}`}>
            <div className="hero-orbit-ring" aria-hidden="true" />
            {orbit ? (
              <AstronautScene />
            ) : (
              <Image
                src="/images/explorer.png"
                alt="An astronaut reaching forward in zero gravity, with a reflective black visor and blue rim lighting"
                fill
                priority
                sizes="(max-width: 700px) 95vw, 55vw"
                className="explorer-image"
              />
            )}
            {!orbit && (
              <span className="art-annotation">
                <span /> KEEP EXPLORING.
              </span>
            )}
          </div>
          <div className="hero-summary">
            <p>
              I’m Jay-R. I turn complex problems into
              <br className="desktop-break" /> thoughtful software, from the
              first idea
              <br className="desktop-break" /> to the systems that keep it
              running.
            </p>
            <a href="#projects" className="button button-accent">
              Explore my work <Arrow diagonal />
            </a>
            <a href="/Resume-Bayog_JayR.pdf" className="text-link" download>
              Grab my résumé <span>↓</span>
            </a>
          </div>
          <div className="hero-mode">
            <span className="eyebrow">CHOOSE YOUR VIEW</span>
            <div
              className="view-switch"
              role="group"
              aria-label="Astronaut view"
            >
              <button
                type="button"
                aria-pressed={!orbit}
                onClick={() => setOrbit(false)}
              >
                01 / Cinematic
              </button>
              <button
                type="button"
                aria-pressed={orbit}
                onClick={() => setOrbit(true)}
              >
                02 / Live 3D <span>↗</span>
              </button>
            </div>
            <button
              className="motion-toggle"
              type="button"
              aria-pressed={motionPaused}
              onClick={() => setMotionPaused(!motionPaused)}
            >
              {motionPaused
                ? "▶ Resume artwork motion"
                : "Ⅱ Pause artwork motion"}
            </button>
          </div>
          <div className="hero-foot">
            <span>INDEPENDENT THINKING. PRODUCTION EXPERIENCE.</span>
            <a href="#projects">
              SCROLL TO EXPLORE <span>↓</span>
            </a>
            <span>PORTFOLIO / 2026</span>
          </div>
        </section>

        <div className="capability-strip" aria-label="Core technologies">
          <span>IDEA → INTERFACE → INFRASTRUCTURE</span>
          <div>
            <span>C# / .NET</span>
            <i>✳︎</i>
            <span>REACT / NEXT.JS</span>
            <i>✳︎</i>
            <span>AZURE</span>
            <i>✳︎</i>
            <span>FULL-STACK THINKING</span>
          </div>
        </div>

        <section
          id="projects"
          className="work section-shell"
          aria-labelledby="work-title"
        >
          <div className="section-heading" data-reveal>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <div>
              <h2 id="work-title">
                Less talk.
                <br />
                <span className="serif-word">More launched.</span>
              </h2>
              <p>
                A few things I’ve taken from
                <br />
                “what if” to out in the world.
              </p>
            </div>
            <span className="section-counter">(03)</span>
          </div>
          <div className="featured-work">
            {selected.map((project) => (
              <article
                key={project.id}
                className={`work-project ${project.className}`}
                data-reveal
              >
                <a
                  className="project-visual"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${project.name} (opens in a new tab)`}
                >
                  <div className="visual-topline">
                    <span>{project.category}</span>
                    <span>PROJECT / {project.id}</span>
                  </div>
                  <div className="project-window">
                    <div className="browser-bar">
                      <span>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>{project.domain}</span>
                      <span>↗</span>
                    </div>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      width={1440}
                      height={1000}
                      sizes="(max-width: 700px) 92vw, 80vw"
                    />
                  </div>
                  <span className="visual-open">
                    Explore project <Arrow diagonal />
                  </span>
                  <span className="visual-watermark" aria-hidden="true">
                    {project.id}
                  </span>
                </a>
                <div className="project-information">
                  <div className="project-title">
                    <span className="eyebrow">
                      {project.id} / {project.name}
                    </span>
                    <h3>
                      {project.headline.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </h3>
                  </div>
                  <div className="project-story">
                    <p>{project.description}</p>
                    <ul
                      className="tech-tags"
                      aria-label={`${project.name} technologies`}
                    >
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <details className="project-details">
                      <summary>
                        Behind the build <span>+</span>
                      </summary>
                      <div>
                        <h4>The idea</h4>
                        <p>{project.challenge}</p>
                        <h4>The build</h4>
                        <p>{project.build}</p>
                        <a href={project.href} target="_blank" rel="noreferrer">
                          Visit live project <Arrow diagonal />
                        </a>
                      </div>
                    </details>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="lab section-shell"
          id="lab"
          aria-labelledby="lab-title"
        >
          <div className="lab-heading" data-reveal>
            <div>
              <p className="eyebrow">THE SIDE QUESTS</p>
              <h2 id="lab-title">
                Curiosity doesn’t
                <br />
                <span className="serif-word">clock out.</span>
              </h2>
            </div>
            <p>
              Games, experiments, and small ideas
              <br />
              that became real things.
            </p>
          </div>
          <div
            className="project-filters"
            role="group"
            aria-label="Filter side projects"
          >
            {["All", "Web", "AI", "Games"].map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                {item === "All" && <span>05</span>}
              </button>
            ))}
          </div>
          <p className="sr-only" role="status">
            Showing {visibleExperiments.length} side projects
          </p>
          <div className="lab-list">
            {visibleExperiments.map((project) => (
              <a
                key={project.name}
                className="lab-row"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="lab-type">{project.type}</span>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <span className="lab-stack">{project.stack}</span>
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <div className="section-shell">
            <div className="about-top" data-reveal>
              <p className="eyebrow">02 / THE HUMAN BEHIND THE CODE</p>
              <OrbitMark />
            </div>
            <div className="about-grid">
              <div className="portrait-panel" data-reveal>
                <div className="portrait-frame">
                  <Image
                    src="/avatar.png"
                    alt="Jay-R Bayog"
                    width={700}
                    height={800}
                    sizes="(max-width: 700px) 80vw, 32vw"
                  />
                  <span className="portrait-corner corner-tl" />
                  <span className="portrait-corner corner-br" />
                  <span className="portrait-label">JRB / EARTH CREW</span>
                </div>
                <div className="portrait-caption">
                  <span>JAY-R BAYOG</span>
                  <span>PHILIPPINES ↗</span>
                </div>
              </div>
              <div className="about-copy" data-reveal>
                <h2 id="about-title">
                  Head in space.
                  <br />
                  <span className="serif-word">Feet on the ground.</span>
                </h2>
                <p className="about-lead">
                  I like big ideas. I like making them work even more.
                </p>
                <p>
                  I’m a full-stack software engineer working across .NET, React,
                  and Azure. Since 2019, I’ve built systems in fintech, SaaS,
                  and enterprise, and made room for projects that mean something
                  to me.
                </p>
                <p>
                  A fitness app. A clearer view of my hometown. A space for
                  someone’s thoughts. Different problems, same instinct:
                  understand the people, untangle the complexity, and build
                  something useful.
                </p>
                <a href="/Resume-Bayog_JayR.pdf" download className="text-link">
                  The longer version? My résumé <Arrow diagonal />
                </a>
                <div className="about-facts">
                  <div>
                    <strong>2019</strong>
                    <span>BUILDING SINCE</span>
                  </div>
                  <div>
                    <strong>04</strong>
                    <span>COMPANIES</span>
                  </div>
                  <div>
                    <strong>08</strong>
                    <span>PERSONAL PROJECTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="toolkit section-shell"
          id="stack"
          aria-labelledby="toolkit-title"
        >
          <div className="toolkit-heading" data-reveal>
            <p className="eyebrow">03 / HOW I BUILD</p>
            <h2 id="toolkit-title">
              From the interface
              <br />
              <span className="serif-word">to the infrastructure.</span>
            </h2>
          </div>
          <div className="capability-grid">
            {[
              {
                n: "01",
                title: "Make it work.",
                description:
                  "Clear APIs, dependable services, and data that stays connected.",
                tools:
                  "C# / .NET · REST APIs · Microservices · PostgreSQL · SQL Server · Redis",
                symbol: "{ }",
              },
              {
                n: "02",
                title: "Make it feel right.",
                description:
                  "Responsive interfaces and thoughtful interactions, across web and mobile.",
                tools:
                  "React · Next.js · TypeScript · React Native · Tailwind CSS",
                symbol: "↗",
              },
              {
                n: "03",
                title: "Keep it running.",
                description:
                  "Repeatable deployments and the infrastructure behind the experience.",
                tools: "Azure · Docker · CI/CD · Git · Supabase · RabbitMQ",
                symbol: "◎",
              },
            ].map((item) => (
              <article className="capability" key={item.n} data-reveal>
                <div className="capability-top">
                  <span>{item.n}</span>
                  <span className="capability-symbol" aria-hidden="true">
                    {item.symbol}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="capability-tools">{item.tools}</div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="experience section-shell"
          aria-labelledby="experience-title"
        >
          <div className="experience-intro" data-reveal>
            <p className="eyebrow">04 / FLIGHT LOG</p>
            <h2 id="experience-title">
              Good work.
              <br />
              <span className="serif-word">Built over time.</span>
            </h2>
            <p>
              Different teams, different challenges.
              <br />A growing perspective on what
              <br />
              makes software last.
            </p>
            <a className="text-link" href="/Resume-Bayog_JayR.pdf" download>
              Download résumé <span>↓</span>
            </a>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article
                key={item.company}
                className="experience-item"
                data-reveal
              >
                <div className="experience-date">
                  <span>{item.date}</span>
                  {item.current && (
                    <span className="current-role">
                      <i /> CURRENT
                    </span>
                  )}
                </div>
                <h3>{item.company}</h3>
                <h4>{item.role}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-orbit" aria-hidden="true" />
          <div className="section-shell">
            <div className="contact-top">
              <p className="eyebrow">
                <span className="status-dot" /> OPEN FOR THE NEXT CHAPTER
              </p>
              <span className="eyebrow">05 / SAY HELLO</span>
            </div>
            <div className="contact-main" data-reveal>
              <h2 id="contact-title">
                HAVE SOMETHING
                <br />
                <span>IN MIND?</span>
              </h2>
              <a
                href={`mailto:${email}`}
                className="contact-arrow"
                aria-label="Email Jay-R Bayog"
              >
                <Arrow diagonal />
              </a>
            </div>
            <div className="contact-bottom">
              <p>
                A role, a project, or an interesting idea.
                <br />
                I’d love to hear what you’re thinking.
              </p>
              <div className="email-area">
                <a href={`mailto:${email}`} className="email-link">
                  {email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  Copy ↗
                </button>
                <span className="copy-status" role="status">
                  {copyStatus}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <a href="#home" className="wordmark">
            <OrbitMark />
            <span>JAY-R BAYOG</span>
          </a>
          <p>Always curious. Still exploring.</p>
          <a href="#home" className="back-top">
            Back to top ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} JAY-R BAYOG</span>
          <span>DESIGNED ON EARTH. BUILT WITH INTENTION.</span>
          <details className="credits">
            <summary>Credits +</summary>
            <p>
              Astronaut hero artwork generated with AI. Interactive 3D astronaut
              by Poly,{" "}
              <a
                href="https://creativecommons.org/licenses/by/2.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY 2.0
              </a>
              , via{" "}
              <a
                href="https://github.com/google/model-viewer/blob/master/packages/modelviewer.dev/ATTRIBUTIONS.md"
                target="_blank"
                rel="noreferrer"
              >
                Google model-viewer
              </a>
              . Lighting and presentation adapted. Project images captured from
              their public websites.
            </p>
          </details>
        </div>
      </footer>
    </div>
  );
}
