import Image from "next/image";
import CopyEmail from "./components/CopyEmail";

const email = "bayogjayr@gmail.com";
const resume = "/Resume-Bayog_JayR.pdf";
const github = "https://github.com/average04";
const linkedin = "https://www.linkedin.com/in/jay-r-bayog";

const work = [
  {
    id: "kamee",
    name: "Kamee Fitness",
    summary:
      "A fitness app on the App Store and Google Play, with training plans, GPS run tracking, and a coaching assistant that runs on the phone itself.",
    details:
      "I design, build, and ship it on my own. The app is React Native with Expo Router. The backend is Supabase, with row-level security and edge functions that verify purchases. It maps runs with Mapbox, reads Bluetooth heart-rate monitors, and syncs with Apple Health and Health Connect.",
    stack: "React Native, TypeScript, Supabase",
    href: "https://kamee.fit/",
    domain: "kamee.fit",
    image: "/projects/kamee.png",
    alt: "The Kamee Fitness home page: a cartoon turtle running at sunset beside the headline “Strong and steady wins the race.”",
  },
  {
    id: "surallah",
    name: "BetterSurallah",
    summary:
      "An independent site for Surallah, South Cotabato, the town where I grew up. It puts the municipality’s budgets, audits, and public documents in one place.",
    details:
      "It also lists government projects with their amounts, funding sources, and status, and has a searchable directory of officials from the mayor down to barangay captains.",
    stack: "Next.js, TypeScript, Supabase",
    href: "https://bettersurallah.org/",
    domain: "bettersurallah.org",
    image: "/projects/surallah.png",
    alt: "The BetterSurallah home page with the headline “See how Surallah works,” town figures, and links to transparency records, projects, and officials.",
  },
  {
    id: "embers",
    name: "Embers",
    summary:
      "A quiet place to write down small thoughts and share them, with real-time sync across devices.",
    stack: "Next.js, TypeScript, Supabase",
    href: "https://www.embersthoughts.com/",
    domain: "embersthoughts.com",
    image: "/projects/embers.png",
    alt: "The Embers welcome screen: the name set in a serif on a black background, with a Go button.",
  },
];

const otherProjects = [
  {
    name: "KaraParty",
    description: "Karaoke with vocal separation and synced lyrics.",
    stack: ".NET, Azure AI, Next.js",
    href: "https://agreeable-pebble-05ce40f00.6.azurestaticapps.net/",
  },
  {
    name: "Bayani TD",
    description: "A tower defense game in the browser, played with Filipino heroes.",
    stack: "Phaser 3, TypeScript, Supabase",
    href: "https://bayani.jayrb.dev/",
  },
  {
    name: "Talinhaga",
    description: "A site for reading stories and poems.",
    stack: "Next.js, Supabase",
    href: "https://talinhaga.vercel.app/",
  },
  {
    name: "Bemy",
    description: "A Valentine’s page, built and shipped in one day.",
    stack: "Next.js, TypeScript",
    href: "https://bemy-web-app.vercel.app/",
  },
  {
    name: "Cityland",
    description: "A site for browsing and managing property listings.",
    stack: "Next.js, Supabase",
    href: "https://realstate-liard.vercel.app/",
  },
];

const experience = [
  {
    dates: "Sep 2025 – now",
    role: "Software Engineer",
    company: "DXC Technology",
    description:
      "Enterprise web applications in C#/.NET, Node.js, and React, deployed and run on Azure.",
  },
  {
    dates: "Sep 2024 – May 2025",
    role: ".NET Developer",
    company: "Smartmoneta",
    description:
      "Maintained a production payment gateway, automated manual processing work, and traced production incidents to their root cause.",
  },
  {
    dates: "Jan 2023 – Sep 2024",
    role: "Software Engineer",
    company: "Flexisource IT",
    description:
      "Worked on a SaaS platform built on .NET and React: REST APIs, and new features taken from spec to release.",
  },
  {
    dates: "Aug 2019 – Dec 2022",
    role: "Software Engineer",
    company: "Palawan Pawnshop Group",
    description:
      "Built a notification delivery system on microservices, reporting modules for business users, and the coding standards the team adopted.",
  },
  {
    dates: "Aug 2018 – Aug 2019",
    role: "Branch Associate",
    company: "Palawan Pawnshop Group",
    description:
      "Ran daily branch operations and customer transactions, then moved to the engineering team.",
  },
  {
    dates: "2014 – 2018",
    role: "BS Information Technology",
    company: "STI College Koronadal",
  },
];

