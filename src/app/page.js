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
    // Animate each section on enter/leave
    gsap.utils.toArray("section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",   // when section enters
            once: true          // trigger animation once instead of scrubbing
          },
        }
      );
    });

    // Optional: animate navbar background on scroll
    gsap.to("nav", {
      backgroundColor: "rgba(0,0,0,0.8)",
      duration: 0.5,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <main className="relative bg-black">
        <Aurora
          colorStops={["#08CB00", "#00CAFF", "#FF2DD1"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
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

        <section id="contact" data-theme="contact" className="min-h-full flex items-center">
          <Contacts />
        </section>
      </main>
    </>
  );
}
