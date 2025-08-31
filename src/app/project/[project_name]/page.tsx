"use client";

import React from "react";
import { useRouter } from "next/navigation";
import projectData from "../../../data/projects.json";

interface ProjectItem {
  name: string;
  project_name: string;
  short_description: string;
  long_description: string;
  media?: string[];
  github_link: string;
}

interface Props {
  params: { project_name: string };
}

export default function ProjectDetail({ params }: Props) {
  const { project_name } = params;
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const typedProjectData = projectData as ProjectItem[];
  const proj = typedProjectData.find((p) => p.project_name === project_name);

  if (!proj) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="text-gray-600 text-lg">Project not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12">
        {/* Back button */}
        <button
          onClick={() =>
            window.history.length > 1 ? router.back() : router.push("/")
          }
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mb-6"
        >
          ← Back
        </button>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {proj.name}
        </h1>
        <p className="text-lg text-gray-700 mb-6">{proj.short_description}</p>

        {/* Media Gallery */}
        {proj.media?.length && (
          <div className="mb-8 relative">
            <div className="w-full h-64 sm:h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {proj.media[currentIndex].includes("drive.google.com") ? (
                <iframe
                  src={proj.media[currentIndex]}
                  className="w-full h-full object-cover"
                  allow="autoplay"
                  title={`Media ${currentIndex + 1}`}
                />
              ) : (
                <img
                  src={proj.media[currentIndex]}
                  alt={`Media ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Navigation buttons */}
            {proj.media.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? proj.media!.length - 1 : prev - 1
                    )
                  }
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                >
                  ◀
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === proj.media!.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                >
                  ▶
                </button>
              </>
            )}
          </div>
        )}

        {/* Description */}
        {proj.long_description && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{proj.long_description}</p>
          </div>
        )}

        {/* GitHub Link */}
        {proj.github_link !== "" && (
          <a
            href={proj.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            GitHub Repository
          </a>
        )}
      </div>
    </div>
  );
}
