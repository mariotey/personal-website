"use client";

import React from "react";
import { useRouter } from "next/navigation";
import educationData from "../../../data/education.json";

interface EducationItem {
  cert: string;
  name: string;
  institution: string;
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
    <div className="bg-gray-100 min-h-screen py-12 px-4">
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
          {edu.name}
        </h1>
        <p className="text-lg text-gray-700 mb-1">{edu.institution}</p>
        {(edu.start_date || edu.end_date) && (
          <p className="text-sm text-gray-500 mb-6">
            {edu.start_date} – {edu.end_date || "Present"}
          </p>
        )}

        {/* Highlights / Description */}
        {edu.description?.length ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Highlights
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {edu.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Co-Curricular Activities */}
        {edu.co_curricular?.length ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Co-Curricular Activities
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {edu.co_curricular.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Awards */}
        {edu.awards?.length ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Awards</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {edu.awards.map((award, idx) => (
                <li key={idx}>{award}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Modules Taken */}
        {edu.modules_taken?.length ? (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Modules Taken
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {edu.modules_taken.map((module, idx) => (
                <li key={idx}>{module}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
