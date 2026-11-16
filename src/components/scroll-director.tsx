"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * All scroll-bound and entrance choreography for the site. Re-runs on every
 * route change so case pages reached through the curtain are wired up too.
 */
export default function ScrollDirector() {
  const pathname = usePathname();
  const meterRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const isHome = pathname === "/";
    const $ = <T extends HTMLElement = HTMLElement>(sel: string) =>
      document.querySelector<T>(sel);
    const $$ = <T extends HTMLElement = HTMLElement>(sel: string) =>
      gsap.utils.toArray<T>(sel);

    const context = gsap.context(() => {
      /* ---------------------------------------------------------------- */
      /* Global: scroll meter                                              */
      /* ---------------------------------------------------------------- */
      gsap.set(meterRef.current, { scaleY: 0, transformOrigin: "top" });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.set(meterRef.current, { scaleY: self.progress });
          document.documentElement.classList.toggle("is-scrolled", self.progress > 0.02);
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
          }
        },
      });

      /* ---------------------------------------------------------------- */
      /* Home: hero intro + parallax                                       */
      /* ---------------------------------------------------------------- */
      if (isHome) {
        const chars = $$(".hero-title .char");
        const statementLines = $$(".hero-statement-line > span");
        const kicker = $$(".hero-kicker, .hero-index");

        gsap.set(chars, { yPercent: 110, rotate: 4, opacity: 0 });
        gsap.set(statementLines, { yPercent: 110 });
        gsap.set(".portrait-stage", { yPercent: 10, opacity: 0, rotate: 4 });
        gsap.set(kicker, { y: -12, opacity: 0 });
        gsap.set(".scroll-cue", { opacity: 0, y: 10 });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
        intro
          .to(chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.035 })
          .to(".portrait-stage", { yPercent: 0, opacity: 1, rotate: 0.75, duration: 1.2 }, 0.25)
          .to(kicker, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.5)
          .to(statementLines, { yPercent: 0, duration: 0.9, stagger: 0.1 }, 0.6)
          .to(".scroll-cue", { opacity: 1, y: 0, duration: 0.6 }, 0.95);

        const playIntro = () => intro.play();
        if (document.documentElement.classList.contains("is-loading")) {
          window.addEventListener("loader:done", playIntro, { once: true });
        } else {
          playIntro();
        }

        // Scroll parallax inside the hero
        gsap.to(".hero-title .char", {
          xPercent: (i) => (i < 7 ? -6 : 10),
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });
        gsap
          .timeline({
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.65 },
          })
          .to(".portrait-stage", { yPercent: 26, rotate: -3, scale: 0.88, ease: "none" }, 0)
          .to(".hero-portal", { scale: 1.32, rotate: 8, xPercent: -4, yPercent: 3, ease: "none" }, 0)
          .to(".hero-statement", { yPercent: -38, ease: "none" }, 0);

        const hero = $(".hero");
        const heroWash = $(".hero-transition-wash");
        const proofStrip = $(".proof-strip");
        if (hero && heroWash && proofStrip) {
          gsap
            .timeline({
              scrollTrigger: { trigger: hero, start: "58% center", end: "bottom top", scrub: 0.8 },
            })
            .to(heroWash, { scaleY: 1, ease: "power2.inOut" }, 0)
            .fromTo(
              proofStrip,
              { clipPath: "inset(0 9% 0 9%)", scaleX: 0.96 },
              { clipPath: "inset(0 0% 0 0%)", scaleX: 1, ease: "power3.out" },
              0.26
            )
            .to(".hero-title", { scale: 0.94, opacity: 0.34, transformOrigin: "left center", ease: "power2.in" }, 0.25)
            .to(".portrait-stage", { opacity: 0.42, ease: "power2.in" }, 0.32)
            .to([".hero-statement", ".scroll-cue-wrap"], { opacity: 0, y: -28, ease: "power2.in" }, 0.28);
        }

        // Proof strip: counters
        $$(".proof-strip > div").forEach((cell, index) => {
          gsap.from(cell, {
            yPercent: 55,
            opacity: 0,
            duration: 0.9,
            delay: index * 0.06,
            ease: "power4.out",
            scrollTrigger: { trigger: ".proof-strip", start: "top 88%", toggleActions: "play none none none" },
          });
          const strong = cell.querySelector<HTMLElement>("strong[data-count]");
          if (strong) {
            const target = parseFloat(strong.dataset.count ?? "0");
            const suffix = strong.dataset.suffix ?? "";
            const decimals = String(strong.dataset.count).includes(".") ? 1 : 0;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: { trigger: ".proof-strip", start: "top 80%", once: true },
              onUpdate: () => {
                strong.textContent = obj.v.toFixed(decimals) + suffix;
              },
            });
          }
        });

        // Work section arrival
        const workSection = $(".work-section");
        const workIntro = $(".work-section .section-intro");
        if (workSection && workIntro) {
          const lines = workIntro.querySelectorAll<HTMLElement>(".work-intro-line > span");
          const eyebrow = workIntro.querySelector<HTMLElement>(".eyebrow");
          const desc = workIntro.querySelector<HTMLElement>(":scope > p:last-child");
          const arrival = gsap.timeline({
            scrollTrigger: { trigger: workSection, start: "top 94%", end: "top 30%", scrub: 0.75 },
          });
          arrival.fromTo(
            workSection,
            { clipPath: "inset(0 2.5% 0 2.5% round 24px)" },
            { clipPath: "inset(0 0% 0 0% round 0px)", ease: "power3.out" },
            0
          );
          if (eyebrow) arrival.fromTo(eyebrow, { x: -44, opacity: 0 }, { x: 0, opacity: 1, ease: "power3.out" }, 0.12);
          if (lines.length) arrival.fromTo(lines, { yPercent: 112, rotate: 2 }, { yPercent: 0, rotate: 0, stagger: 0.12, ease: "power4.out" }, 0.18);
          if (desc) arrival.fromTo(desc, { y: 56, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out" }, 0.42);
        }

        // Project rows
        $$(".project-row").forEach((row, index) => {
          const visual = row.querySelector<HTMLElement>(".project-visual");
          const image = row.querySelector<HTMLElement>(".project-visual img");
          const copy = row.querySelector<HTMLElement>(".project-copy");
          const number = row.querySelector<HTMLElement>(".project-number");
          if (!visual || !copy) return;
          gsap.set(visual, {
            clipPath: index % 2 ? "inset(8% 0% 8% 12% round 18px)" : "inset(8% 12% 8% 0% round 18px)",
          });
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 88%", end: "top 24%", scrub: 0.7 } })
            .to(visual, { clipPath: "inset(0% 0% 0% 0% round 18px)", ease: "power3.out" })
            .fromTo(copy.children, { y: 90, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: "power3.out" }, 0)
            .fromTo(number, { rotate: -90, opacity: 0 }, { rotate: 0, opacity: 1, ease: "back.out(1.8)" }, 0.35);
          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.18, yPercent: -5 },
              { scale: 1, yPercent: 7, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } }
            );
          }
        });

        // Index section
        const indexIntro = $(".index-section .section-intro");
        if (indexIntro) {
          const lines = indexIntro.querySelectorAll<HTMLElement>(".work-intro-line > span");
          gsap.from(lines, {
            yPercent: 112,
            rotate: 2,
            stagger: 0.12,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: indexIntro, start: "top 82%", toggleActions: "play none none none" },
          });
          gsap.from(indexIntro.querySelectorAll(".eyebrow, :scope > p:last-child"), {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: indexIntro, start: "top 82%", toggleActions: "play none none none" },
          });
        }
        const indexRows = $$(".index-row");
        if (indexRows.length) {
          gsap.from(indexRows, {
            y: 40,
            opacity: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".index-list", start: "top 85%", once: true },
          });
          gsap.from(".index-filters button", {
            y: 16,
            opacity: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: ".index-filters", start: "top 90%", once: true },
          });
        }

        // About
        if ($(".about-orbit")) {
          gsap.to(".about-orbit", {
            rotate: 210,
            xPercent: -22,
            ease: "none",
            scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }
        const aboutLines = $$(".about-line > span");
        const aboutCopy = $(".about-copy");
        if (aboutLines.length && aboutCopy) {
          gsap
            .timeline({ scrollTrigger: { trigger: ".about-section", start: "top 78%", end: "top 24%", scrub: 0.8 } })
            .fromTo(aboutLines, { yPercent: 115, rotate: 2 }, { yPercent: 0, rotate: 0, stagger: 0.15, ease: "power4.out" })
            .fromTo(aboutCopy.children, { y: 105, opacity: 0.15 }, { y: 0, opacity: 1, stagger: 0.1, ease: "power3.out" }, 0.3);
          gsap.to(".about-section h2", {
            yPercent: -15,
            ease: "none",
            scrollTrigger: { trigger: ".about-section", start: "35% center", end: "bottom top", scrub: 1 },
          });
          gsap.to(aboutCopy, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: { trigger: ".about-section", start: "35% center", end: "bottom top", scrub: 1.15 },
          });
        }

        // Capabilities + experience
        $$(".capability-grid article").forEach((card, index) => {
          gsap.from(card, {
            y: 130,
            rotate: index % 2 ? 2.5 : -2.5,
            opacity: 0,
            duration: 1,
            delay: index * 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: ".capability-grid", start: "top 82%", toggleActions: "play none none none" },
          });
        });
        $$(".experience-row").forEach((row, index) => {
          gsap.from(row.children, {
            x: index % 2 ? 45 : -45,
            opacity: 0,
            stagger: 0.06,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 92%", toggleActions: "play none none none" },
          });
        });

        // Footer
        const footerLines = $$(".footer-cta-line > span");
        if (footerLines.length) {
          gsap.from(footerLines, {
            yPercent: 110,
            rotate: 3,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: "footer", start: "top 70%", end: "center center", scrub: 0.8 },
          });
          gsap.from(".footer-top > *", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: "footer", start: "top 75%", toggleActions: "play none none none" },
          });
        }
      }

      /* ---------------------------------------------------------------- */
      /* Case study pages                                                  */
      /* ---------------------------------------------------------------- */
      if (!isHome && $(".case-page")) {
        const words = $$(".case-hero h1 .case-word > span");
        gsap.set(words, { yPercent: 110, rotate: 3 });
        gsap.set(".case-hero-meta > span, .case-hero .eyebrow", { y: -10, opacity: 0 });
        gsap.set(".case-subtitle, .case-hero-foot", { y: 30, opacity: 0 });

        gsap
          .timeline({ defaults: { ease: "power4.out" }, delay: 0.25 })
          .to(words, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.08 })
          .to(".case-hero-meta > span, .case-hero .eyebrow", { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, 0.3)
          .to(".case-subtitle, .case-hero-foot", { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.55);

        gsap.to(".case-hero h1", {
          xPercent: -6,
          scale: 0.94,
          transformOrigin: "left bottom",
          ease: "none",
          scrollTrigger: { trigger: ".case-hero", start: "top top", end: "bottom top", scrub: 0.7 },
        });

        if ($(".case-cover img")) {
          gsap.fromTo(
            ".case-cover",
            { clipPath: "inset(0 3% 0 3% round 24px)" },
            { clipPath: "inset(0 0% 0 0% round 0px)", ease: "power2.out", scrollTrigger: { trigger: ".case-cover", start: "top 90%", end: "top 30%", scrub: 0.6 } }
          );
          gsap.fromTo(
            ".case-cover img",
            { scale: 1.16, yPercent: -6 },
            { scale: 1, yPercent: 7, ease: "none", scrollTrigger: { trigger: ".case-cover", start: "top bottom", end: "bottom top", scrub: true } }
          );
        }

        // Reading progress
        const progress = $(".case-progress span");
        const body = $(".case-layout");
        if (progress && body) {
          gsap.set(progress, { scaleX: 0, transformOrigin: "left" });
          ScrollTrigger.create({
            trigger: body,
            start: "top 60%",
            end: "bottom 60%",
            onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
          });
        }

        // Intro copy word fade
        const introWords = $$(".case-intro-copy .w");
        if (introWords.length) {
          gsap.fromTo(
            introWords,
            { opacity: 0.18 },
            { opacity: 1, stagger: 0.02, ease: "none", scrollTrigger: { trigger: ".case-intro", start: "top 75%", end: "bottom 60%", scrub: 0.5 } }
          );
        }

        // Chapters
        $$(".case-chapter").forEach((chapter) => {
          const title = chapter.querySelector(".case-chapter-title");
          const content = chapter.querySelector(".case-outcome-body, .case-large-copy, .case-process");
          gsap.from([title, content], {
            y: 80,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: chapter, start: "top 82%", toggleActions: "play none none none" },
          });
        });
        $$(".case-process li").forEach((li) => {
          gsap.from(li, {
            x: -24,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: li, start: "top 90%", toggleActions: "play none none none" },
          });
        });
        $$(".case-gallery figure").forEach((fig) => {
          gsap.from(fig, {
            y: 60,
            opacity: 0,
            clipPath: "inset(10% 0 10% 0 round 18px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: fig, start: "top 85%", toggleActions: "play none none none" },
          });
        });

        // Active chapter in side nav
        const navLinks = $$<HTMLAnchorElement>(".case-nav a[data-chapter]");
        $$(".case-anchor").forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (!self.isActive) return;
              navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.chapter === section.id));
            },
          });
        });

        // Next project reveal
        const next = $(".case-next-link");
        if (next) {
          gsap.fromTo(
            ".case-next-media",
            { clipPath: "inset(20% 6% 20% 6% round 24px)", scale: 1.1 },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, ease: "none", scrollTrigger: { trigger: next, start: "top 85%", end: "top 15%", scrub: 0.6 } }
          );
          gsap.from(".case-next-copy > *", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: next, start: "top 60%", toggleActions: "play none none none" },
          });
        }
      }
    });

    // Let fonts/images settle, then measure.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, [pathname]);

  return (
    <>
      <div className="scroll-meter" aria-hidden="true">
        <span ref={meterRef} />
      </div>
      <div className="scroll-coordinate" aria-hidden="true">
        <span>Depth</span>
        <output ref={countRef}>000</output>
      </div>
    </>
  );
}
