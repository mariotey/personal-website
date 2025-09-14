"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Section from "../ui/Section";
import Card from "../ui/Card";
import Divider from "../ui/Divider";

import projectsData from "../../data/projects";

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Adjust page size based on screen width
  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 640) setPageSize(2); // mobile
      else setPageSize(3); // larger screens
    };
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const totalPages = Math.ceil(projectsData.length / pageSize);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset interval whenever currentPage changes or hover state changes
  useEffect(() => {
    if (isHovering || isInteracting) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 7000);

    return () => clearInterval(interval);
  }, [isHovering, isInteracting, totalPages]);

  if (!mounted) return null;

  const pages = Array.from({ length: totalPages }, (_, pageIndex) =>
    projectsData.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
  );

  const prevPage = () =>
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setIsInteracting(true); // pause auto-swipe
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    const dy = touchStartY - e.changedTouches[0].clientY;
    const threshold = 50;

    // Only swipe if horizontal movement exceeds threshold
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      if (dx > 0) nextPage();
      else prevPage();
      setIsInteracting(true); // only block auto-swipe
    } else {
      setIsInteracting(false); // allow tap/click
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Section title="Projects">
          <div className="relative flex items-center w-full">

            {/* Left button */}
            <div className="w-12 flex-shrink-0 flex justify-center">
              {
                (!isTouchDevice && isHovering) || isTouchDevice ? (
                  <button
                    onClick={prevPage}
                    className="bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 transition z-20"
                  >
                    ◀
                  </button>
                ): null
              }
            </div>

            {/* Carousel */}
            <div
              className="flex-1 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {pages.map((projectsOnPage, pageIdx) => (
                  <div
                    key={pageIdx}
                    className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 pb-4"
                  >
                    {projectsOnPage.map((project) => (
                      <Link
                        key={project.name}
                        href={`/project/${project.project_name}`}
                      >
                        <Card className="text-left border-gray-300 hover:bg-gray-100 transition-shadow hover:shadow-lg cursor-pointer h-72 flex flex-col">
                          <div className="group flex flex-col h-full">
                            <div className="w-full h-40 mb-4 bg-gray-200 rounded overflow-hidden flex items-center justify-center relative">
                              <Image
                                src={project.thumbnail_url || "/images/NoImageIcon.png"}
                                alt={`${project.name} thumbnail`}
                                fill
                                className="object-contain"
                                onError={(e) => {
                                  // fallback to default image
                                  (e.target as HTMLImageElement).src = "/images/NoImageIcon.png";
                                }}
                              />
                            </div>
                            <h4 className="text-l font-semibold mb-2 text-gray-900 text-center line-clamp-2 group-hover:text-blue-700">
                              {project.name}
                            </h4>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right button */}
            <div className="w-12 flex-shrink-0 flex justify-center">
              {
                (!isTouchDevice && isHovering) || isTouchDevice ? (
                  <button
                    onClick={nextPage}
                    className="bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 transition z-20"
                  >
                    ▶
                  </button>
                ): null
              }
            </div>

          </div>

          {/* Page indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === currentPage ? "bg-gray-900 w-4" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </Section>
      </div>

      <Divider />
    </>
  );
}
