"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import './globals.css';
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Techstack from "./pages/Techstack";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import Skills from "./pages/Skills";
import Navbar from './components/Navbar';
import Aurora from './components/Aurora';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  useEffect(() => {
    // Defer non-critical animations to idle time
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

    idleCallback(() => {
      // Animate each section on enter/leave - optimized
      gsap.utils.toArray("section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
              fastScrollEnd: true
            },
          }
        );
      });

      // Optional: animate navbar background on scroll
      gsap.to("nav", {
        backgroundColor: "rgba(0,0,0,0.8)",
        duration: 0.3,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });
  }, []);

  return (
    <>
      <main className="relative bg-black">
        <Aurora
          colorStops={["#1e3a8a", "#2563eb", "#3b82f6"]}
          blend={0.4}
          amplitude={0.9}
          speed={0.4}
        />
        <Navbar />
        <LandingPage />

        <section id="about" data-theme="about" className="min-h-screen flex items-center">
          <About />
        </section>

        <section id="techstack" data-theme="tech" className="min-h-full flex items-center">
          <Techstack />
        </section>

        <section id="skills" data-theme="skills" className="min-h-full flex items-center">
          <Skills />
        </section>

        <section id="projects" data-theme="projects" className="min-h-screen">
          <Projects />
        </section>

        <Contacts />
      </main>
    </>
  );
}
