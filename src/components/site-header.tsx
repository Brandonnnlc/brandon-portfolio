"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { TransitionLink } from "./page-transition";
import Magnetic from "./magnetic";

function useSingaporeTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Singapore",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function SiteHeader({
  variant = "home",
  liveUrl,
}: {
  variant?: "home" | "case";
  liveUrl?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const time = useSingaporeTime();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up; solidify once past the hero.
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      header.classList.toggle("is-scrolled", y > 24);
      if (menuOpen) return;
      if (delta > 6 && y > 140 && !hidden) {
        hidden = true;
        gsap.to(header, { yPercent: -100, duration: 0.5, ease: "power3.inOut" });
      } else if (delta < -6 && hidden) {
        hidden = false;
        gsap.to(header, { yPercent: 0, duration: 0.5, ease: "power3.out" });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    if (menuOpen) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.__lenis?.start();
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
    <header className={`site-header site-header--${variant}`} ref={ref}>
      <div className="header-left">
        {variant === "case" ? (
          <TransitionLink href="/#work" className="case-back" data-cursor="">
            <ArrowLeft size={15} /> <span>All work</span>
          </TransitionLink>
        ) : (
          <TransitionLink href="/" className="wordmark" aria-label="Brandon Lim, home">
            BL<span>®</span>
          </TransitionLink>
        )}
      </div>

      {variant === "case" ? (
        <TransitionLink href="/" className="wordmark header-center" aria-label="Brandon Lim, home">
          BL<span>®</span>
        </TransitionLink>
      ) : (
        <nav aria-label="Primary navigation" className="header-nav">
          {[
            ["#work", "Work"],
            ["#index", "Index"],
            ["#about", "About"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <Magnetic key={href} strength={0.25}>
              <a href={href}>{label}</a>
            </Magnetic>
          ))}
        </nav>
      )}

      <div className="header-right">
        <span className="header-clock" aria-label="Local time in Singapore">
          SGT <output>{time || "--:--"}</output>
        </span>
        {variant === "case" && liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noreferrer" className="header-pill" data-cursor="">
            Live site <ArrowUpRight size={14} />
          </a>
        ) : (
          <a className="availability header-pill" href="mailto:blc33833@gmail.com">
            <span />
            <em>Available for ideas</em>
          </a>
        )}
        {variant === "home" && (
          <button
            type="button"
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span className="sr-only">Menu</span>
          </button>
        )}
      </div>

    </header>
      {variant === "home" && (
        <div id="mobile-menu" className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
          <nav aria-label="Mobile navigation">
            {[
              ["#work", "Work", "01"],
              ["#index", "Index", "02"],
              ["#about", "About", "03"],
              ["#contact", "Contact", "04"],
            ].map(([href, label, n]) => (
              <a key={href} href={href} onClick={close}>
                <small>{n}</small>
                {label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu-foot">
            <a href="mailto:blc33833@gmail.com">blc33833@gmail.com</a>
            <span>Singapore — {time}</span>
          </div>
        </div>
      )}
    </>
  );
}
