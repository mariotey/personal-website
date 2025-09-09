import Hero from "../components/main/Hero";
import Education from "../components/main/Education";
import WorkExperience from "../components/main/WorkExperience";
import Project from "../components/main/Projects";
import Skills from "../components/main/Skills";

import Footer from "../components/ui/Footer";

export default function Home() {
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

        </div>

        <div>
          {/* Footer */}
          <Footer />
        </div>

    </div>
  );
}
