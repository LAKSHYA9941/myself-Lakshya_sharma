"use client";

import "./globals.css";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Techstack from "./pages/Techstack";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";
import useGSAPFillHover from "./Hooks/useGSAPFillHover";

export default function Page() {
  useGSAPFillHover();

  return (
    <>
      <CursorGlow />
      <main className="relative min-h-screen bg-base-bg">
        <Navbar />
        <LandingPage />

        <section
          id="about"
          className="py-[var(--spacing-section)]"
        >
          <About />
        </section>

        <section
          id="projects"
          className="py-[var(--spacing-section)]"
        >
          <Projects />
        </section>

        <section
          id="techstack"
          className="flex items-center py-[var(--spacing-section)]"
        >
          <Techstack />
        </section>

        <Contacts />
      </main>
    </>
  );
}
