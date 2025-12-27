// "use client";
// import React, { useEffect } from "react";

// export default function SmoothScrollProvider({ children }) {
//   useEffect(() => {
//     let lenis = null;
//     let rafId = null;
//     let isRunning = false;

//     const prefersReducedMotion =
//       typeof window !== "undefined" &&
//       window.matchMedia &&
//       window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//     if (prefersReducedMotion) {
//       // Honor accessibility preference and skip smooth scrolling
//       return () => {};
//     }

//     (async () => {
//       try {
//         const mod = await import("@studio-freight/lenis");
//         const Lenis = mod.default || mod;
//         lenis = new Lenis({
//           duration: 0.7, // feels smoother & snappier
//           smoothWheel: true,
//           smoothTouch: false,
//           gestureOrientation: "vertical",
//           easing: (t) => 1 - Math.pow(2, -10 * t), // easeOutExpo for a nice snap
//           autoRaf: false,
//         });

//         // Expose globally for debugging / manual control
//         try {
//           window.lenis = lenis;
//         } catch {}

//         const raf = (time) => {
//           lenis?.raf(time);
//           rafId = requestAnimationFrame(raf);
//         };

//         // Start RAF only when needed
//         const startRaf = () => {
//           if (!isRunning) {
//             isRunning = true;
//             rafId = requestAnimationFrame(raf);
//           }
//         };

//         const stopRaf = () => {
//           if (rafId) cancelAnimationFrame(rafId);
//           rafId = null;
//           isRunning = false;
//         };

//         // Start RAF immediately to ensure smooth scrolling works on page load
//         startRaf();

//         // Detect scroll activity to start/stop raf
//         lenis.on("scroll", () => startRaf());

//         // Visibility optimization
//         const onVis = () => {
//           if (document.hidden) {
//             stopRaf();
//           } else {
//             startRaf();
//           }
//         };
//         document.addEventListener("visibilitychange", onVis);

//         // Clean up visibility listener on unmount
//         return () => {
//           document.removeEventListener("visibilitychange", onVis);
//           stopRaf();
//         };
//       } catch (e) {
//         // Lenis not installed yet; fail silently
//       }
//     })();

//     return () => {
//       if (rafId) cancelAnimationFrame(rafId);
//       try {
//         lenis?.destroy?.();
//       } catch {}
//     };
//   }, []);

//   return <>{children}</>;
// }





"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis = null;
    let rafId = null;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return () => { };

    // Defer Lenis initialization to prevent blocking initial render
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

        // expose globally (optional)
        window.lenis = lenis;

        // integrate with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // proxy scroll values
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });

        // Optimized RAF loop
        const raf = (time) => {
          lenis.raf(time);
          ScrollTrigger.update();
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // refresh ScrollTrigger after Lenis init
        ScrollTrigger.refresh();
      } catch (e) {
        console.warn("Lenis not installed:", e);
      }
    };

    // Use requestIdleCallback to defer initialization
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    idleCallback(initLenis);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try {
        lenis?.destroy();
      } catch { }
    };
  }, []);

  return <>{children}</>;
}
