import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-cyan-500/30 blur-[140px]" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-indigo-500/25 blur-[150px]" />
        <div className="absolute -bottom-20 left-32 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-20 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 shadow-lg shadow-emerald-500/30" />
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Portfolio</p>
              <p className="text-base font-semibold text-slate-50">Jay-R Bayog</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <a className="transition hover:text-white" href="#about">About</a>
            <a className="transition hover:text-white" href="#projects">Projects</a>
            <a className="transition hover:text-white" href="#experience">Experience</a>
            <a className="transition hover:text-white" href="#contact">Contact</a>
          </nav>
          <Link
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-100 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:text-white"
            href="#contact"
          >
            Let&apos;s work together
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-12">
        <section className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Software Engineer</p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              I build reliable, cloud-ready web platforms.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-200">
              I deliver scalable .NET and React solutions, with a focus on clean APIs, Azure deployments, and resilient systems. From enterprise apps to payment gateways, I align engineering craft with business outcomes.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-200">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Available for software roles</span>
              <span className="rounded-full border border-white/10 bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 px-4 py-2">Based in PH · Open to remote</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <Link
                className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5"
                href="#projects"
              >
                View work
              </Link>
              <Link
                className="rounded-full border border-white/20 px-5 py-3 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-200/60 hover:text-white"
                href="#contact"
              >
                Contact
              </Link>
              <a
                className="rounded-full border border-white/20 px-5 py-3 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-200/60 hover:text-white"
                href="/Resume%20-%20Bayog,%20Jay-R.pdf"
                download
                target="_blank"
                rel="noreferrer"
              >
                Download resume
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <a className="transition hover:text-white" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <span className="text-slate-500">/</span>
                <a className="transition hover:text-white" href="https://github.com" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <span className="text-slate-500">/</span>
                <a className="transition hover:text-white" href="mailto:you@example.com">
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-cyan-400/10 blur-3xl" />
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
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
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Software Engineer</p>
                  <p className="text-xl font-semibold text-white">Jay-R Bayog</p>
                  <p className="text-sm text-slate-300">.NET · React · Azure</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400" />
                <div>
                  <p className="text-sm text-slate-300">Currently</p>
                  <p className="text-lg font-semibold text-white">Engineering scalable .NET + React apps</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Focus</p>
                  <p className="mt-2 text-base font-semibold text-white">Scalability & reliability</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Style</p>
                  <p className="mt-2 text-base font-semibold text-white">Pragmatic, test-focused</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Collab</p>
                  <p className="mt-2 text-base font-semibold text-white">Ship with product & ops</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Edge</p>
                  <p className="mt-2 text-base font-semibold text-white">Cloud & API depth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">About</p>
            <h2 className="text-2xl font-semibold text-white">Backend-solid, frontend-sharp</h2>
            <p className="text-base leading-relaxed text-slate-200">
              I bridge .NET backends with React frontends, keeping APIs clean, deployments stable, and experiences fast. I enjoy untangling legacy code, improving reliability, and collaborating closely with teams to ship dependable features.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Selected work</p>
              <h2 className="text-2xl font-semibold text-white">Projects that keep systems running</h2>
            </div>
           
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-1 hover:border-cyan-200/40"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/30 to-emerald-400/30 blur-3xl transition duration-500 group-hover:scale-125" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Case study</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200">View</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-200">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-cyan-100/90">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-slate-100">
                      {item}
                    </span>
                  ))}
                 </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Experience</p>
          <h2 className="text-2xl font-semibold text-white">Where I have been crafting</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <div
                key={`${item.place}-${item.title}-${item.time}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-emerald-500/10"
              >
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{item.place}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">{item.time}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-cyan-500/10 to-emerald-500/10 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Contact</p>
              <h2 className="text-2xl font-semibold text-white">Let&apos;s build something distinct</h2>
              <p className="text-sm text-slate-200">Share a brief, or just say hi — I respond within one business day.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <a
                className="rounded-full bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
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
