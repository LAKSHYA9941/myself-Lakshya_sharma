"use client";
import React from "react";
import Image from "next/image";

export default function About() {
  const sentences = [
  "I am a Full Stack Developer who enjoys building clean, scalable, and high-performing digital products. I love taking ideas from concept to launch and transforming them into real-world applications that users can rely on.",
  
  "My skill set includes JavaScript, React.js, Node.js, and MongoDB, and I am also experienced in building cross-platform mobile applications using React Native. I have worked with popular tools and libraries such as Redux, Axios, React Query, and Tailwind CSS to create flexible and maintainable systems.",
  
  "I focus strongly on writing maintainable and readable code while ensuring smooth user experiences and intuitive interfaces. I believe that great software comes from a balance of strong engineering and thoughtful design.",
];


  return (
    <section id="about" className="text-white w-full px-4 sm:px-6 z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Heading */}
        <div className="text-center space-y-3 pb-4">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/80">
            Who I Am
          </p>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        {/* Horizontal layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Text block */}
          <div className="space-y-5 text-slate-200 leading-relaxed md:w-1/2">
            {sentences.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </div>

          {/* Image block */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/about.png"
              alt="about"
              width={350}
              height={300}
              className="drop-shadow-xl rounded-lg object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
