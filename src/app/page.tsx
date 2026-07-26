import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk, Circle } from "lucide-react";
import { projects } from "@/data/projects";
import HeroPortal from "@/components/hero-portal";
import SiteLoader from "@/components/site-loader";
import VinylDisc from "@/components/vinyl-disc";

const featuredSlugs = [
  "memo-showcase",
  "chem-logistics-platform",
  "personal-finance-app",
  "flow-studio",
  "habit-horizon",
];

const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

const otherProjects = projects.filter(
  (project) => !featuredSlugs.includes(project.slug)
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
    tools: "React · Next.js · GSAP",
  },
];

const experience = [
  ["2025—NOW", "Junior UI/UX Designer", "Cross Code Studio"],
  ["2024—2025", "UI/UX Designer Intern", "UBTS"],
  ["2022—NOW", "Designer & Creative Developer", "Independent"],
  ["2022—NOW", "Diploma in Information Technology", "Singapore Polytechnic"],
];

export default function Home() {
  return (
    <main>
      <SiteLoader />
      <header className="site-header">
        <Link href="#top" className="wordmark" aria-label="Brandon Lim, home">
          BL<span>®</span>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="mailto:blc33833@gmail.com">
          <span />
          Available for ideas
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-transition-wash" aria-hidden="true" />
        <HeroPortal />
        <p className="hero-kicker reveal">Designer / Developer / Singapore</p>
        <p className="hero-index reveal">Portfolio — 2026</p>

        <div className="hero-title" aria-label="Brandon Lim">
          <span className="reveal">BRANDON</span>
          <span className="outline reveal">LIM</span>
        </div>

        <div className="portrait-stage reveal">
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
          I turn complicated ideas into interfaces
          <br />
          people want to <em>use.</em>
        </p>

        <a className="scroll-cue" href="#work">
          Selected work <ArrowDown size={17} />
        </a>
      </section>

      <section className="proof-strip" aria-label="Selected achievements">
        <div>
          <strong>6.9M</strong>
          <span>Pinterest impressions</span>
        </div>
        <div>
          <strong>10 mo.</strong>
          <span>Logistics product internship</span>
        </div>
        <div>
          <strong>{projects.length}</strong>
          <span>Documented case studies</span>
        </div>
        <div className="proof-mark" aria-hidden="true">
          <Asterisk />
        </div>
      </section>

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
            A cross-section of product design, frontend engineering and visual
            experiments. Every project begins with a reason to exist.
          </p>
        </div>

        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <article className="project-row" key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="project-visual"
                aria-label={`View ${project.title} case study`}
              >
                {project.images?.[0] && (
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 62vw"
                  />
                )}
                <span className="view-project">
                  View project <ArrowUpRight size={16} />
                </span>
              </Link>
              <div className="project-copy">
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{project.role}</p>
                  <h3>
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="project-description">{project.description}</p>
                  <ul aria-label="Project tools">
                    {project.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="all-projects">
          <p>More explorations live in the archive.</p>
          <span>{projects.length} projects / ongoing</span>
        </div>
      </section>

      <section
        className="other-projects-section"
        id="other-projects"
        aria-labelledby="other-projects-title"
      >
        <div className="other-projects-sticky">
          <div className="other-projects-glow" aria-hidden="true" />
          <div className="other-projects-copy">
            <p className="eyebrow">02 / Other dimensions</p>
            <h2 id="other-projects-title">
              <span className="other-projects-muted-line">
                Smaller{"\u00a0"}projects.
              </span>
              <br />
              <span>Same{"\u00a0"}obsession.</span>
            </h2>
            <p>
              Visual systems, growth experiments and product studies that keep
              the practice broad and the thinking sharp.
            </p>
          </div>

          <div className="other-projects-rail">
            {otherProjects.map((project, index) => (
              <article className="other-project-card" key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <div className="other-project-image">
                    {project.images?.[0] && (
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        fill
                        sizes="(max-width: 680px) 78vw, 28vw"
                      />
                    )}
                    <span className="other-project-arrow" aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </span>
                    <span className="other-project-index">
                      O/{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="other-project-meta">
                    <h3>{project.title}</h3>
                    <p>{project.tags.slice(0, 2).join(" / ")}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <p className="other-projects-progress">
            Scroll to arrange <span>↓</span>
          </p>
        </div>
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
          A designer who can build.<br />
          A developer who <span>cares why.</span>
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
        <a className="footer-cta" href="mailto:blc33833@gmail.com">
          LET’S MAKE
          <br />
          <span>SOMETHING.</span>
          <ArrowUpRight />
        </a>
        <div className="footer-meta">
          <p>Brandon Lim © 2026</p>
          <div>
            <a href="https://www.instagram.com/stacked_aiart/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.pinterest.com/stackedaiart" target="_blank" rel="noreferrer">Pinterest</a>
            <a href="mailto:blc33833@gmail.com">Email</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
