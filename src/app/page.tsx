"use client";

import { useEffect } from "react";

import Hero from "../components/main/Hero";

import Education from "../components/main/Education";
import WorkExperience from "../components/main/WorkExperience";
import Project from "../components/main/Projects";
import Skills from "../components/main/Skills";
import Contact from "../components/main/Contact";

import Footer from "../components/ui/Footer";

export default function Home() {
  useEffect(() => {
    const scrollPos = sessionStorage.getItem("homeScroll");
    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos, 10));
      sessionStorage.removeItem("homeScroll"); // optional, clean up
    }
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">

        <div className="px-4 md:px-12 lg:px-24">

          {/* Hero Section */}
          <Hero/>

          {/* Work Experience Section */}
          <WorkExperience/>

          {/* Education Section */}
          <Education/>

          {/* Projects Section */}
          <Project/>

          {/* Skills Section */}
          <Skills/>

          {/* Contact Section */}
          <Contact/>
        </div>

        <div>
          {/* Footer */}
          <Footer />
        </div>

    </div>
  );
}
