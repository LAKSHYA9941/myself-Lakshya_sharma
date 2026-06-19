"use client";
import { useEffect } from "react";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis = null;
    let rafId = null;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return () => {};

    const initLenis = async () => {
      try {
        const mod = await import("@studio-freight/lenis");
        const Lenis = mod.default || mod;
        lenis = new Lenis({
          duration: 0.7,
          smoothWheel: true,
          smoothTouch: false,
          gestureOrientation: "vertical",
          easing: (t) => 1 - Math.pow(2, -10 * t),
          autoRaf: false,
        });

        window.lenis = lenis;

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Pause when tab is hidden
        const onVisibility = () => {
          if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
          } else {
            rafId = requestAnimationFrame(raf);
          }
        };
        document.addEventListener("visibilitychange", onVisibility, { passive: true });

        return () => {
          document.removeEventListener("visibilitychange", onVisibility);
        };
      } catch (e) {
        console.warn("Lenis init failed:", e);
      }
    };

    const idleCallback =
      window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    idleCallback(initLenis);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try {
        lenis?.destroy();
      } catch {}
    };
  }, []);

  return <>{children}</>;
}
