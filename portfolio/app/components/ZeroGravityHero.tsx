"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const AstronautScene = dynamic(() => import("./webgl/AstronautScene"), {
  ssr: false,
  loading: () => <div className="astronaut-stage"><Image src="/models/astronaut-still.png" alt="An astronaut floating in zero gravity" fill priority sizes="(max-width: 767px) 90vw, 55vw" className="astronaut-poster" /></div>,
});

const featured = [
  { number: "01", title: "Kamee Fitness", category: "MOVE. TRACK. GROW.", description: "A little progress, every day.", href: "https://kamee.fit/", className: "fitness", symbol: "↗" },
  { number: "02", title: "BetterSurallah", category: "TECH FOR THE COMMUNITY", description: "A clearer view of our hometown.", href: "https://bettersurallah.org/", className: "community", symbol: "⌂" },
  { number: "03", title: "EMBERS", category: "SPACE FOR YOUR THOUGHTS", description: "Small thoughts. Lasting sparks.", href: "https://www.embersthoughts.com/", className: "embers", symbol: "✳︎" },
];

export default function ZeroGravityHero() {
  return (
    <div className="zero-gravity">
      <section className="space-hero" aria-labelledby="hero-heading">
        <div className="star-field" aria-hidden="true" />
        <div className="hero-copy">
          <p className="space-eyebrow"><span /> AVAILABLE FOR ROLES</p>
          <p className="hero-intro">JAY-R BAYOG <span>/ SOFTWARE ENGINEER</span></p>
          <h1 id="hero-heading">Ideas<br />into <span>orbit.</span></h1>
          <p className="hero-description">Turning complex problems into meaningful software. Building with .NET, React, and a curiosity that never stands still.</p>
          <div className="hero-actions">
            <a className="btn-primary" href="#projects">Explore my work <span>↗</span></a>
            <a className="hero-resume" href="/Resume-Bayog_JayR.pdf" download>Get my resume <span>↓</span></a>
          </div>
          <div className="hero-coordinates"><span className="coordinate-cross">+</span> BASED ON EARTH. BUILDING FOR PEOPLE.</div>
        </div>
        <AstronautScene />
        <div className="hero-bottom"><span>EXPLORATION LOG / 2026</span><a href="#featured">SCROLL TO DISCOVER ↓</a><span>01 — ∞</span></div>
      </section>
      <section id="featured" className="featured-missions" aria-labelledby="featured-heading">
        <div className="featured-heading"><h2 id="featured-heading">SELECTED MISSIONS</h2><a href="#projects">All projects ↗</a></div>
        <div className="mission-grid">
          {featured.map((project) => <a key={project.number} href={project.href} target="_blank" rel="noreferrer" className={`mission-card ${project.className}`}>
            <div className="mission-art" aria-hidden="true"><span className="mission-category">{project.category}</span><span className="mission-symbol">{project.symbol}</span><span className="mission-art-title">{project.title}</span><span className="mission-orbit" /></div>
            <div className="mission-info"><span className="mission-number">{project.number}</span><div><h3>{project.title}</h3><p>{project.description}</p></div><span className="mission-arrow">↗</span></div>
          </a>)}
        </div>
      </section>
      <p className="asset-credit">Astronaut by Poly / <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">CC BY 2.0</a> / <a href="https://github.com/google/model-viewer/blob/master/packages/modelviewer.dev/ATTRIBUTIONS.md" target="_blank" rel="noreferrer">Source</a> · Lighting and presentation adapted.</p>
    </div>
  );
}
