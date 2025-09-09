"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Button from "../../../components/ui/Button";
import PageCard from "../../../components/ui/PageCard";

import projectData from "../../../data/projects.json";

interface ProjectItem {
  name: string;
  project_name: string;
  short_description: string;
  long_description: string[];
  media?: string[];
  link?: { src: string; icon?: string; link_type?: string; }[];
}

interface Props {
  params: Promise<{ project_name: string }>;
}

export default function ProjectDetail({ params }: Props) {
  const { project_name } = React.use(params);
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
    <PageCard>
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{proj.name}</h1>
      <p className="text-lg text-gray-700 mb-8">{proj.short_description}</p>

      {/* Media Gallery */}
      {proj.media && proj.media.length > 0 && (
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
              <div className="relative w-full h-full">
                <Image
                  src={proj.media[currentIndex]}
                  alt={`Media ${currentIndex + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
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

      {/* Links */}
      {proj.link && proj.link.length > 0 && (
        <div className="flex justify-center space-x-4 mt-6">
          {proj.link.map((item, idx) => (
            <Button
              key={idx}
              className="w-22.5 h-12.5 p-0 flex items-center justify-center rounded-full"
              onClick={() => router.push(item.src)}
            >
              <div className="relative w-6 h-6"> {/* adjust size as needed */}
                <Image
                  src={item.icon || "/images/NoImageIcon.png"}
                  alt="icon"
                  fill
                  className="object-contain"
                />
              </div>
            </Button>
          ))}
        </div>
      )}

      {/* Description */}
      {proj.long_description && proj.long_description.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
          <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
            {proj.long_description.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

    </PageCard>
  );
}
