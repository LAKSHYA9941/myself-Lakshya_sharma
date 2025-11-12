"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiMongodb, SiExpress, SiReact, SiTailwindcss, SiFirebase, SiTypescript, SiJavascript } from 'react-icons/si';
import Image from 'next/image';

const projects = [
  {
    name: 'Note-Maker',
    tagline: 'Full-stack notes app with JWT auth, full CRUD and dark-mode glow.',
    live: 'https://mern-notemaker.onrender.com',
    repo: 'https://github.com/LAKSHYA9941/MERN-Notemaker',
    stack: [
      { icon: <SiReact className="text-[#61DAFB]" />, name: 'React + Vite' },
      { icon: <SiExpress className="text-white" />, name: 'Express' },
      { icon: <SiMongodb className="text-[#4DB33D]" />, name: 'MongoDB' },
      { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind CSS' },
    ],
    bullets: [
      'Secure JWT auth & bcrypt hashing',
      'Pin, search, filter notes in real-time',
      'Responsive glass-morphism UI with dark-mode glow',
      'Clean REST API & reusable React hooks',
    ],
    image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839921/notemakeimg_gjcou7.jpg',
  },
  {
    name: 'Ek-Cup-Chai',
    tagline: 'Patron-powered social platform for creators (WIP).',
    live: undefined,
    repo: undefined,
    stack: [
      { icon: <SiFirebase className="text-[#FFCA28] bg-[#fff0c4] border rounded-4xl drop-shadow-2xl " />, name: 'Firebase' },
      { icon: <SiReact className="text-[#61DAFB]" />, name: 'React 19' },
      { icon: <SiTypescript className="text-[#3178C6]" />, name: 'TypeScript' },
      { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind v4' },
    ],
    bullets: [
      'Google Auth + Firestore real-time DB',
      'QR-code tipping & patron badges',
      'Zustand state + motion page transitions',
      'Image uploads with Firebase Storage',
    ],
    image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839921/chaiproject_bnylai.png',
  },
  {
    name: 'Currency Converter',
    tagline: 'Real-time currency exchange in a sleek, responsive UI.',
    live: 'https://currency190.netlify.app',
    repo: 'https://github.com/LAKSHYA9941/Currency-Converter',
    stack: [
      { icon: <SiReact className="text-[#61DAFB]" />, name: 'React + Vite' },
      { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind CSS' },
    ],
    bullets: [
      'Fetches live exchange rates via trusted API',
      'Instant conversion while typing',
      'Supports 150+ global currencies',
      'Mobile-first responsive design',
    ],
    image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1754839922/currency_converter_mns6dg.png',
  },
  {
    name: 'Tokenizer',
    tagline: 'Self made Tokenizer with custom vocabulary and visualization.',
    live: 'https://tokanization.netlify.app',
    repo: undefined,
    stack: [
      { icon: <SiJavascript className="text-[#F7DF1E]" />, name: 'JavaScript' },
      { icon: <SiReact className="text-[#61DAFB]" />, name: 'React' },
    ],
    bullets: [
      'The first assignment of Genai Cohort organized by Chai-code',
      'Shows the working of text embedding models',
      'Visualizes tokenization and embeddings',
    ],
    image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1757793070/Screenshot_93_okxrqq.png',
  },
  {
    name: 'Persona AI',
    tagline: 'Multi-persona conversational assistant with memory and tools.',
    live: 'https://personaai-1tda.onrender.com',
    repo: undefined,
    stack: [
      { icon: <SiReact className="text-[#61DAFB]" />, name: 'React' },
      { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind CSS' },
    ],
    bullets: [
      'Created a multi-persona conversational assistant',
      'Persona of :- Hitesh sir , Piyush Sir , Myself',
      'Memory and prompt templates',
      'Tool usage and persona switching',
      'If not working(Key might be revoked)'
    ],
    image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1757794076/Screenshot_94_ya1nzh.png',
  },
  {
    name: 'Thumbnail AI',
    tagline: 'AI-powered YouTube thumbnail generator',
    live: 'https://thumnail-ai.vercel.app',
    repo: undefined,
    stack: [
      { icon: <SiReact className="text-[#61DAFB]" />, name: 'React' },
      { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind CSS' },
    ],
    bullets: [
      'Chained Voice agent Prompt generation for better results',
      'Prompt improvement feature',
      'Creates Thumbnails like a pro designer ',
      'Works like a charm for Beginner Youtubers',
      'If not working(Work in progress...)'
    ],
    image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1757794232/Screenshot_95_wv8jcd.png',
  },
  // {
  //   name: 'Site Cloner Tool',
  //   tagline: 'Browser-based site snapshotter and component extractor.',
  //   live: undefined,
  //   repo: 'https://github.com/LAKSHYA9941/site_cloner',
  //   stack: [
  //     { icon: <SiJavascript className="text-[#F7DF1E]" />, name: 'JavaScript' },
  //   ],
  //   bullets: [
  //     'Parses DOM into reusable component blocks',
  //     'Downloads assets and resolves dependencies',
  //     'One-click export of component library',
  //   ],
  //   image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1757794941/cloner_qbcnop.jpg',
  // },
  // {
  //   name: 'Browser Agent',
  //   tagline: 'Autonomous browser agent for structured tasks and scraping.',
  //   live: undefined,
  //   repo: undefined,
  //   stack: [
  //     { icon: <SiTypescript className="text-[#3178C6]" />, name: 'TypeScript' },
  //     { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind CSS' },
  //   ],
  //   bullets: [
  //     'Action planning and stateful execution',
  //     'Navigation, scraping, and form-filling',
  //     'Replayable trajectories and logs',
  //   ],
  //   image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1757795276/step-05-fillform_ksykjg.jpg',
  // },
  // {
  //   name: 'Simple RAG',
  //   tagline: 'Retrieval-Augmented Generation starter with vector store.',
  //   live: undefined,
  //   repo: undefined,
  //   stack: [
  //     { icon: <SiTypescript className="text-[#3178C6]" />, name: 'TypeScript' },
  //     { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind CSS' },
  //   ],
  //   bullets: [
  //     'Embeddings, chunking, and retrieval',
  //     'Citations with source highlighting',
  //     'Dataset upload and indexing UI',
  //   ],
  //   image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1757795499/Screenshot_96_e6exxi.png',
  // },
  {
    name: "RAG F.T. for Chaicode",
    tagline: "Fine-tuned RAG over a company's knowledge base.",
    live: undefined,
    repo: undefined,
    stack: [
      { icon: <SiTypescript className="text-[#3178C6]" />, name: 'TypeScript' },
      { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind CSS' },
    ],
    bullets: [
      'Domain-specific reranking and prompt calibration',
      'Admin panel for dataset management',
      'Dashboard for tracking metrics',
      'Sleek frontend with dark colors',
      'Qdrant DB for vector storage',    ],
    image: 'https://res.cloudinary.com/cloud4lakshya/image/upload/v1757795610/Screenshot_98_bfaeaw.png',
  },
];

/* ---------- pop-reveal card ---------- */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Card = ({ p, index }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="grid md:grid-cols-5 gap-6 items-center rounded-2xl p-3 hover:bg-white/5 transition-colors"
  >
    {/* IMAGE */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="md:col-span-2 rounded-xl overflow-hidden shadow-xl"
    >
      <Image
        src={p.image}
        alt={p.name}
        width={400}
        height={225}
        className="w-full h-auto aspect-video"
        loading="lazy"
      />
    </motion.div>

    {/* CONTENT */}
    <motion.div
      className="md:col-span-3 space-y-3"
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
      <p className="text-slate-300 text-sm">{p.tagline}</p>
      <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
        {p.bullets.map(b => <li key={b}>{b}</li>)}
      </ul>
      <div className="flex items-center gap-x-3 text-xl">
        {p.stack.map(s => (
          <span key={s.name} title={s.name} className="inline-block group bg-gradient-to-b from-stone-300/20 to-transparent p-1 rounded-lg shadow-md">
            {s.icon}
          </span>
        ))}
      </div>
      <div className="flex gap-x-4">
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:underline">
            <FiExternalLink /> Live
          </a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:underline">
            <FiGithub /> Source
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

/* ---------- main page ---------- */
const Projects = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-16">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-purple-200/80">
            Work & Craft
          </p>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Here are some projects I've built, from full-stack web apps to AI-powered tools.
            Each one taught me something new about shipping quality software.
          </p>
        </div>
        {projects.map((p, idx) => (
          <Card key={p.name} p={p} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default Projects;