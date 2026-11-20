import Image from "next/image";
import { ArrowDown, ArrowUpRight, Asterisk, Circle } from "lucide-react";
import { projects } from "@/data/projects";
import HeroPortal from "@/components/hero-portal";
import SiteLoader from "@/components/site-loader";
import SiteHeader from "@/components/site-header";
import VinylDisc from "@/components/vinyl-disc";
import ProjectIndex from "@/components/project-index";
import Marquee from "@/components/marquee";
import Magnetic from "@/components/magnetic";
import { TransitionLink } from "@/components/page-transition";

const featuredSlugs = [
  "memo-showcase",
  "azoth-keyboard",
  "chem-logistics-platform",
  "superlight",
  "halyard",
  "backload-board",
];

const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

const indexProjects = [...projects].sort((a, b) =>
  (b.year ?? "").localeCompare(a.year ?? "")
);

const capabilities = [
  {
    index: "01",
    title: "Product thinking",
    text: "Research, flows, information architecture and prototypes shaped around how people actually work.",
    tools: "Research · Figma · Testing",
  },
  {
    index: "02",
    title: "Interface design",
    text: "Distinct visual systems that stay legible, responsive and consistent from first frame to final state.",
    tools: "UI systems · Art direction",
  },
  {
    index: "03",
    title: "Creative development",
    text: "Production interfaces with intentional motion, tactile feedback and selective 3D where the idea earns it.",
    tools: "React · Next.js · GSAP · Three.js",
  },
  {
    index: "04",
    title: "Agentic builds",
    text: "Briefing and directing teams of coding agents so concepts move from moodboard to shipped page in days, not weeks.",
    tools: "Codex · Claude · Review loops",
  },
];

const experience = [
  ["2025—NOW", "Junior UI/UX Designer", "Cross Code Studio"],
  ["2024—2025", "UI/UX Designer Intern", "UBTS"],
  ["2022—NOW", "Designer & Creative Developer", "Independent"],
  ["2022—NOW", "Diploma in Information Technology", "Singapore Polytechnic"],
];

const marqueeItems = [
  "Product design",
  "Creative development",
  "WebGL & 3D",
  "Motion systems",
  "Brand identity",
  "Logistics UX",
  "Agentic builds",
];

