"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollDirector() {
  const meterRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(meterRef.current, { scaleY: 0, transformOrigin: "top" });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.set(meterRef.current, { scaleY: self.progress });
          if (countRef.current) {
            countRef.current.textContent = String(
              Math.round(self.progress * 100)
            ).padStart(3, "0");
          }
        },
      });

      const heroTitleLines = gsap.utils.toArray<HTMLElement>(".hero-title > span");
      if (heroTitleLines.length) {
        gsap.to(heroTitleLines[0], {
          xPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        gsap.to(heroTitleLines[1], {
          xPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      if (document.querySelector(".portrait-stage")) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          })
          .to(
            ".portrait-stage",
            { yPercent: 26, rotate: -3, scale: 0.88, ease: "none" },
            0
          )
          .to(
            ".hero-portal",
            {
              scale: 1.32,
              rotate: 8,
              xPercent: -4,
              yPercent: 3,
              ease: "none",
            },
            0
          )
          .to(".hero-statement", { yPercent: -38, ease: "none" }, 0);
      }

      const hero = document.querySelector<HTMLElement>(".hero");
      const heroWash = document.querySelector<HTMLElement>(".hero-transition-wash");
      const proofStrip = document.querySelector<HTMLElement>(".proof-strip");

      if (hero && heroWash && proofStrip) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "58% center",
              end: "bottom top",
              scrub: 0.8,
            },
          })
          .to(
            heroWash,
            {
              scaleY: 1,
              ease: "power2.inOut",
            },
            0
          )
          .fromTo(
            proofStrip,
            {
              clipPath: "inset(0 9% 0 9%)",
              scaleX: 0.96,
            },
            {
              clipPath: "inset(0 0% 0 0%)",
              scaleX: 1,
              ease: "power3.out",
            },
            0.26
          )
          .to(
            ".hero-title",
            {
              scale: 0.94,
              opacity: 0.34,
              transformOrigin: "left center",
              ease: "power2.in",
            },
            0.25
          )
          .to(
            ".portrait-stage",
            {
              opacity: 0.42,
              ease: "power2.in",
            },
            0.32
          )
          .to(
            [".hero-statement", ".scroll-cue"],
            {
              opacity: 0,
              y: -28,
              ease: "power2.in",
            },
            0.28
          );
      }

      gsap.utils.toArray<HTMLElement>(".proof-strip > div").forEach((cell, index) => {
        gsap.from(cell, {
          yPercent: 55,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".proof-strip",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      const workSection = document.querySelector<HTMLElement>(".work-section");
      const workIntro = document.querySelector<HTMLElement>(".section-intro");

      if (workSection && workIntro) {
        const workLines = workIntro.querySelectorAll<HTMLElement>(
          ".work-intro-line > span"
        );
        const workEyebrow = workIntro.querySelector<HTMLElement>(".eyebrow");
        const workDescription =
          workIntro.querySelector<HTMLElement>(":scope > p:last-child");

        const workArrival = gsap.timeline({
          scrollTrigger: {
            trigger: workSection,
            start: "top 94%",
            end: "top 30%",
            scrub: 0.75,
          },
        });

        workArrival
          .fromTo(
            workSection,
            {
              clipPath: "inset(0 2.5% 0 2.5%)",
            },
            {
              clipPath: "inset(0 0% 0 0%)",
              ease: "power3.out",
            },
            0
          );

        if (workEyebrow) {
          workArrival.fromTo(
            workEyebrow,
            { x: -44, opacity: 0 },
            { x: 0, opacity: 1, ease: "power3.out" },
            0.12
          );
        }

        if (workLines.length) {
          workArrival.fromTo(
            workLines,
            { yPercent: 112, rotate: 2 },
            {
              yPercent: 0,
              rotate: 0,
              stagger: 0.12,
              ease: "power4.out",
            },
            0.18
          );
        }

        if (workDescription) {
          workArrival.fromTo(
            workDescription,
            { y: 56, opacity: 0 },
            { y: 0, opacity: 1, ease: "power3.out" },
            0.42
          );
        }
      }

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row, index) => {
        const visual = row.querySelector<HTMLElement>(".project-visual");
        const image = row.querySelector<HTMLElement>(".project-visual img");
        const copy = row.querySelector<HTMLElement>(".project-copy");
        const number = row.querySelector<HTMLElement>(".project-number");
        if (!visual || !copy) return;

        gsap.set(visual, {
          clipPath: index % 2
            ? "inset(8% 0% 8% 12% round 1px)"
            : "inset(8% 12% 8% 0% round 1px)",
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 24%",
              scrub: 0.7,
            },
          })
          .to(visual, {
            clipPath: "inset(0% 0% 0% 0% round 1px)",
            ease: "power3.out",
          })
          .fromTo(
            copy,
            { y: 110, opacity: 0 },
            { y: 0, opacity: 1, ease: "power3.out" },
            0
          )
          .fromTo(
            number,
            { rotate: -90, opacity: 0 },
            { rotate: 0, opacity: 1, ease: "back.out(1.8)" },
            0.35
          );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.18, yPercent: -5 },
            {
              scale: 1,
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      const otherSection = document.querySelector<HTMLElement>(".other-projects-section");
      const otherRail = document.querySelector<HTMLElement>(".other-projects-rail");
      const otherCopy = document.querySelector<HTMLElement>(".other-projects-copy");
      const otherCards = gsap.utils.toArray<HTMLElement>(".other-project-card");

      if (
        otherSection &&
        otherRail &&
        otherCopy &&
        otherCards.length &&
        window.matchMedia("(min-width: 681px)").matches
      ) {
        const cardOffsets = [175, 135, 195, 150];
        const cardRotations = [-2.4, 1.8, -1.5, 2.1];

        gsap
          .timeline({
            scrollTrigger: {
              trigger: otherSection,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            otherCopy,
            { y: 90, scale: 0.9, opacity: 0.18 },
            { y: 0, scale: 1, opacity: 1, duration: 0.28, ease: "power3.out" },
            0
          )
          .fromTo(
            otherCards,
            {
              y: (index) => cardOffsets[index % cardOffsets.length],
              rotationX: 84,
              rotationZ: (index) => cardRotations[index % cardRotations.length],
              transformOrigin: "50% 100%",
              transformPerspective: 1200,
              opacity: 0.3,
            },
            {
              y: 0,
              rotationX: 0,
              rotationZ: 0,
              opacity: 1,
              stagger: 0.055,
              duration: 0.5,
              ease: "power3.out",
            },
            0.22
          )
          .to(
            otherRail,
            {
              x: () =>
                Math.min(
                  -24,
                  window.innerWidth - otherRail.scrollWidth - window.innerWidth * 0.025
              ),
              ease: "none",
            },
            0.58
          );
      }

      if (document.querySelector(".about-orbit")) {
        gsap.to(".about-orbit", {
          rotate: 210,
          xPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      const aboutHeading = document.querySelector<HTMLElement>(".about-section h2");
      const aboutCopy = document.querySelector<HTMLElement>(".about-copy");

      if (aboutHeading && aboutCopy) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".about-section",
              start: "top 78%",
              end: "top 24%",
              scrub: 0.8,
            },
          })
          .fromTo(
            aboutHeading,
            {
              y: 150,
              rotateX: 17,
              rotateZ: -1.5,
              opacity: 0.18,
              transformPerspective: 1100,
              transformOrigin: "0% 100%",
            },
            {
              y: 0,
              rotateX: 0,
              rotateZ: 0,
              opacity: 1,
              ease: "power3.out",
            }
          )
          .fromTo(
            aboutCopy,
            { y: 105, opacity: 0.15 },
            { y: 0, opacity: 1, ease: "power3.out" },
            0.24
          );

        gsap.to(aboutHeading, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-section",
            start: "35% center",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(aboutCopy, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-section",
            start: "35% center",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".capability-grid article").forEach((card, index) => {
        gsap.from(card, {
          y: 130,
          rotate: index === 1 ? 2.5 : -2.5,
          opacity: 0,
          duration: 1,
          delay: index * 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".capability-grid",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".experience-row").forEach((row, index) => {
        gsap.from(row.children, {
          x: index % 2 ? 45 : -45,
          opacity: 0,
          stagger: 0.06,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      });

      if (document.querySelector(".footer-cta")) {
        gsap.from(".footer-cta", {
          letterSpacing: "0.02em",
          scale: 0.72,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: "footer",
            start: "top bottom",
            end: "center center",
            scrub: 0.8,
          },
        });
      }

      if (document.querySelector(".case-hero h1")) {
        gsap.to(".case-hero h1", {
          xPercent: -8,
          scale: 0.92,
          transformOrigin: "left bottom",
          ease: "none",
          scrollTrigger: {
            trigger: ".case-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }

      if (document.querySelector(".case-cover img")) {
        gsap.fromTo(
          ".case-cover img",
          { scale: 1.16, yPercent: -6 },
          {
            scale: 1,
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: ".case-cover",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".case-chapter").forEach((chapter) => {
        const title = chapter.querySelector(".case-chapter-title");
        const content = chapter.querySelector(".case-large-copy, .case-process");
        gsap.from([title, content], {
          y: 90,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

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
