import Footer from "../components/Footer";
import Divider from "../components/Divider";
import Image from "next/image";
import profilePic from "../images/profile.jpg";

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      {
        <div>
          {/* Hero Section */}
          <main className="flex flex-col items-center justify-center min-h-screen text-center p-10">
            <Image
              src={profilePic}
              alt="Ming Chuan Tey"
              width={150}
              height={150}
              className="rounded-full shadow-lg"
            />
            <h1 className="text-4xl font-bold mt-6" style={{ color: '#0f1f4f' }}>
              Ming Chuan <span className="underline">Tey</span>
            </h1>
            <h2 className="text-xl text-gray-600 mt-2">
              Data Scientist · Machine Learning Engineer
            </h2>
            <p className="mt-4 max-w-2xl text-gray-700">
              I build data-driven solutions in forecasting and MLOps. Passionate about transforming
              complex problems into scalable ML tools.
            </p>

            <div className="mt-6 space-x-4">
              <a
                href="/resume.pdf"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Try my GPT!
              </a>
              <a
                href="/contact"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </main>

          {/* Divider */}
          <Divider/>

          {/* Skills Section */}
          <section className="mt-20 mb-20 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0f1f4f' }}>
              Skills & Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-600">
              {[
                "Data Analytics",
                "Forecasting",
                "AI & Machine Learning",
                "Docker",
                "AWS",
                "Python & SQL"
              ].map((skill) => (
                <div
                  key={skill}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow text-gray-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <Divider/>

          {/* Projects Section */}
          <section className="mt-20 mb-20 max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0f1f4f' }}>
              Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-600">
              {[
                {
                  name: "Population Forecast Model",
                  description:
                    "Cohort-component model with housing constraints and migration optimization.",
                  link: "https://github.com/your-repo",
                },
                {
                  name: "Movie Recommendation System",
                  description: "Image-based recommender system with user interaction.",
                  link: "https://github.com/your-repo",
                },
                // Add more projects here
              ].map((project) => (
                <div
                  key={project.name}
                  className="p-6 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md text-left transition-shadow"
                >
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">{project.name}</h4>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    View on GitHub →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <Divider/>

          {/* Footer */}
          <Footer />
        </div>
      }
    </div>

  );
}
