"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/data/projects";
import SiteHeader from "@/components/site-header";
import Magnetic from "@/components/magnetic";
import { TransitionLink } from "@/components/page-transition";

const chapters = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["process", "Process"],
  ["outcome", "Outcome"],
] as const;

export default function ProjectDetailClient({
  project,
  nextProject,
  prevProject,
  position,
  total,
}: {
  project: ProjectData;
  nextProject: ProjectData;
  prevProject: ProjectData;
  position: number;
  total: number;
}) {
  const accent = project.accent ?? "#2e54fe";
  const gallery = project.images?.slice(1) ?? [];

  return (
    <main className="case-page" style={{ ["--accent" as string]: accent }}>
      <SiteHeader variant="case" liveUrl={project.liveUrl} />
      <div className="case-progress" aria-hidden="true"><span /></div>

      <section className="case-hero">
        <div className="case-hero-meta">
          <span>{project.role}</span>
          <span>{project.duration}</span>
          <span>
            {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <p className="eyebrow">
          {project.kind ?? "Selected project"} — {project.year}
        </p>
        <h1>
          {project.title.split(" ").map((word, i) => (
            <span className="case-word" key={`${word}-${i}`}>
              <span>{word}</span>
            </span>
          ))}
        </h1>
        <p className="case-subtitle">{project.subtitle}</p>
        <div className="case-hero-foot">
          <div className="case-tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {project.liveUrl && (
            <Magnetic strength={0.3}>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="case-live-cta" data-cursor="Open">
                Visit live site <ArrowUpRight size={16} />
              </a>
            </Magnetic>
          )}
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

      <div className="case-layout">
        <aside className="case-nav" aria-label="Chapters">
          <ol>
            {chapters.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} data-chapter={id}>
                  <small>{String(i).padStart(2, "0")}</small>
                  {label}
                </a>
              </li>
            ))}
          </ol>
          <div className="case-nav-tools">
            <span>Built with</span>
            <p>{project.tools.join(", ")}</p>
          </div>
        </aside>

        <article className="case-body">
          <section className="case-intro case-anchor" id="overview">
            <p className="eyebrow">00 / Overview</p>
            <p className="case-intro-copy">
              {project.description.split(" ").map((word, i) => (
                <span className="w" key={i}>{word} </span>
              ))}
            </p>
          </section>

          <section className="case-chapter case-anchor" id="problem">
            <div className="case-chapter-title">
              <span>01</span>
              <h2>The problem</h2>
            </div>
            <p className="case-large-copy">{project.problem}</p>
          </section>

          <section className="case-chapter case-anchor" id="process">
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

          {gallery.length > 0 && (
            <section className="case-gallery" aria-label="Project gallery">
              {gallery.map((image) => (
                <figure key={image.src} data-cursor="">
                  <Image src={image.src} alt={image.alt} width={1600} height={1000} />
                  <figcaption>{image.alt}</figcaption>
                </figure>
              ))}
            </section>
          )}

          <section className="case-chapter case-outcome case-anchor" id="outcome">
            <div className="case-chapter-title">
              <span>03</span>
              <h2>The outcome</h2>
            </div>
            <div className="case-outcome-body">
              <p className="case-large-copy">{project.outcome}</p>
              {project.links && (
                <div className="case-links">
                  {project.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                      {link.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        </article>
      </div>

      <section className="case-next" aria-label="Next project">
        <TransitionLink href={`/projects/${nextProject.slug}`} className="case-next-link" data-cursor="Next">
          <div className="case-next-media" aria-hidden="true">
            {nextProject.images?.[0] && (
              <Image src={nextProject.images[0].src} alt="" fill sizes="100vw" />
            )}
          </div>
          <div className="case-next-copy">
            <span className="eyebrow">Next project</span>
            <strong>{nextProject.title}</strong>
            <span className="case-next-sub">{nextProject.subtitle}</span>
          </div>
          <span className="case-next-arrow"><ArrowRight /></span>
        </TransitionLink>
        <div className="case-next-foot">
          <TransitionLink href={`/projects/${prevProject.slug}`} data-cursor="">
            <ArrowLeft size={15} /> {prevProject.title}
          </TransitionLink>
          <TransitionLink href="/#index" data-cursor="">All projects</TransitionLink>
        </div>
      </section>
    </main>
  );
}