function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {text.split("").map((char, i) => (
        <span className="char" key={`${char}-${i}`}>
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <SiteLoader />
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-transition-wash" aria-hidden="true" />
        <HeroPortal />
        <p className="hero-kicker reveal">
          <span>Designer</span> / <span>Developer</span> / <span>Singapore</span>
        </p>
        <p className="hero-index reveal">Portfolio — 2026</p>

        <h1 className="hero-title" aria-label="Brandon Lim">
          <Chars text="BRANDON" />
          <Chars text="LIM" className="outline" />
        </h1>

        <div className="portrait-stage reveal" data-cursor="">
          <div className="portrait-halo" />
          <div className="portrait-frame">
            <Image
              src="/images/brandon-profile.jpg"
              alt="Portrait of Brandon Lim"
              fill
              priority
              sizes="(max-width: 800px) 70vw, 34vw"
              className="portrait-image"
            />
          </div>
          <span className="portrait-note note-one">UI/UX</span>
          <span className="portrait-note note-two">FRONTEND</span>
          <div className="portrait-meta">
            <span>Portrait / 001</span>
            <span>Singapore</span>
          </div>
        </div>

        <p className="hero-statement reveal">
          <span className="hero-statement-line">
            <span>I turn complicated ideas into interfaces</span>
          </span>
          <span className="hero-statement-line">
            <span>
              people want to <em>use.</em>
            </span>
          </span>
        </p>

        <Magnetic className="scroll-cue-wrap" strength={0.3}>
          <a className="scroll-cue" href="#work">
            Selected work <ArrowDown size={17} />
          </a>
        </Magnetic>
      </section>

      <section className="proof-strip" aria-label="Selected achievements">
        <div>
          <strong data-count="6.9" data-suffix="M">6.9M</strong>
          <span>Pinterest impressions</span>
        </div>
        <div>
          <strong data-count="10" data-suffix=" mo.">10 mo.</strong>
          <span>Logistics product internship</span>
        </div>
        <div>
          <strong data-count={projects.length}>{projects.length}</strong>
          <span>Documented case studies</span>
        </div>
        <div className="proof-mark" aria-hidden="true">
          <Asterisk />
        </div>
      </section>

      <Marquee items={marqueeItems} className="marquee--ink" />

      <section className="work-section" id="work">
        <div className="section-intro">
          <p className="eyebrow">01 / Selected work</p>
          <h2 aria-label="Built to be used, not admired.">
            <span className="work-intro-line">
              <span>Built to be</span>
            </span>
            <span className="work-intro-line">
              <span>used, not admired.</span>
            </span>
          </h2>
          <p>
            Six projects that show the range — operational software, product
            films in WebGL and brand systems. Every one begins with a reason to
            exist.
          </p>
        </div>

        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <article
              className="project-row"
              key={project.slug}
              style={{ ["--accent" as string]: project.accent ?? "#2e54fe" }}
            >
              <TransitionLink
                href={`/projects/${project.slug}`}
                className="project-visual"
                aria-label={`View ${project.title} case study`}
                data-cursor="View"
              >
                {project.images?.[0] && (
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 62vw"
                  />
                )}
                <span className="project-visual-meta">
                  <span>{project.kind}</span>
                  <span>{project.year}</span>
                </span>
              </TransitionLink>
              <div className="project-copy">
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{project.role}</p>
                  <h3>
                    <TransitionLink href={`/projects/${project.slug}`}>{project.title}</TransitionLink>
                  </h3>
                  <p className="project-description">{project.description}</p>
                  <ul aria-label="Project tools">
                    {project.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <TransitionLink href={`/projects/${project.slug}`} className="project-cta" data-cursor="">
                    Read the case study <ArrowUpRight size={15} />
                  </TransitionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="index-section" id="index" aria-labelledby="index-title">
        <div className="section-intro section-intro--paper">
          <p className="eyebrow">02 / Index</p>
          <h2 id="index-title">
            <span className="work-intro-line">
              <span>Everything,</span>
            </span>
            <span className="work-intro-line">
              <span className="muted">in one list.</span>
            </span>
          </h2>
          <p>
            {projects.length} projects across product, 3D, brand and tooling,
            newest first. Filter by discipline, open any row.
          </p>
        </div>
        <ProjectIndex projects={indexProjects} />
      </section>

      <section className="about-section" id="about">
        <div className="about-orbit" aria-hidden="true">
          <VinylDisc />
          <div className="about-disk-face">
            <span>DESIGN</span><Circle fill="currentColor" /><span>BUILD</span>
            <Circle fill="currentColor" /><span>LEARN</span>
          </div>
        </div>
        <p className="eyebrow">03 / Point of view</p>
        <h2>
          <span className="about-line"><span>A designer who</span></span>
          <span className="about-line"><span>can build.</span></span>
          <span className="about-line"><span>A developer who</span></span>
          <span className="about-line"><span><em>cares why.</em></span></span>
        </h2>
        <div className="about-copy">
          <p className="lead">
            I’m Brandon Lim, a UI/UX designer and frontend developer based in
            Singapore. I care about the whole chain: finding the real problem,
            shaping the system, and making the final interaction feel inevitable.
          </p>
          <div>
            <p>
              My work ranges from operational logistics software to personal
              finance tools and immersive product stories. The medium changes;
              the standard does not: clear thinking, useful detail and a strong
              visual point of view.
            </p>
            <p>
              I’m currently designing with Cross Code Studio, studying
              Information Technology at Singapore Polytechnic, and building
              independent products in the spaces between.
            </p>
          </div>
        </div>
      </section>

      <section className="capabilities-section">
        <p className="eyebrow">04 / What I bring</p>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article key={capability.index}>
              <span>{capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
              <small>{capability.tools}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <p className="eyebrow">05 / Field notes</p>
        <div className="experience-list">
          {experience.map(([date, role, place]) => (
            <div className="experience-row" key={`${date}-${role}`}>
              <span>{date}</span>
              <strong>{role}</strong>
              <p>{place}</p>
              <ArrowUpRight aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <p className="eyebrow">06 / Open channel</p>
          <p>Have a product, an interface, or a strange idea?</p>
        </div>
        <Magnetic className="footer-cta-wrap" strength={0.12}>
          <a className="footer-cta" href="mailto:blc33833@gmail.com" data-cursor="Say hi">
            <span className="footer-cta-line"><span>LET’S MAKE</span></span>
            <span className="footer-cta-line"><span className="outline">SOMETHING.</span></span>
            <ArrowUpRight />
          </a>
        </Magnetic>
        <div className="footer-meta">
          <p>Brandon Lim © 2026</p>
          <div>
            <a href="https://www.instagram.com/stacked_aiart/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.pinterest.com/stackedaiart" target="_blank" rel="noreferrer">Pinterest</a>
            <a href="https://github.com/Brandonnnlc" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:blc33833@gmail.com">Email</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
