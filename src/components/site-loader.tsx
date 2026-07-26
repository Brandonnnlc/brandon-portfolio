"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function SiteLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLOutputElement>(null);
  const skipRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const documentRoot = document.documentElement;
    documentRoot.classList.add("is-loading");

    if (reducedMotion) {
      const reducedTimer = window.setTimeout(() => {
        root.style.display = "none";
        documentRoot.classList.remove("is-loading");
      }, 180);
      return () => {
        window.clearTimeout(reducedTimer);
        documentRoot.classList.remove("is-loading");
      };
    }

    const progress = { value: 0 };
    let released = false;

    const release = () => {
      if (released) return;
      released = true;
      root.style.display = "none";
      root.setAttribute("aria-hidden", "true");
      documentRoot.classList.remove("is-loading");
    };

    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".loader-panel");
      const wordLines = gsap.utils.toArray<HTMLElement>(".loader-word > span");

      gsap.set(wordLines, { yPercent: 115 });
      gsap.set(".loader-ring", { scale: 0.52, rotate: -28, opacity: 0 });
      gsap.set(".loader-signal", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".loader-progress-fill", { scaleX: 0, transformOrigin: "left" });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: release,
      });

      timeline
        .to(".loader-ring", {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.5)",
        })
        .to(
          wordLines,
          {
            yPercent: 0,
            stagger: 0.1,
            duration: 0.72,
            ease: "power4.out",
          },
          0.18
        )
        .to(
          progress,
          {
            value: 100,
            duration: 2.15,
            ease: "power1.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
              }
              gsap.set(".loader-progress-fill", { scaleX: progress.value / 100 });
            },
          },
          0
        )
        .to(
          ".loader-ring",
          {
            rotate: 34,
            scale: 1.08,
            duration: 1.25,
            ease: "sine.inOut",
          },
          0.82
        )
        .to(
          ".loader-signal",
          {
            scaleX: 1,
            duration: 0.48,
            ease: "power4.inOut",
          },
          1.34
        )
        .to(
          ".loader-signal",
          {
            xPercent: 112,
            duration: 0.55,
            ease: "power3.in",
          },
          1.82
        )
        .to(
          ".loader-ui",
          {
            opacity: 0,
            y: -28,
            duration: 0.34,
            ease: "power3.in",
          },
          2.08
        )
        .to(
          ".loader-ring",
          {
            scale: 4.8,
            rotate: 82,
            opacity: 0,
            duration: 0.72,
            ease: "power3.in",
          },
          2.08
        )
        .to(
          panels,
          {
            yPercent: -102,
            stagger: 0.055,
            duration: 0.78,
            ease: "power4.inOut",
          },
          2.24
        );

      skipRef.current = () => {
        timeline.timeScale(4.5);
        timeline.play();
      };
    }, root);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skipRef.current();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      context.revert();
      documentRoot.classList.remove("is-loading");
    };
  }, []);

  return (
    <div
      className="site-loader"
      ref={rootRef}
      role="status"
      aria-label="Loading Brandon Lim portfolio"
    >
      <div className="loader-panels" aria-hidden="true">
        <span className="loader-panel" />
        <span className="loader-panel" />
        <span className="loader-panel" />
        <span className="loader-panel" />
      </div>
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-ring" aria-hidden="true">
        <Image
          src="/images/hero-obsidian-portal-alpha.png"
          alt=""
          fill
          priority
          sizes="(max-width: 680px) 86vw, 48vw"
        />
      </div>
      <div className="loader-signal" aria-hidden="true" />

      <div className="loader-ui">
        <div className="loader-topline">
          <span>BL® / SYSTEM 001</span>
          <span>Singapore — 01°17′N</span>
        </div>

        <div className="loader-words" aria-hidden="true">
          <div className="loader-word"><span>DESIGN</span></div>
          <div className="loader-word loader-word-outline"><span>BUILD</span></div>
          <div className="loader-word"><span>LEARN</span></div>
        </div>

        <div className="loader-progress">
          <output ref={countRef} aria-hidden="true">000</output>
          <div className="loader-progress-meta">
            <span>Assembling the practice</span>
            <span className="loader-progress-track">
              <span className="loader-progress-fill" />
            </span>
          </div>
        </div>

        <button className="loader-skip" type="button" onClick={() => skipRef.current()}>
          Skip intro
        </button>
      </div>
    </div>
  );
}
