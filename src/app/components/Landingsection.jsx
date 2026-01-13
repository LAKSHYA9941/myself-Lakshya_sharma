"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import HoverEffect from "./Hoverit";
import { motion } from "framer-motion";

export default function LandingSection() {
  const sectionRef = useRef(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const lines = [
    "I'm a full-stack AI developer",
    "Still thinking what to add in my skill arsenal",
    "Writing code that’s 90% elegance, 10% duct tape, and 100% ‘don’t touch that part'"
  ];

  function highlightWords(text) {
    return text.split(/(\s+)/).map((word, idx) => {
      const w = word.toLowerCase();
      if (w === "full-stack" || w === "developer")
        return (
          <HoverEffect key={idx} color1="#93c5fd" color2="#f87171" src="/developer.gif">
            {word}
          </HoverEffect>
        );
      if (w === "arsenal")
        return (
          <HoverEffect key={idx} color1="#86efac" color2="#eab308" src="/arsenal.gif">
            {word}
          </HoverEffect>
        );
      if (w.includes("don’t") || w.includes("don't"))
        return (
          <HoverEffect key={idx} color1="#facc15" color2="#fb923c" src="/dont.gif">
            {word}
          </HoverEffect>
        );
      return word;
    });
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    setMouseTilt({ x: offsetX / 25, y: offsetY / 25 });
  };

  const handleMouseLeave = () => setMouseTilt({ x: 0, y: 0 });

  const handleDownload = async () => {
    const filePath = "/Lakshya _CV2.pdf";
    const ok =
      typeof window !== "undefined" && window.confirm("Download resume to your device?");
    if (!ok) return;

    try {
      const res = await fetch(filePath, { method: "HEAD" });
      if (!res.ok) throw new Error("Missing file");

      const a = document.createElement("a");
      a.href = filePath;
      a.download = filePath.split("/").pop() || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Resume file not found yet. Please try again later.");
    }
  };

  // ✨ Blur-to-clear GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-blur",
        { opacity: 0, filter: "blur(20px)", y: 30, willChange: "opacity, filter, transform" },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "willChange",
          force3D: true
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 px-4 
        [grid-template-areas:'text''image''buttons'] 
        md:[grid-template-areas:'text_image''buttons_image']"
      >
        
        {/* Text Block */}
        <div className="space-y-6 text-center md:text-left z-10 fade-blur [grid-area:text]">
          <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold text-white leading-tight">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-slate-50 drop-shadow-[0_0_8px_#fff]">
              Lakshya
            </span>{" "}
          </h1>

          <div className="text-sm sm:text-base md:text-xl text-zinc-50 space-y-1">
            {lines.map((line, i) => (
              <p key={i} className="fade-blur leading-relaxed">
                {highlightWords(line)}
              </p>
            ))}
          </div>
        </div>

        {/* Image Block */}
        <div className="flex-shrink-0 flex justify-center fade-blur mt-6 md:mt-0 [grid-area:image]">
          <motion.div
            className="relative group"
            style={{
              transform: `perspective(1000px) rotateY(${mouseTilt.x}deg) rotateX(${-mouseTilt.y}deg)`,
              transition: "transform 0.15s ease-out"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/15 via-purple-500/15 to-sky-500/15 blur-3xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="relative w-[220px] sm:w-[260px] md:w-[320px] lg:w-[360px] aspect-[3/4] rounded-[2.5rem] border border-white/15 bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_35px_60px_-25px_rgba(15,23,42,0.75)]">
              <Image
                src="/mine2.jpeg"
                alt="Lakshya"
                fill
                priority
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 220px"
                className="object-cover object-top"
                quality={90}
              />
            </div>
            <motion.div
              className="absolute -top-8 -right-6 h-20 w-20 rounded-full bg-cyan-400/35 blur-xl"
              animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-purple-500/30 blur-2xl"
              animate={{ y: [0, 18, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Buttons Block */}
        <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3 pt-4 fade-blur [grid-area:buttons] md:-mt-10 self-start">
          <Link href="/#contact">
            <motion.span
              whileTap={{ scale: 0.95 }}
              className="gradient-wrapper fire inline-block"
            >
              <button className="gradient-btn px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-md">
                Contact Me
              </button>
            </motion.span>
          </Link>

          <Link href="/#projects">
            <motion.span
              whileTap={{ scale: 0.95 }}
              className="gradient-wrapper sky inline-block"
            >
              <button className="gradient-btn px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-md">
                Explore Projects
              </button>
            </motion.span>
          </Link>

          <motion.span
            whileTap={{ scale: 0.95 }}
            className="gradient-wrapper cyan inline-block"
          >
            <button
              onClick={handleDownload}
              className="gradient-btn px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-md"
            >
              Download Resume
            </button>
          </motion.span>
        </div>
      </div>
    </section>
  );
}
