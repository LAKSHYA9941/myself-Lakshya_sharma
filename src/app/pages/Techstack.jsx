"use client";
// Techstack.jsx
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- data ---------- */
const languagesAndFrontend = [
  "JavaScript",
  "TypeScript",
  "Python",
  "HTML",
  "CSS",
  "SQL",
  "GSAP",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Vite",
  "Redux",
  "React Native",
  "MySQL",
];

const backendAndTools = [
  "Node.js",
  "Express",
  "MongoDB",
  "Firebase",
  "REST APIs",
  "Git",
  "GitHub",
  "Axios",
  "Postman"
];

const aiStack = [
  "Retrieval-Augmented Generation",
  "Generative AI",
  "AI Agents",
  "Agentic Workflows",
  "Model Context Protocol (MCP)",
  "LangChain",
  "LangGraph",
  "Qdrant",
  "Mem0",
  "Neo4j",
  "Applied AI Solutions"
];

const devOpsAndCloud = [
  "Docker",
  "Vercel",
  "Netlify",
  "CI/CD Pipelines",
  "GitHub Actions",
];

const techCategories = [
  {
    title: "Languages & Frontend",
    subtitle: "Foundational technologies for crafting polished interfaces and robust client experiences.",
    items: languagesAndFrontend,
    accent: "from-cyan-500/20 to-blue-500/10",
    badgeAccent: "from-cyan-400/30 via-cyan-400/10 to-transparent"
  },
  {
    title: "Backend & Tools",
    subtitle: "Server-side tooling and workflows that keep projects scalable, secure, and maintainable.",
    items: backendAndTools,
    accent: "from-violet-500/20 to-fuchsia-500/10",
    badgeAccent: "from-fuchsia-400/25 via-purple-400/10 to-transparent"
  },
  {
    title: "AI Stack",
    subtitle: "Frameworks, vector databases, and orchestration tools for building intelligent systems.",
    items: aiStack,
    accent: "from-amber-500/20 to-rose-500/10",
    badgeAccent: "from-amber-300/30 via-rose-300/10 to-transparent"
  },
  {
    title: "DevOps & Cloud",
    subtitle: "Infrastructure, orchestration, and delivery tooling powering reliable deployments at scale.",
    items: devOpsAndCloud,
    accent: "from-emerald-400/20 to-teal-500/10",
    badgeAccent: "from-emerald-300/25 via-teal-300/10 to-transparent"
  }
];

const SkillPill = ({ label, index, accent }) => (
  <motion.span
    initial={{ opacity: 0, y: 16, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.35, delay: index * 0.04 }}
    className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 bg-white/10 text-xs md:text-sm lg:text-base text-white/90 font-medium tracking-wide shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out`}
  >
    {label}
  </motion.span>
);

const PillGrid = ({ items, badgeAccent }) => (
  <div className="w-full flex flex-wrap gap-3 md:gap-4">
    {items.map((item, idx) => (
      <SkillPill key={item} label={item} index={idx} accent={badgeAccent} />
    ))}
  </div>
);

/* ---------- Main ---------- */
export default function Techstack() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="flex min-h-screen py-24 px-6 overflow-hidden"
    >
      <div className="relative  z-10 max-w-full mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sky-400 via-cyan-200 to-indigo-400 bg-clip-text text-transparent"
          >
            Tech Stack & Ecosystem
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-200/80">
            A curated blend of languages, frameworks, and AI-first tooling I rely on to ship resilient products quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {techCategories.map(({ title, subtitle, items, accent, badgeAccent }, categoryIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.65)] px-6 py-10 md:px-10 will-change-transform`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-50`} />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-sm">
                    {title}
                  </h3>
                  <p className="text-slate-100/70 text-sm md:text-base max-w-3xl">
                    {subtitle}
                  </p>
                </div>

                <PillGrid items={items} badgeAccent={badgeAccent} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}