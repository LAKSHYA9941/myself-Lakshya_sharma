"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  useEffect(() => {
    // Only disable on mobile phone touch devices
    const isMobilePhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobilePhone) return;

    // Clean up any stale cursor elements from prior mounts/HMR
    document.querySelectorAll(".gelly-cursor-wrapper, .gelly-cursor-text").forEach((el) => el.remove());

    // 1. Inject cursor DOM nodes at root body
    const wrapper = document.createElement("div");
    wrapper.className = "gelly-cursor-wrapper";

    const inner = document.createElement("div");
    inner.className = "gelly-cursor-inner";

    wrapper.appendChild(inner);
    document.body.appendChild(wrapper);
    document.documentElement.classList.add("has-gelly-cursor");

    // Off-screen initial position
    gsap.set(wrapper, { x: -100, y: -100, opacity: 0 });

    // 2. High-performance quickTo coordinate tracking
    const xTo = gsap.quickTo(wrapper, "x", {
      duration: 0.14,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(wrapper, "y", {
      duration: 0.14,
      ease: "power2.out",
    });

    let mouseX = -100;
    let mouseY = -100;
    let prevX = -100;
    let prevY = -100;
    let isVisible = false;
    let activeMode = "default"; // 'default' | 'hover'

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        gsap.to(wrapper, { opacity: 1, duration: 0.2 });
      }

      xTo(mouseX);
      yTo(mouseY);

      // Determine hover state deterministically from pointer target
      const target = e.target;
      if (target && target instanceof HTMLElement) {
        const isInteractive = target.closest(
          "a, button, .btn-primary, .btn-ghost, .nav-fill-target, .social-fill-target, .project-card, .project-fill-target, .contact-fill-target, [data-cursor='pointer']"
        );

        const newMode = isInteractive ? "hover" : "default";

        if (newMode !== activeMode) {
          activeMode = newMode;

          if (newMode === "hover") {
            wrapper.classList.add("mode-hover");
            gsap.to(inner, {
              width: 44,
              height: 44,
              duration: 0.25,
              ease: "power3.out",
              overwrite: "auto",
            });
          } else {
            wrapper.classList.remove("mode-hover");
            gsap.to(inner, {
              width: 20,
              height: 20,
              duration: 0.25,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        }
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      gsap.to(wrapper, { opacity: 0, duration: 0.2 });
    };

    // 3. Smooth Gelly Velocity Stretch physics loop
    const updatePhysics = () => {
      if (!isVisible) return;

      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const speed = Math.hypot(dx, dy);

      if (speed > 0.1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const vel = Math.min(speed * 0.03, 0.45);
        const scaleX = 1 + vel * 0.6;
        const scaleY = 1 - vel * 0.25;

        gsap.to(inner, {
          rotation: angle,
          scaleX,
          scaleY,
          duration: 0.12,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(inner, {
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      prevX = mouseX;
      prevY = mouseY;
    };

    gsap.ticker.add(updatePhysics);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    return () => {
      gsap.ticker.remove(updatePhysics);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.classList.remove("has-gelly-cursor");
      wrapper.remove();
    };
  }, []);

  return null;
}