const tools = [
  {
    area: "Backend",
    items:
      "C#, .NET, ASP.NET, Node.js, REST APIs, microservices, RabbitMQ",
  },
  {
    area: "Frontend",
    items: "React, Next.js, TypeScript, React Native with Expo",
  },
  {
    area: "Data",
    items: "SQL Server, PostgreSQL, MySQL, Redis, Supabase",
  },
  {
    area: "Cloud",
    items: "Microsoft Azure (Azure Fundamentals certified, 2026), Docker, CI/CD",
  },
  {
    area: "Testing",
    items: "Jest, Selenium",
  },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="intro">
        <div className="shell">
          <div className="masthead">
            <h1>
              <Image
                src="/avatar.png"
                alt=""
                width={80}
                height={80}
                className="avatar"
                priority
              />
              Jay-R Bayog
            </h1>
            <nav aria-label="Sections">
              <a href="#work">Work</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

          <p className="statement">
            I’m a software engineer in Metro Manila. I build .NET and Azure
            systems at DXC Technology, and on my own time I make things like{" "}
            <a href="#kamee">a&nbsp;fitness app</a>,{" "}
            <a href="#surallah">a&nbsp;public records site for my hometown</a>, and{" "}
            <a href="https://bayani.jayrb.dev/">
              a&nbsp;tower defense game about Filipino heroes
            </a>
            .
          </p>

          <ul className="link-row">
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <a href={resume}>Résumé (PDF)</a>
            </li>
            <li>
              <a href={github}>GitHub</a>
            </li>
            <li>
              <a href={linkedin}>LinkedIn</a>
            </li>
          </ul>
        </div>
      </header>

      <main id="main">
        <section id="work" className="shell section" aria-labelledby="work-title">
          <h2 id="work-title">Work</h2>
          {work.map((project) => (
            <article
              key={project.id}
              id={project.id}
              className="project"
              aria-labelledby={`${project.id}-title`}
            >
              <div className="project-text">
                <h3 id={`${project.id}-title`}>{project.name}</h3>
                <p>{project.summary}</p>
                {project.details && <p>{project.details}</p>}
                <p className="quiet">Built with {project.stack}</p>
                <a href={project.href}>{project.domain}</a>
              </div>
              <a className="shot" href={project.href}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={1440}
                  height={1000}
                  sizes="(max-width: 960px) 100vw, 800px"
                />
              </a>
            </article>
          ))}
        </section>

        <section className="shell section" aria-labelledby="other-title">
          <h2 id="other-title">Other projects</h2>
          <ul className="rows">
            {otherProjects.map((project) => (
              <li key={project.name}>
                <a href={project.href} className="row-label">
                  {project.name}
                </a>
                <div>
                  <p>{project.description}</p>
                  <p className="quiet">{project.stack}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="experience"
          className="shell section"
          aria-labelledby="experience-title"
        >
          <h2 id="experience-title">Experience</h2>
          <ol className="rows">
            {experience.map((item) => (
              <li key={`${item.company}-${item.role}`}>
                <p className="row-label quiet">{item.dates}</p>
                <div>
                  <h3>
                    {item.role}, {item.company}
                  </h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </li>
            ))}
          </ol>
          <p className="after-rows">
            The full history is in my <a href={resume}>résumé (PDF, 103&nbsp;KB)</a>.
          </p>
        </section>

        <section className="shell section" aria-labelledby="tools-title">
          <h2 id="tools-title">Tools</h2>
          <dl className="rows">
            {tools.map((group) => (
              <div key={group.area}>
                <dt className="row-label">{group.area}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer id="contact" className="outro" aria-labelledby="contact-title">
        <div className="shell">
          <h2 id="contact-title" className="statement">
            Email me at <a href={`mailto:${email}`}>{email}</a>
          </h2>
          <CopyEmail email={email} />
          <p className="outro-note">
            Write about a role, a project, or anything on this page.
          </p>
          <ul className="link-row">
            <li>
              <a href={github}>GitHub</a>
            </li>
            <li>
              <a href={linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={resume}>Résumé (PDF)</a>
            </li>
          </ul>
          <p className="copyright">© {new Date().getFullYear()} Jay-R Bayog</p>
        </div>
      </footer>
    </>
  );
}
