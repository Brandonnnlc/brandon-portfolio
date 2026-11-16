"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type Navigate = (href: string) => void;
const TransitionContext = createContext<Navigate>(() => undefined);

/**
 * A curtain that sweeps up over the page before a route change and reveals
 * the next page once it has rendered. Pair with <TransitionLink>.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navigate = useCallback<Navigate>(
    (href) => {
      if (busyRef.current) return;
      const curtain = curtainRef.current;
      if (!curtain || reduced()) {
        router.push(href);
        return;
      }
      busyRef.current = true;
      pendingRef.current = href;
      const panels = curtain.querySelectorAll<HTMLElement>(".curtain-panel");
      const label = labelRef.current;
      if (label) {
        label.textContent = href === "/" ? "Home" : href.replace("/projects/", "").replace(/-/g, " ");
      }
      curtain.style.pointerEvents = "auto";
      gsap
        .timeline({
          onComplete: () => {
            router.push(href);
          },
        })
        .set(panels, { yPercent: 101 })
        .to(panels, {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power4.inOut",
        })
        .fromTo(
          label,
          { yPercent: 40, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out" },
          "-=0.25"
        );
    },
    [router]
  );

  // Reveal once the new route has rendered.
  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;
    if (!pendingRef.current) return;
    pendingRef.current = null;

    const panels = curtain.querySelectorAll<HTMLElement>(".curtain-panel");
    const label = labelRef.current;
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    gsap
      .timeline({
        onComplete: () => {
          curtain.style.pointerEvents = "none";
          busyRef.current = false;
          gsap.set(panels, { yPercent: 101 });
        },
      })
      .to(label, { yPercent: -40, autoAlpha: 0, duration: 0.25, ease: "power3.in" }, 0.15)
      .to(
        panels,
        { yPercent: -101, duration: 0.7, stagger: 0.06, ease: "power4.inOut" },
        0.2
      );
  }, [pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      <div className="page-curtain" ref={curtainRef} aria-hidden="true">
        <span className="curtain-panel" />
        <span className="curtain-panel" />
        <span className="curtain-panel" />
        <span className="curtain-panel" />
        <span className="curtain-label" ref={labelRef} />
      </div>
      {children}
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

/** Drop-in replacement for next/link that routes through the curtain. */
export function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const navigate = useContext(TransitionContext);
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = typeof href === "string" ? href : href.pathname ?? "";
    if (!target.startsWith("/")) return;
    const [path, hash] = target.split("#");
    if (path === pathname && hash) return; // same-page anchor, let smooth scroll handle it
    event.preventDefault();
    navigate(target);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
