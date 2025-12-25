"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const sentences = [
    "I am a Full Stack Developer who enjoys building clean, scalable, and high-performing digital products. I love taking ideas from concept to launch and transforming them into real-world applications that users can rely on.",
    "My skill set includes JavaScript, React.js, Node.js, and MongoDB, and I am also experienced in building cross-platform mobile applications using React Native. I have worked with popular tools and libraries such as Redux, Axios, React Query, and Tailwind CSS to create flexible and maintainable systems.",
    "I focus strongly on writing maintainable and readable code while ensuring smooth user experiences and intuitive interfaces. I believe that great software comes from a balance of strong engineering and thoughtful design.",
  ];

  return (
    <div className="text-white w-full px-4  z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto p-8 md:p-16 relative overflow-hidden"
      >
        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center space-y-3 mb-12 md:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/80">
              Who I Am
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-rose-400 via-orange-300 to-amber-400 bg-clip-text text-transparent leading-tight">
              About Me
            </h2>
          </motion.div>

          {/* Layout: Image first on mobile, Text first on desktop */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 lg:gap-16">

            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6 text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed md:w-3/5"
            >
              {sentences.map((s, i) => (
                <p key={i} className="relative pl-4 border-l-2 border-orange-400/30 hover:border-orange-400 transition-colors duration-300">
                  {s}
                </p>
              ))}
            </motion.div>

            {/* Image block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="md:w-2/5 flex justify-center relative group"
            >
              {/* Decorative background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-3xl -z-10 group-hover:scale-110 transition-transform duration-500" />

              <div className="relative p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden aspect-square w-full max-w-[280px] md:max-w-full">
                <Image
                  src="/about.png"
                  alt="about"
                  width={400}
                  height={400}
                  className="rounded-xl object-cover object-center md:grayscale md:hover:grayscale-0 transition-all duration-700 w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
