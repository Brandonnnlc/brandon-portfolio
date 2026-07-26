import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/data/projects";

export default function ProjectDetailClient({
  project,
  nextProject,
  prevProject,
}: {
  project: ProjectData;
  nextProject: ProjectData;
  prevProject: ProjectData;
}) {
  return (
    <main className="case-page">
      <header className="case-header">
        <Link href="/#work" className="case-back">
          <ArrowLeft size={16} /> All work
        </Link>
        <Link href="/" className="wordmark" aria-label="Brandon Lim, home">
          BL<span>®</span>
        </Link>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="case-live">
            Visit live site <ArrowUpRight size={16} />
          </a>
        ) : (
          <span className="case-live">Case study</span>
        )}
      </header>

      <section className="case-hero">
        <div className="case-hero-meta">
          <span>{project.role}</span>
          <span>{project.duration}</span>
          <span>Brandon Lim / Singapore</span>
        </div>
        <p className="eyebrow">Selected project / {project.tags[0]}</p>
        <h1>{project.title}</h1>
        <p className="case-subtitle">{project.subtitle}</p>
        <div className="case-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>

      {project.images?.[0] && (
        <div className="case-cover">
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            fill
            priority
            sizes="100vw"
          />
        </div>
      )}

      <article className="case-body">
        <section className="case-intro">
          <p className="eyebrow">00 / Overview</p>
          <p>{project.description}</p>
        </section>

        <section className="case-chapter">
          <div className="case-chapter-title">
            <span>01</span>
            <h2>The problem</h2>
          </div>
          <p className="case-large-copy">{project.problem}</p>
        </section>

        <section className="case-chapter">
          <div className="case-chapter-title">
            <span>02</span>
            <h2>How it moved</h2>
          </div>
          <ol className="case-process">
            {project.process.map((step, index) => {
              const [title, ...rest] = step.split(" — ");
              return (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    {rest.length > 0 && <p>{rest.join(" — ")}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {project.images && project.images.length > 1 && (
          <section className="case-gallery" aria-label="Project gallery">
            {project.images.slice(1).map((image) => (
              <figure key={image.src}>
                <Image src={image.src} alt={image.alt} width={1600} height={1000} />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </section>
        )}

        <section className="case-chapter case-outcome">
          <div className="case-chapter-title">
            <span>03</span>
            <h2>The outcome</h2>
          </div>
          <p className="case-large-copy">{project.outcome}</p>
          <div className="case-tool-list">
            <span>Built with</span>
            <p>{project.tools.join(" / ")}</p>
          </div>
        </section>
      </article>

      <nav className="case-pagination" aria-label="Project navigation">
        <Link href={`/projects/${prevProject.slug}`}>
          <span><ArrowLeft size={16} /> Previous</span>
          <strong>{prevProject.title}</strong>
        </Link>
        <Link href={`/projects/${nextProject.slug}`}>
          <span>Next <ArrowRight size={16} /></span>
          <strong>{nextProject.title}</strong>
        </Link>
      </nav>
    </main>
  );
}
