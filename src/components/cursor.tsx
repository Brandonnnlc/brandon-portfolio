"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor: a small dot that lags behind the pointer plus a label ring
 * that expands over anything with `data-cursor="View"` (or any text).
 * Hidden entirely on touch devices and under reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-cursor");

    const quickDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const quickRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const quickRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    let activeTarget: HTMLElement | null = null;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
    };
    const hide = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3, overwrite: "auto" });
    };

    const setState = (target: HTMLElement | null) => {
      if (target === activeTarget) return;
      activeTarget = target;
      const text = target?.dataset.cursor ?? "";
      const dark = target?.dataset.cursorTheme === "dark";
      label.textContent = text;
      ring.classList.toggle("is-dark", dark);
      if (target) {
        gsap.to(ring, { scale: text ? 1 : 0.55, duration: 0.5, ease: "expo.out" });
        gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
        gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.25 });
      } else {
        gsap.to(ring, { scale: 0.22, duration: 0.5, ease: "expo.out" });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      }
    };

    const onMove = (event: PointerEvent) => {
      show();
      quickDotX(event.clientX);
      quickDotY(event.clientY);
      quickRingX(event.clientX);
      quickRingY(event.clientY);
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role=button]"
      );
      setState(target ?? null);
    };

    const onLeave = () => hide();
    const onDown = () => gsap.to(ring, { scale: "-=0.08", duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: "+=0.08", duration: 0.25 });

    gsap.set([dot, ring], { autoAlpha: 0, xPercent: -50, yPercent: -50 });
    gsap.set(ring, { scale: 0.22 });
    gsap.set(label, { autoAlpha: 0 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span ref={labelRef} />
      </div>
    </>
  );
}
