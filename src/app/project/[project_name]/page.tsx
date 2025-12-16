"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Button from "../../../components/ui/Button";
import PageCard from "../../../components/ui/PageCard";
import { useLoading } from "@/context/LoadingContext";

import projectData from "../../../data/projects";

interface ProjectItem {
  name: string;
  project_name: string;
  thumbnail_url: string;
  short_description: string;
  long_description: string[];
  media?: { src: string; caption?: string }[];
  link?: { src: string; icon?: string; link_type?: string; }[];
  skills?: string[];
}

interface Props {
  params: Promise<{ project_name: string }>;
}

export default function ProjectDetail({ params }: Props) {
  const { project_name } = React.use(params);
  const router = useRouter();
  const { stopLoading } = useLoading();

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loadedCount, setLoadedCount] = React.useState(0);

  const typedProjectData = projectData as ProjectItem[];
  const proj = typedProjectData.find((p) => p.project_name === project_name);

  // Calculate total elements that need loading
  const totalElementsToLoad = React.useMemo(() => {
    if (!proj) return 0;

    let count = 0;

    // Count media items (excluding Google Drive iframes - they load instantly)
    if (proj.media) {
      count += proj.media.filter(item =>
        !item.src.includes("drive.google.com")
      ).length;
    }

    // Count link icons
    if (proj.link) {
      count += proj.link.filter(item => item.icon).length;
    }

    return count;
  }, [proj]);

  // Preload ALL images on mount
  React.useEffect(() => {
    if (!proj) return;

    // If nothing to load, stop immediately
    if (totalElementsToLoad === 0) {
      stopLoading();
      return;
    }

    // Preload all media images
    if (proj.media) {
      proj.media.forEach((mediaItem) => {
        // Skip iframes (Google Drive) - they don't need preloading
        if (mediaItem.src.includes("drive.google.com")) {
          return;
        }

        // Only run in browser
        if (typeof window !== 'undefined') {
          const img = new window.Image();
          img.src = mediaItem.src;
          img.onload = () => setLoadedCount(prev => prev + 1);
          img.onerror = () => setLoadedCount(prev => prev + 1);
        }
      });
    }

    // Preload all link icons
    if (proj.link) {
      proj.link.forEach((linkItem) => {
        if (linkItem.icon && typeof window !== 'undefined') {
          const img = new window.Image();
          img.src = linkItem.icon;
          img.onload = () => setLoadedCount(prev => prev + 1);
          img.onerror = () => setLoadedCount(prev => prev + 1);
        }
      });
    }
  }, [proj, totalElementsToLoad, stopLoading]);

  // Timeout fallback (3 seconds)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Loading timeout - forcing stop");
      stopLoading();
    }, 3000);

    return () => clearTimeout(timer);
  }, [stopLoading]);

  // Stop loading when everything is loaded
  React.useEffect(() => {
    if (totalElementsToLoad > 0 && loadedCount >= totalElementsToLoad) {
      console.log(`All ${totalElementsToLoad} elements loaded`);
      stopLoading();
    }
  }, [loadedCount, totalElementsToLoad, stopLoading]);

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
        <div className="mb-8">

          {/* Media + Controls */}
          <div className="flex items-center justify-between">

            {/* Left button */}
            {proj.media.length > 1 && (
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? proj.media!.length - 1 : prev - 1
                  )
                }
                className="bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
              >
                ◀
              </button>
            )}

            {/* Media */}
            <div className="w-full h-64 sm:h-96 bg-gray-100 rounded-lg overflow-hidden relative mx-2">
              {proj.media[currentIndex].src.includes("drive.google.com") ? (
                <iframe
                  src={proj.media[currentIndex].src}
                  className="w-full h-full object-cover"
                  allow="autoplay"
                  title={`Media ${currentIndex + 1}`}
                />
              ) : (
                <Image
                  src={proj.media[currentIndex].src}
                  alt={`Media ${currentIndex + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>

            {/* Right button */}
            {proj.media.length > 1 && (
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === proj.media!.length - 1 ? 0 : prev + 1
                  )
                }
                className="bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
              >
                ▶
              </button>
            )}

          </div>

          {/* Caption (centered under media) */}
          <div className="mt-3 mx-auto max-w-[600px]">
            <p className="text-gray-600 text-sm text-center italic min-h-[2.5rem]">
              {proj.media[currentIndex].caption || ""}
            </p>
          </div>

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
