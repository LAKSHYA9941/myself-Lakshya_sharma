"use client";

import "./globals.css";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Techstack from "./pages/Techstack";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";

export default function Page() {
  return (
    <>
      <CursorGlow />
      <main
        className="relative"
        style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}
      >
        <Navbar />
        <LandingPage />

        <section
          id="about"
          className="flex items-center"
          style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
        >
          <About />
        </section>

        <section
          id="projects"
          style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
        >
          <Projects />
        </section>

        <section
          id="techstack"
          className="flex items-center"
          style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
        >
          <Techstack />
        </section>

        <Contacts />
      </main>
    </>
  );
}
