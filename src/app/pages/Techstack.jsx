"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

/* ---------- data ---------- */
const categories = [
  {
    title: "Languages & Frontend",
    items: [
      "JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL",
      "React", "Next.js", "React Native", "Tailwind CSS", "Vite", "Redux",
    ],
  },
  {
    title: "Backend & Tools",
    items: [
      "Node.js", "Express", "Fastify", "MongoDB", "PostgreSQL", "Redis",
      "Firebase", "Drizzle ORM", "REST APIs", "Razorpay", "Git", "Postman",
    ],
  },
  {
    title: "AI Stack",
    items: [
      "Retrieval-Augmented Generation", "Generative AI", "AI Agents",
      "Agentic Workflows", "Model Context Protocol", "LangChain",
      "LangGraph", "Qdrant", "Mem0", "Neo4j", "OpenRouter",
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Docker", "Railway", "Vercel", "Netlify", "Render",
      "CI/CD Pipelines", "GitHub Actions", "Turborepo",
    ],
  },
  {
    title: "Mobile App Development",
    items: [
      "React Native", "Expo", "Platform APIs",
      "OTA Updates", "Navigation & Theming",
    ],
  },
];

/* ---------- animations ---------- */
const pillReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: i * 0.03,
      ease: "easeOut",
    },
  }),
};

const sectionReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ---------- components ---------- */
function CategoryBlock({ category, categoryIndex }) {
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Category title */}
      <h3 className="mb-5 text-lg font-semibold text-primary">
        {category.title}
      </h3>

      {/* Pills */}
      <div className="flex flex-wrap gap-2.5">
        {category.items.map((item, idx) => (
          <motion.span
            key={item}
            custom={idx}
            variants={pillReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="tech-pill cursor-pointer select-none"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- main ---------- */
export default function Techstack() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const radius = 180;
    const maxScale = 1.35;
    const dur = 0.35;

    const handleMouseMove = (e) => {
      const cards = stage.querySelectorAll(".tech-pill");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const d = Math.hypot(
          e.clientX - (r.left + r.width / 2),
          e.clientY - (r.top + r.height / 2)
        );
        const p = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, radius, 1, 0, d)
        );
        gsap.to(card, {
          scale: 1 + (maxScale - 1) * p,
          duration: dur,
          overwrite: "auto",
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      const cards = stage.querySelectorAll(".tech-pill");
      cards.forEach((card) => {
        gsap.to(card, {
          scale: 1,
          duration: 0.4,
          overwrite: "auto",
          ease: "power2.out",
        });
      });
    };

    stage.addEventListener("mousemove", handleMouseMove);
    stage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      stage.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6" ref={stageRef}>
      {/* Section Label */}
      <p className="section-label">// 03 Stack</p>

      <div className="glass-card p-8 md:p-12">
        <div className="space-y-10">
          {categories.map((cat, idx) => (
            <div key={cat.title}>
              <CategoryBlock category={cat} categoryIndex={idx} />
              {idx < categories.length - 1 && (
                <hr className="section-divider mt-10 border-t border-glass-border border-l-0 border-r-0 border-b-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}