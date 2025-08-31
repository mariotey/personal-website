"use client";

import React from "react";
import Link from "next/link";
import Divider from "../ui/Divider";
import projectsData from "../../data/projects.json";

export default function Projects() {
  const [showAll, setShowAll] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Mark component as mounted on client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Only show top 5 projects unless user clicks "See All"
  const projectsToRender = showAll ? projectsData : projectsData.slice(0, 5);

  if (!mounted) {
    return null; // Or you can render a loading placeholder here
  }

  return (
    <>
      <section className="mt-20 mb-20 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6" style={{ color: "#0f1f4f" }}>
          Projects
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-600">
          {projectsToRender.map((project) => (
            <div
              key={project.name}
              className="p-6 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md text-left transition-shadow"
            >
              <h4 className="text-l font-semibold mb-2 text-gray-900">
                {project.name}
              </h4>
              <p className="text-gray-700 mb-4">{project.short_description}</p>
              {project.project_name && (
                <Link href={`/project/${project.project_name}`}>
                  <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                    View more...
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {projectsData.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer mt-6 text-blue-600 hover:text-blue-700 underline font-medium"
          >
            {showAll ? "Collapse Projects" : "See All Projects"}
          </button>
        )}
      </section>

      <Divider />
    </>
  );
}
