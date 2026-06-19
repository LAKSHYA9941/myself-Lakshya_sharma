"use client";
import { motion, useReducedMotion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const featuredProject = {
  name: "At Facility",
  tagline: "Outstation Cab Booking App",
  description:
    "End-to-end cab hailing platform for India. Job-board dispatch model — upfront Razorpay payment locks the booking before drivers see it, eliminating cancellation fraud. Mappls routing, MSG91 notifications, HMAC-validated webhooks, Railway CI/CD. Turborepo monorepo.",
  tags: [
    "React Native",
    "Fastify",
    "PostgreSQL",
    "Redis",
    "Razorpay",
    "Mappls API",
  ],
  status: "MVP Live",
  live: null,
  repo: null,
};

const projects = [
  {
    name: "ChaiCode RAG Assistant",
    description:
      "Course-aware AI tutor built on LangChain + Qdrant vector DB. Splits course content into chunks, embeds via OpenAI, retrieves top-K context at query time. Multi-model support — Gemini + OpenAI switchable mid-session. Next.js 14, MongoDB, JWT + Google OAuth.",
    tags: ["TypeScript", "LangChain", "Qdrant", "Next.js", "MongoDB"],
    image:
      "https://res.cloudinary.com/cloud4lakshya/image/upload/v1757795610/Screenshot_98_bfaeaw.png",
    live: null,
    repo: null,
  },
  {
    name: "PersonaAI",
    description:
      "Multi-persona AI chat platform. Cyberpunk dark-neon UI with Radix UI and GSAP animations. PostgreSQL + Drizzle ORM backend, OpenRouter for multi-model responses, Docker containerized, deployed on Render.",
    tags: ["React", "PostgreSQL", "Drizzle ORM", "OpenRouter", "Docker"],
    image:
      "https://res.cloudinary.com/cloud4lakshya/image/upload/v1757794076/Screenshot_94_ya1nzh.png",
    live: "https://personaai-1tda.onrender.com",
    repo: null,
  },
  {
    name: "Note-Maker",
    description:
      "MERN stack notes app with JWT auth, bcrypt hashing, pin/search/filter, and a glassmorphism dark UI. Clean REST API with reusable React hooks.",
    tags: ["React", "Express", "MongoDB", "Tailwind CSS"],
    image:
      "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839921/notemakeimg_gjcou7.jpg",
    live: "https://mern-notemaker.onrender.com",
    repo: "https://github.com/LAKSHYA9941/MERN-Notemaker",
  },
  {
    name: "ThumbnailAI",
    description:
      "Describe a YouTube thumbnail in plain English — OpenRouter enhances the prompt, Gemini generates the image. Per-user history, Google OAuth, deployed on Vercel + Render.",
    tags: ["React", "OpenRouter", "Gemini", "Google OAuth"],
    image:
      "https://res.cloudinary.com/cloud4lakshya/image/upload/v1757794232/Screenshot_95_wv8jcd.png",
    live: "https://thumnail-ai.vercel.app",
    repo: null,
  },
  {
    name: "Tokenizer",
    description:
      "Custom tokenizer with vocabulary builder and embedding visualizer. Built as Assignment 1 of ChaiCode's GenAI cohort — shows how text embedding models chunk and represent language.",
    tags: ["JavaScript", "React"],
    image:
      "https://res.cloudinary.com/cloud4lakshya/image/upload/v1757793070/Screenshot_93_okxrqq.png",
    live: "https://tokanization.netlify.app",
    repo: null,
  },
  {
    name: "Ek-Cup-Chai",
    description:
      "Patron-powered creator support platform. Google Auth, Firestore real-time DB, QR-code tipping, patron badges, Firebase Storage for image uploads.",
    tags: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
    image:
      "https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839921/chaiproject_bnylai.png",
    live: null,
    repo: null,
    wip: true,
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMATIONS                                                         */
/* ------------------------------------------------------------------ */

const cardReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  FEATURED CARD                                                      */
/* ------------------------------------------------------------------ */

function FeaturedCard({ project }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduce ? {} : cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="glass-card neon-shadow relative overflow-hidden p-8 md:p-12"
    >
      {/* Top row: status + type */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="status-badge live">
          <span className="pulse-dot" />
          {project.status}
        </span>
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          Featured
        </span>
      </div>

      {/* Title */}
      <h3
        className="mb-2 text-3xl md:text-4xl font-bold"
        style={{ color: "var(--text-highlight)", letterSpacing: "var(--letter-tight)" }}
      >
        {project.name}
      </h3>
      <p
        className="mb-6 text-lg font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        {project.tagline}
      </p>

      {/* Description */}
      <p
        className="mb-8 text-base md:text-lg leading-relaxed"
        style={{ color: "var(--text-primary)", maxWidth: "680px", lineHeight: "var(--line-height-body)" }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span key={tag} className="tech-pill">
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <span className="status-badge wip">In Progress</span>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <FiGithub size={16} />
            Source
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT CARD                                                       */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, index }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduce ? {} : cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title + WIP */}
        <div className="mb-3 flex items-center gap-3">
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--text-highlight)" }}
          >
            {project.name}
          </h3>
          {project.wip && <span className="status-badge wip">WIP</span>}
        </div>

        {/* Description */}
        <p
          className="mb-4 flex-1 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--text-primary)" }}
            >
              <FiExternalLink size={14} />
              Live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              <FiGithub size={14} />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN                                                               */
/* ------------------------------------------------------------------ */

export default function Projects() {
  return (
    <div
      className="w-full px-6"
      style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
    >
      {/* Section Label */}
      <p className="section-label">// 02 Projects</p>

      {/* Featured */}
      <div className="mb-12">
        <FeaturedCard project={featuredProject} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <ProjectCard key={p.name} project={p} index={idx} />
        ))}
      </div>
    </div>
  );
}