"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import HoverEffect from "./Hoverit";

export default function LandingSection() {
  const sectionRef = useRef(null);

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

  const handleDownload = async () => {
    const filePath = "/lsr5.pdf";
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
        { opacity: 0, filter: "blur(20px)", y: 30 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-6 overflow-hidden"
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Left side */}
        <div className="flex-1 space-y-6 text-center md:text-left z-10 fade-blur">
          <h1 className="text-lg sm:text-6xl md:text-6xl font-bold text-white">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-slate-50 drop-shadow-[0_0_8px_#fff]">
              Lakshya
            </span>{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>

          <div className="text-sm sm:text-base md:text-xl text-zinc-50 space-y-1">
            {lines.map((line, i) => (
              <p key={i} className="fade-blur">
                {highlightWords(line)}
              </p>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-2 pt-4 fade-blur">
            {/* Contact Me */}
            <Link href="/#contact">
              <span className="gradient-wrapper fire inline-block">
                <button className="gradient-btn px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-md">
                  Contact Me
                </button>
              </span>
            </Link>

            {/* Explore Projects */}
            <Link href="/#projects">
              <span className="gradient-wrapper sky inline-block">
                <button className="gradient-btn px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-md">
                  Explore Projects
                </button>
              </span>
            </Link>

            {/* Download Resume */}
            <span className="gradient-wrapper cyan inline-block">
              <button
                onClick={handleDownload}
                className="gradient-btn px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-md"
              >
                Download Resume
              </button>
            </span>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex-shrink-0 flex justify-center fade-blur">
          <Image
            src="/mine2.jpeg"
            width={400}
            height={400}
            alt="Lakshya"
            className="rounded-3xl drop-shadow-[0_0_8px_#fff] h-auto w-full max-w-[180px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[400px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
