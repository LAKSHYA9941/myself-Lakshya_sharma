"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { path: "about", label: "About" },
  { path: "projects", label: "Projects" },
  { path: "techstack", label: "Stack" },
  { path: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ratiosRef = useRef({});

  // Track scroll for glass intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active link highlight
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.path))
      .filter(Boolean);
    if (!sections.length) return;

    ratiosRef.current = Object.fromEntries(sections.map((s) => [s.id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target.id) {
            ratiosRef.current[e.target.id] = e.isIntersecting
              ? e.intersectionRatio
              : 0;
          }
        });

        let bestId = null;
        let bestRatio = -1;
        for (const [id, r] of Object.entries(ratiosRef.current)) {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, path) => {
    const target = document.getElementById(path);
    if (!target) return;
    e.preventDefault();
    setMobileOpen(false);
    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo(target, { offset: -64 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    history.replaceState(null, "", `/#${path}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-bg/75 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-glass-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-semibold tracking-wider text-primary bg-surface border border-glass-border transition-all duration-200 hover:shadow-[0_0_12px_var(--color-accent-glow)]">
            LS
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ path, label }) => {
            const isActive = active === path;
            return (
              <li key={path}>
                <Link
                  href={`/#${path}`}
                  onClick={(e) => handleClick(e, path)}
                  className={`relative px-4 py-2 font-mono text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-px bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-10 flex md:hidden h-10 w-10 items-center justify-center rounded-lg bg-surface border border-glass-border transition-colors"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block h-px w-5 bg-primary transition-all duration-200 ${
                mobileOpen ? "rotate-45 translate-y-[2px] translate-x-[2px]" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-primary transition-all duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-px w-5 bg-primary transition-all duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-[2px] translate-x-[2px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden bg-base-bg/95 backdrop-blur-[30px] backdrop-saturate-[180%] border-t border-glass-border"
          >
            {links.map(({ path, label }) => (
              <Link
                key={path}
                href={`/#${path}`}
                onClick={(e) => handleClick(e, path)}
                className={`text-2xl font-mono font-medium tracking-wide uppercase transition-colors duration-200 ${
                  active === path ? "text-accent" : "text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
