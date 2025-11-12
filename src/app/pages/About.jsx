"use client";
import React from 'react';
import Certis from '../components/Certis';
import Education from '../components/Education';
import Image from 'next/image';

export default function About() {
  const sentences = [
    'I am a Full Stack Developer with a passion for building dynamic and responsive web applications.',
    'My expertise lies in JavaScript, React.js, Node.js, and MongoDB, and I am proficient in using React Native for cross-platform mobile app development. I am also familiar with popular libraries and frameworks such as Redux, React Router, and Axios.',
    'I have experience in building web applications using various technologies, including HTML, CSS, and JavaScript. I am skilled in creating responsive and user-friendly interfaces that meet the needs of my clients.',
    'I am a self-motivated and hardworking individual who thrives in a dynamic and fast-paced environment. I am always looking for new opportunities to expand my skills and knowledge in web development.',
    'I enjoy working on challenging projects that require innovative problem-solving and collaboration. My goal is to continuously learn and grow in the field of web development.',
  ];

  return (
    <section id="about" className="text-white w-full px-4 sm:px-6 z-10">
      <div className="w-full max-w-7xl mx-auto space-y-16">

        {/* Heading */}
        <div className="text-center space-y-3 pb-4">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/80">Who I Am</p>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-white/70">
            Building meaningful products with equal love for clean UI, resilient systems, and collaborative problem solving.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Text block */}
          <div className="space-y-5 text-slate-200 leading-relaxed">
            {sentences.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </div>

          {/* Image – hidden on small screens */}
          <div className="hidden md:flex justify-center">
            <Image
              src="/about.svg"
              alt="about"
              width={400}
              height={400}
              className="w-full h-auto max-w-sm drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}