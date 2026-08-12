"use client";
import { useEffect } from "react";
import gsap from "gsap";

/**
 * GSAP Mouse-Aware Fill Hover
 *
 * Dynamically expands a subtle greyish glass circle from the exact mouse entry point,
 * scaling dynamically to cover 100% of the container bounds.
 */

const SELECTORS = [
  ".glass-card",
  ".btn-primary",
  ".btn-ghost",
  ".nav-fill-target",
  ".contact-fill-target",
  ".social-fill-target",
  ".project-fill-target",
  ".mouse-aware-fill",
];

const BASE_SIZE = 100; // Base circle size in px

function calculateScale(rect, mx, my) {
  const d1 = Math.hypot(mx, my);
  const d2 = Math.hypot(rect.width - mx, my);
  const d3 = Math.hypot(mx, rect.height - my);
  const d4 = Math.hypot(rect.width - mx, rect.height - my);
  const maxDist = Math.max(d1, d2, d3, d4);
  const requiredRadius = maxDist * 1.08; // 8% safety padding for rounded corners
  return (requiredRadius * 2) / BASE_SIZE;
}

export default function useGSAPFillHover() {
  useEffect(() => {
    // Disable on mobile touch devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    const initializedElements = new Set();
    const cleanups = [];

    const initElement = (el) => {
      if (initializedElements.has(el) || el.dataset.gsapFillInit) return;
      el.dataset.gsapFillInit = "true";
      initializedElements.add(el);

      // Ensure relative positioning and clipping
      const computed = getComputedStyle(el);
      if (computed.position === "static") {
        el.style.position = "relative";
      }
      el.style.overflow = "hidden";

      // Create circle element if not present
      let circle = el.querySelector(":scope > .gsap-fill-circle");
      if (!circle) {
        circle = document.createElement("span");
        circle.className = "gsap-fill-circle";
        el.appendChild(circle);
      }

      // Initial GSAP state
      gsap.set(circle, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        x: 0,
        y: 0,
      });

      // Interpolators for smooth cursor tracking
      const xTo = gsap.quickTo(circle, "x", {
        duration: 0.2,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo(circle, "y", {
        duration: 0.2,
        ease: "power2.out",
      });

      const onEnter = (e) => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const targetScale = calculateScale(rect, mx, my);

        gsap.killTweensOf(circle);
        gsap.set(circle, { x: mx, y: my });
        xTo(mx);
        yTo(my);

        gsap.to(circle, {
          scale: targetScale,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        xTo(mx);
        yTo(my);

        const targetScale = calculateScale(rect, mx, my);
        gsap.to(circle, {
          scale: targetScale,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onLeave = (e) => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        xTo(mx);
        yTo(my);

        gsap.to(circle, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
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
        initializedElements.delete(el);
      });
    };

    const scanAndInit = () => {
      const targets = document.querySelectorAll(SELECTORS.join(", "));
      targets.forEach(initElement);
    };

    // Initial scan with small delays to handle hydration and Framer Motion reveals
    scanAndInit();
    const t1 = setTimeout(scanAndInit, 100);
    const t2 = setTimeout(scanAndInit, 500);

    // MutationObserver to automatically pick up dynamically rendered cards
    const observer = new MutationObserver(() => {
      scanAndInit();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);
}

