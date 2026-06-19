"use client";
import { motion, useReducedMotion } from "framer-motion";

const paragraphs = [
  "I'm a Full Stack Developer based in Delhi who builds things end-to-end — from database schema to polished mobile UI.",
  "Right now I'm shipping At Facility, an outstation cab-booking app for India built on React Native, Fastify, PostgreSQL, Redis, and Razorpay. Job-board-style driver dispatch, upfront payments, live routing. MVP done.",
  "I care about clean architecture, real performance, and products that actually solve problems — not just look good in a Figma file.",
];

const education = "BCA from Maharaja Surajmal Institute \u00B7 8.1 CGPA \u00B7 2024";

const cardReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function About() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="w-full px-6" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
      {/* Section Label */}
      <p className="section-label">// 01 About</p>

      <motion.div
        variants={shouldReduce ? {} : cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="glass-card p-8 md:p-12 lg:p-16"
      >
        <div className="space-y-6" style={{ maxWidth: "720px" }}>
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className="text-base md:text-lg"
              style={{
                color: "var(--text-primary)",
                lineHeight: "var(--line-height-body)",
              }}
            >
              {text}
            </p>
          ))}

          <p
            className="text-sm pt-4"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              borderTop: "1px solid var(--border)",
              paddingTop: "1.5rem",
            }}
          >
            {education}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
