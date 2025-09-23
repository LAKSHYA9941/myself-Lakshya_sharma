"use client";
import React from "react";

export default function Skills() {
  const stages = [
    {
      id: "frontend",
      title: "Frontend Foundations",
      emoji: "🎨",
      blurb:
        "Built solid UI fundamentals and ergonomics to ship fast, clean experiences.",
      points: [
        "HTML, CSS, JavaScript — the bedrock",
        "React, Next.js, Vite — modern SPA/SSR",
        "Tailwind CSS — utility-first styling",
        "State mgmt (Redux basics, hooks), forms, routing",
        "Accessibility, responsive design"
      ],
    },
    {
      id: "backend",
      title: "Backend Essentials",
      emoji: "🛠️",
      blurb:
        "Learned how to design, build and secure APIs and data models.",
      points: [
        "Node.js + Express — REST APIs",
        "MongoDB — schema design, indexing",
        "AuthN/AuthZ — JWT sessions, hashing",
        "API validation, error handling",
        "Basic deployment & logging"
      ],
    },
    {
      id: "fullstack",
      title: "Fullstack Integration",
      emoji: "🔗",
      blurb:
        "Closed the loop between UI and data with quality, tooling and DX.",
      points: [
        "End-to-end flows (auth → data → UI)",
        "Fetching, caching, optimistic updates",
        "Testing mindset, debugging workflows",
        "Basic CI/CD and environment configs",
        "Perf profiling and UX polish"
      ],
    },
    {
      id: "fullstack-ai",
      title: "Fullstack AI Developer",
      emoji: "🤖",
      blurb:
        "Brought intelligence into apps with safe, reliable agentic patterns.",
      points: [
        "RAG fundamentals (chunking, embeddings, retrieval)",
        "Agents & tool-use strategies",
        "Vector stores (Qdrant), graphs (Neo4j)",
        "LangChain / LangGraph building blocks",
        "Evaluation, tracing, prompt hygiene"
      ],
    },
    {
      id: "mobile",
      title: "Mobile & React Native",
      emoji: "📱",
      blurb:
        "Building cross-platform experiences with native-feel UX and performance.",
      points: [
        "React Native basics, navigation and theming",
        "Expo tooling and over-the-air updates",
        "Platform APIs (camera, storage) and permissions",
        "Performance profiling and bundle size control",
      ],
    },
    {
      id: "systems",
      title: "Systems & CS",
      emoji: "🧠",
      blurb:
        "Sharpening fundamentals to design resilient, efficient software.",
      points: [
        "Data structures & patterns in JS/TS",
        "HTTP, caching, rate limits",
        "Auth flows (JWT, sessions) and OWASP basics",
        "Readable, maintainable code practices",
      ],
    },
    {
      id: "ai-infra",
      title: "AI Infrastructure",
      emoji: "🧪",
      blurb:
        "Integrating and evaluating AI safely at scale.",
      points: [
        "Dataset curation and evaluation loops",
        "Tracing and prompt experiments",
        "Vector DBs (Qdrant), hybrid search , Graph DBs (Neo4j) , Memory layer mem0AI",
        "Guards, fallbacks, and cost controls",
      ],
    },
  ];

  // Major skill categories
  const majorSkills = [
    "Frontend Development",
    "Backend  Development ",
    "Fullstack Engineering",
    "Generative AI",
    "Agentic AI Systems"
  ];

  return (
    <div className="max-w-5xl mx-auto antialiased pt-4 w-full px-6 md:px-10 z-10">
        {/* Skills Summary at the top */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-white mb-6">My Skills</h2>
          <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
            A comprehensive overview of technologies and skills I work with daily
          </p>

          {/* Major Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {majorSkills.map((skill, index) => (
              <div
                key={skill}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600 rounded-xl p-8 text-center hover:from-slate-700/80 hover:to-slate-800/80 transition-all duration-300 hover:scale-105 hover:border-slate-500"
              >
                <span className="text-slate-100 font-bold text-xl">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline below */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">My Journey</h2>
          <p className="text-center text-slate-300 mb-3">
            How I grew from frontend → backend → fullstack → fullstack AI developer
          </p>
          <p className="text-center text-slate-400 mb-10 text-sm max-w-3xl mx-auto">
            I care about clean UI, honest performance, and shipping things that people actually use.
            Here's the path I took and what I'm focusing on next.
          </p>
        </div>

        {stages.map((s, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {s.emoji} {s.title}
            </h2>
            <p className="text-xl mb-4 font-semibold text-white">{s.title}</p>
            <div className="text-sm prose prose-sm dark:prose-invert text-slate-300">
              <p className="mb-2">{s.blurb}</p>
              <ul className="list-disc list-inside space-y-1">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}