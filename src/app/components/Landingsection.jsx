"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const WORDS_LINE_1_BEFORE = ["I"];
const KEYWORDS = ["create", "break", "fix", "build"];
const WORDS_LINE_1_AFTER = [];
const WORDS_LINE_2 = ["products", "that", "ship."];

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay, ease: "easeOut" },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const getRandomOffset = (distance = 50) => {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotation: (Math.random() - 0.5) * 18,
  };
};

export default function LandingSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const keywordRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    let isCancelled = false;

    const animateHeadline = async () => {
      if (!headlineRef.current) return;

      const staticWords = headlineRef.current.querySelectorAll(".hero-word");
      const keywordEl = keywordRef.current;
      const allWordEls = [...staticWords, keywordEl].filter(Boolean);

      // Hide elements immediately
      allWordEls.forEach((el) => {
        const offset = getRandomOffset(55);
        gsap.set(el, {
          x: offset.x,
          y: offset.y,
          rotation: offset.rotation,
          opacity: 0,
          scale: 0.85,
        });
      });

      // Initial 1 second delay before reveal starts
      await new Promise((r) => setTimeout(r, 1000));
      if (isCancelled) return;

      // 1. Initial word reveal from random directions
      await gsap.to(allWordEls, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.3)",
      });

      // Pause before keyword sequence
      await new Promise((r) => setTimeout(r, 650));

      // 2. Word rotation: create -> break -> fix -> build
      for (let i = 0; i < KEYWORDS.length - 1; i++) {
        if (isCancelled || !keywordRef.current) break;

        // Outgoing keyword word fades out towards a random direction
        const exitOffset = getRandomOffset(40);
        await gsap.to(keywordRef.current, {
          x: exitOffset.x,
          y: exitOffset.y,
          rotation: exitOffset.rotation,
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in",
        });

        if (isCancelled) break;

        // Update state to next word
        setWordIndex(i + 1);

        // Brief delay for React DOM render
        await new Promise((r) => setTimeout(r, 45));

        if (!keywordRef.current) break;

        // Incoming keyword word fades in from a new random direction
        const enterOffset = getRandomOffset(50);
        gsap.set(keywordRef.current, {
          x: enterOffset.x,
          y: enterOffset.y,
          rotation: enterOffset.rotation,
          opacity: 0,
          scale: 0.85,
        });

        await gsap.to(keywordRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.4)",
        });

        // Short hold on current word
        await new Promise((r) => setTimeout(r, 800));
      }
    };

    animateHeadline();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleDownload = useCallback(async () => {
    const filePath = "/Lakshya_Sharma_Resume.pdf";
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

  const subDelay = 1.1;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-[var(--spacing-nav)]"
    >
      {/* Grid overlay */}
      <div className="grid-overlay" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1200px] px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Two-column layout */}
        <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── LEFT: Text content ── */}
          <div className="flex-1 min-w-0">
            {/* Heading */}
            <div className="mb-8 border-l-2 border-accent pl-6">
              <h1
                ref={headlineRef}
                className="font-extrabold text-[clamp(40px,6vw,84px)] leading-[1.1] tracking-tight text-highlight"
              >
                <span className="flex flex-wrap items-center gap-x-[0.35em]">
                  {WORDS_LINE_1_BEFORE.map((word) => (
                    <span
                      key={word}
                      className="hero-word inline-block transform-gpu"
                    >
                      {word}
                    </span>
                  ))}

                  {/* Fixed-width slot so "full-stack" never shifts position */}
                  <span className="relative inline-flex items-center justify-center text-accent font-extrabold min-w-[3.6em] sm:min-w-[3.8em] text-center">
                    <span
                      ref={keywordRef}
                      className="keyword-word inline-block transform-gpu text-accent"
                    >
                      {KEYWORDS[wordIndex]}
                    </span>
                  </span>

                  {WORDS_LINE_1_AFTER.map((word) => (
                    <span
                      key={word}
                      className="hero-word inline-block transform-gpu"
                    >
                      {word}
                    </span>
                  ))}
                </span>

                <span className="flex flex-wrap items-center gap-x-[0.35em]">
                  {WORDS_LINE_2.map((word) => (
                    <span
                      key={word}
                      className="hero-word inline-block transform-gpu"
                    >
                      {word}
                    </span>
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
              Currently:{" "}
              <span className="text-primary">At Facility</span>{" "}
              — outstation cab booking app, MVP live
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
          </div>

          {/* ── RIGHT: Photo ── */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            animate="visible"
            className="relative mx-auto lg:mx-0 shrink-0"
          >
            {/* Neon glow behind the card */}
            <div
              className="absolute -inset-2 rounded-3xl blur-2xl opacity-20 pointer-events-none"
              style={{ background: "var(--color-accent)" }}
            />

            {/* Glass card frame */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-96 rounded-2xl overflow-hidden border-2 border-accent/30 bg-surface backdrop-blur-sm shadow-[4px_4px_0px_var(--color-accent)]">
              <Image
                src="/me2.jpg"
                alt="Lakshya Sharma"
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 256px"
                className="object-cover"
                style={{ objectPosition: "50% 50%" }}
                priority
              />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
