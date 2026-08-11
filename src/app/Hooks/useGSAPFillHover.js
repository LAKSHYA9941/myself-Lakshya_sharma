"use client";
import { useEffect } from "react";
import gsap from "gsap";

/**
 * GSAP Fill Hover — mouse-aware expanding circle background.
 *
 * Targets: .btn-primary, .btn-ghost, nav links, .glass-card in contacts,
 *          social links, and project cards (.gsap-fill-target).
 *
 * How it works:
 *  1. On mount, querySelectorAll for every target selector.
 *  2. For each target, inject a <span class="gsap-fill-circle"> child.
 *  3. Ensure the target has position:relative + overflow:hidden.
 *  4. Wire mouseenter / mousemove / mouseleave via gsap.quickTo.
 */

const SELECTORS = [
  ".btn-primary",
  ".btn-ghost",
  ".nav-fill-target",
  ".contact-fill-target",
  ".social-fill-target",
  ".project-fill-target",
];

export default function useGSAPFillHover() {
  useEffect(() => {
    // Small delay so DOM is painted after hydration
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll(SELECTORS.join(", "));
      const cleanups = [];

      targets.forEach((el) => {
        // Skip if already initialized
        if (el.dataset.gsapFillInit) return;
        el.dataset.gsapFillInit = "true";

        // Ensure structural requirements
        const computed = getComputedStyle(el);
        if (computed.position === "static") {
          el.style.position = "relative";
        }
        el.style.overflow = "hidden";

        // Inject circle
        const circle = document.createElement("span");
        circle.classList.add("gsap-fill-circle");
        el.appendChild(circle);

        // GSAP initial state
        gsap.set(circle, {
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          x: 0,
          y: 0,
        });

        // quickTo for buttery 60fps tracking
        const xTo = gsap.quickTo(circle, "x", {
          duration: 0.15,
          ease: "power2.out",
        });
        const yTo = gsap.quickTo(circle, "y", {
          duration: 0.15,
          ease: "power2.out",
        });

        const onEnter = (e) => {
          const rect = el.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;

          // Snap position instantly, then animate scale up
          gsap.set(circle, { x: mx, y: my });
          xTo(mx);
          yTo(my);

          gsap.to(circle, {
            scale: 1.5,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
        };

        const onLeave = (e) => {
          // Snap to exit coordinates, then shrink
          const rect = el.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;

          xTo(mx);
          yTo(my);

          gsap.to(circle, {
            scale: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
          circle.remove();
          delete el.dataset.gsapFillInit;
        });
      });

      // Store cleanups on the timer for teardown
      timer._cleanups = cleanups;
    }, 200);

    return () => {
      clearTimeout(timer);
      if (timer._cleanups) {
        timer._cleanups.forEach((fn) => fn());
      }
    };
  }, []);
}
