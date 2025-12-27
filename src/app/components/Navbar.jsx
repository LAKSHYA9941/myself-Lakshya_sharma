"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const [active, setActive] = useState("home");
  const ratiosRef = useRef({});
  const logoRef = useRef(null);

  const links = [
    { path: "about", label: "About" },
    { path: "techstack", label: "Tech Stack" },
    { path: "skills", label: "Skills" },
    { path: "projects", label: "Projects" },
    { path: "contact", label: "Contact" },
  ];

  // Animate logo with scroll
  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }
  }, []);

  // Highlight active link logic
  useEffect(() => {
    const allTopSections = Array.from(
      document.querySelectorAll("main > section[id]")
    );
    const sections = allTopSections.filter((sec) =>
      links.some((l) => l.path === sec.id)
    );
    if (!sections.length) return;

    ratiosRef.current = Object.fromEntries(sections.map((s) => [s.id, 0]));

    let ticking = false;
    const pickByCenter = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const centerY = window.innerHeight / 2;
        let bestId = null;
        let bestDist = Infinity;
        sections.forEach((sec) => {
          const rect = sec.getBoundingClientRect();
          const secCenter = rect.top + rect.height / 2;
          const dist = Math.abs(secCenter - centerY);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = sec.id;
          }
        });
        if (bestId) setActive(bestId);
        ticking = false;
      });
    };
    pickByCenter();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.id;
          if (!id) return;
          ratiosRef.current[id] = e.isIntersecting ? e.intersectionRatio : 0;
        });

        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
          let bestId = null;
          let bestRatio = -1;
          for (const id of Object.keys(ratiosRef.current)) {
            const r = ratiosRef.current[id] ?? 0;
            if (r > bestRatio) {
              bestRatio = r;
              bestId = id;
            }
          }
          if (bestId) setActive(bestId);
          ticking = false;
        });
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-45% 0px -45% 0px",
      }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e, href) => {
    try {
      const hash =
        typeof href === "string" && href.includes("#")
          ? href.split("#")[1]
          : "";
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(target, { offset: -88 });
        history.replaceState(null, "", `/#${hash}`);
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: y, behavior: "smooth" });
        history.replaceState(null, "", `/#${hash}`);
      }
    } catch {}
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md transform-gpu will-change-[background-color,backdrop-filter]">
      <nav className="px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          {/* Creative Logo with initials */}
          <Link href="/" className="flex items-center">
            <div
              ref={logoRef}
              className="w-12 h-12 flex items-center justify-center rounded-full 
              bg-black text-white font-bold text-lg shadow-[0_4px_15px_rgba(0,0,0,0.5)]
              border border-white"
            >
              LS
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex flex-row space-x-2 md:space-x-4">
            {links.map(({ path, label }) => {
              const href = `/#${path}`;
              const isActive = active === path;
              const linkClass = [
                "relative px-3 py-2 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-2xl outline-none transition-all duration-300 ease-out",
                "before:absolute before:inset-0 before:rounded-2xl before:-z-10 before:bg-cyan-400/0 before:blur-sm before:transition-all before:duration-300",
                isActive
                  ? "text-white before:scale-100 before:opacity-100 before:bg-cyan-400/60 border border-cyan-400"
                  : "text-slate-400 border border-transparent hover:text-white hover:before:scale-100 hover:before:opacity-100 hover:before:bg-[#B13BFF]/50",
                "transform-gpu will-change-transform",
              ].join(" ");
              return (
                <li key={path}>
                  <Link
                    id="desktopNav"
                    href={href}
                    className={linkClass}
                    prefetch
                    onClick={(e) => handleAnchorClick(e, href)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
