import Hero from "../components/sections/Hero";
import WorkExperience from "../components/sections/WorkExperience";
import Project from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";

import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      {
        <div>
          {/* Hero Section */}
          <Hero/>

          {/* Work Experience Section */}
          <WorkExperience/>

          {/* Skills Section */}
          <Skills/>

          {/* Projects Section */}
          <Project/>

          {/* Contact Section */}
          <Contact/>

          {/* Footer */}
          <Footer />
        </div>
      }
    </div>

  );
}
