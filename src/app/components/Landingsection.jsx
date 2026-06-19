"use client";
import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const WORDS_LINE_1 = ["I", "build", "full-stack", "products"];
const WORDS_LINE_2 = ["that", "ship."];

const wordAnimation = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay, ease: "easeOut" },
  }),
};

export default function LandingSection() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleDownload = useCallback(async () => {
    const filePath = "/Lakshya _CV2.pdf";
    try {
      const res = await fetch(filePath, { method: "HEAD" });
      if (!res.ok) throw new Error("Missing file");
      const a = document.createElement("a");
      a.href = filePath;
      a.download = "Lakshya_Sharma_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      alert("Resume file not found. Please try again later.");
    }
  }, []);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (!target) return;
    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo(target, { offset: -64 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const totalWordCount = WORDS_LINE_1.length + WORDS_LINE_2.length;
  const subDelay = totalWordCount * 0.08 + 0.2;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-[var(--spacing-nav)]"
    >
      {/* Grid overlay */}
      <div className="grid-overlay" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1200px] px-6"
        style={{
          y: shouldReduceMotion ? 0 : heroY,
          opacity: shouldReduceMotion ? 1 : heroOpacity,
        }}
      >
        {/* Heading */}
        <div className="mb-8 border-l-2 border-accent pl-6">
          <h1 className="font-extrabold text-[clamp(48px,8vw,96px)] leading-[1.05] tracking-tight text-highlight">
            <span className="flex flex-wrap gap-x-[0.3em]">
              {WORDS_LINE_1.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordAnimation}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap gap-x-[0.3em]">
              {WORDS_LINE_2.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i + WORDS_LINE_1.length}
                  initial="hidden"
                  animate="visible"
                  variants={wordAnimation}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <motion.p
          custom={subDelay}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-2 text-sm md:text-base font-mono tracking-[0.02em] text-muted"
        >
          React Native &middot; Node.js &middot; AI/RAG &middot; TypeScript &middot; PostgreSQL
        </motion.p>

        <motion.p
          custom={subDelay + 0.1}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-10 text-sm md:text-base text-muted"
        >
          Currently: <span className="text-primary">At Facility</span> — outstation cab booking app, MVP live
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={subDelay + 0.2}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-wrap gap-4"
        >
          <a href="/#projects" onClick={scrollToProjects}>
            <button className="btn-primary" id="hero-view-projects">
              View Projects
            </button>
          </a>

          <button
            className="btn-ghost"
            onClick={handleDownload}
            id="hero-download-resume"
          >
            Download Resume
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
