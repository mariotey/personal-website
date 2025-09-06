"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import PageCard from "../../../components/ui/PageCard";

import educationData from "../../../data/education.json";

interface EducationItem {
  cert: string;
  name: string;
  institution: string;
  instituition_image: string;
  description?: string[];
  awards?: string[];
  co_curricular?: string[];
  modules_taken?: string[];
  start_date?: string;
  end_date?: string;
}

interface Props {
  params: Promise<{ cert: string }>;
}

export default function EducationDetail({ params }: Props) {
  const { cert } = React.use(params);
  const router = useRouter();

  const typedEducationData = educationData as EducationItem[];
  const edu = typedEducationData.find((item) => item.cert === cert);

  if (!edu) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600 text-lg">Education not found.</div>
      </div>
    );
  }

  return (
    <PageCard>
      {/* Header*/}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Text container */}
        <div className="mb-4 sm:mb-0 sm:mr-6">
          {/* Education Name */}
          <h1 className="text-3xl sm:text-3xl font-bold text-gray-900 mb-1">{edu.name}</h1>
          {/* Institution Name */}
          <p className="text-lg text-gray-700 mb-1">{edu.institution}</p>
          {/* Education Period */}
          {(edu.start_date || edu.end_date) && (
            <p className="text-sm text-gray-500">
              {edu.start_date} – {edu.end_date || "Present"}
            </p>
          )}
        </div>

        {/* Institution Icon */}
        {edu.instituition_image && (
          <div className="flex-shrink-0">
            <Image
              src={edu.instituition_image}
              alt={edu.institution}
              width={180}
              height={80}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        {/* Highlights / Description */}
        {edu.description?.length ? (
          <div className="pt-4 first:pt-0">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3">Highlights</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {edu.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Co-Curricular Activities */}
        {edu.co_curricular?.length ? (
          <div className="pt-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3"> Co-Curricular Activities </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {edu.co_curricular.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Awards */}
        {edu.awards?.length ? (
          <div className="pt-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3">Awards</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {edu.awards.map((award, idx) => (
                <li key={idx}>{award}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Modules Taken */}
        {edu.modules_taken?.length ? (
          <div className="pt-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3">Modules Taken</h2>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {edu.modules_taken.map((module, idx) => (
                <li key={idx}>{module}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </PageCard>
  );
}