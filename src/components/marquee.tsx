"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Infinite text band. Direction and speed respond to scroll velocity so it
 * feels attached to the page rather than looping on its own.
 */
export default function Marquee({
  items,
  className = "",
  speed = 60,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const half = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -half,
      duration: half / speed,
      ease: "none",
      repeat: -1,
    });

    let direction = 1;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        const next = v < -50 ? -1 : 1;
        if (next !== direction) {
          direction = next;
          gsap.to(tween, { timeScale: direction, duration: 0.6, overwrite: true });
        }
        const boost = gsap.utils.clamp(1, 4, 1 + Math.abs(v) / 900);
        gsap.to(tween, { timeScale: direction * boost, duration: 0.3, overwrite: "auto" });
      },
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
