"use client";

import React, { useEffect, useState} from "react";
import Link from "next/link";

import Section from "../ui/Section";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Divider from "../ui/Divider";

import projectsData from "../../data/projects.json";

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const pageSize = 3;
  const totalPages = Math.ceil(projectsData.length / pageSize);

  // Mark component as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-swipe effect every 5s, paused if hovering
  useEffect(() => {
    if (isHovering) return; // skip if hovering

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 7000);

    return () => clearInterval(interval);
  }, [totalPages, isHovering]);

  if (!mounted) return null;

  // Prepare pages
  const pages = Array.from({ length: totalPages }, (_, pageIndex) =>
    projectsData.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
  );

  // Handlers for manual navigation
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Section title="Projects">
          <div className="relative flex items-center w-full">
            {/* Left space for button */}
            <div className="w-12 flex-shrink-0 flex justify-center">
              {isHovering && (
                <button
                  onClick={prevPage}
                  className="bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 transition z-20"
                >
                  &#8592;
                </button>
              )}
            </div>

            {/* Carousel */}
            <div className="flex-1 overflow-hidden ">
              <div
                className="flex transition-transform duration-700 ease-in-out "
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {pages.map((projectsOnPage, pageIdx) => (
                  <div
                    key={pageIdx}
                    className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 pb-4"
                  >
                    {projectsOnPage.map((project) => (
                      <Link key={project.name} href={`/project/${project.project_name}`}>
                        <Card className="text-left hover:bg-gray-100 transition-shadow cursor-pointer h-72 flex flex-col">
                          <div className="w-full h-40 mb-4 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                            <img
                              src={project.thumbnail_url || "/images/NoImageIcon.png"}
                              alt={`${project.name} thumbnail`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/images/NoImageIcon.png";
                              }}
                            />
                          </div>

                          <h4 className="text-l font-semibold mb-2 text-gray-900 text-center line-clamp-2">
                            {project.name}
                          </h4>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right space for button */}
            <div className="w-12 flex-shrink-0 flex justify-center">
              {isHovering && (
                <button
                  onClick={nextPage}
                  className="bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 transition z-20"
                >
                  &#8594;
                </button>
              )}
            </div>
          </div>

          {/* Page Indicators */}
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
