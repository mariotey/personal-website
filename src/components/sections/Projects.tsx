import Divider from "../ui/Divider";
import projectsData from "../../data/projects.json";

export default function Projects() {
  return (
    <>
        <section className="mt-20 mb-20 max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0f1f4f' }}>
                Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-600">
                {projectsData.map((project) => (
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
    </>
  );
}
