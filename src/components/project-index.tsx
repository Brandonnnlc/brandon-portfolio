"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import type { ProjectData } from "@/data/projects";
import { TransitionLink } from "./page-transition";

const ALL = "All";

/**
 * Full archive as a dense list. On pointer devices a floating preview card
 * follows the cursor and swaps image on each row; on touch each row shows
 * its thumbnail inline.
 */
export default function ProjectIndex({ projects }: { projects: ProjectData[] }) {
  const kinds = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.kind && set.add(p.kind));
    return [ALL, ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState<string>(ALL);
  const [active, setActive] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => projects.filter((p) => filter === ALL || p.kind === filter),
    [projects, filter]
  );

  // Floating preview follows the pointer.
  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) return;

    const x = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" });
    const rot = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3.out" });
    let lastX = 0;

    const onMove = (event: PointerEvent) => {
      const bounds = list.getBoundingClientRect();
      const px = event.clientX - bounds.left;
      const py = event.clientY - bounds.top;
      rot(gsap.utils.clamp(-8, 8, (event.clientX - lastX) * 0.25));
      lastX = event.clientX;
      x(px + 190);
      y(py);
    };
    const onLeave = () => {
      setActive(-1);
      rot(0);
    };
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Show / hide + slide the image stack to the active row.
  useEffect(() => {
    const preview = previewRef.current;
    const stack = stackRef.current;
    if (!preview || !stack) return;
    if (active < 0) {
      gsap.to(preview, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: "power3.in" });
      return;
    }
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "expo.out" });
    gsap.to(stack, { yPercent: -100 * active, duration: 0.55, ease: "expo.out" });
  }, [active]);

  // Re-stagger rows on filter change.
  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".index-row");
    if (!rows?.length) return;
    gsap.fromTo(
      rows,
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.04, ease: "power3.out", overwrite: true }
    );
  }, [filter]);

  return (
    <div className="project-index">
      <div className="index-filters" role="tablist" aria-label="Filter projects by discipline">
        {kinds.map((kind) => (
          <button
            key={kind}
            type="button"
            role="tab"
            aria-selected={filter === kind}
            className={filter === kind ? "is-active" : ""}
            onClick={() => {
              setActive(-1);
              setFilter(kind);
            }}
          >
            {kind}
            <sup>{kind === ALL ? projects.length : projects.filter((p) => p.kind === kind).length}</sup>
          </button>
        ))}
      </div>

      <ul className="index-list" ref={listRef}>
        <li className="index-head" aria-hidden="true">
          <span>No.</span>
          <span>Project</span>
          <span>Discipline</span>
          <span>Year</span>
          <span />
        </li>
        {visible.map((project, i) => (
          <li
            key={project.slug}
            className="index-row"
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <TransitionLink
              href={`/projects/${project.slug}`}
              data-cursor="Open"
              style={{ ["--accent" as string]: project.accent ?? "#2e54fe" }}
            >
              <span className="index-no">{String(i + 1).padStart(2, "0")}</span>
              <span className="index-title">
                <strong>{project.title}</strong>
                <em>{project.subtitle}</em>
              </span>
              <span className="index-kind">{project.kind}</span>
              <span className="index-year">{project.year}</span>
              <span className="index-arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
              {project.images?.[0] && (
                <span className="index-thumb" aria-hidden="true">
                  <Image src={project.images[0].src} alt="" fill sizes="40vw" />
                </span>
              )}
            </TransitionLink>
          </li>
        ))}
        <div className="index-preview" ref={previewRef} aria-hidden="true">
          <div className="index-preview-stack" ref={stackRef}>
            {visible.map((project) => (
              <div className="index-preview-item" key={project.slug}>
                {project.images?.[0] && (
                  <Image src={project.images[0].src} alt="" fill sizes="30vw" />
                )}
              </div>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}
