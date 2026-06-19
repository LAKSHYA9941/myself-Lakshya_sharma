"use client";
import { useEffect, useRef, useCallback } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const activeRef = useRef(false);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15);

    if (glowRef.current) {
      glowRef.current.style.left = `${posRef.current.x}px`;
      glowRef.current.style.top = `${posRef.current.y}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Skip on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!activeRef.current && glowRef.current) {
        activeRef.current = true;
        glowRef.current.classList.add("active");
      }
    };

    const handleLeave = () => {
      if (glowRef.current) {
        activeRef.current = false;
        glowRef.current.classList.remove("active");
      }
    };

    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
