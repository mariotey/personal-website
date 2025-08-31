"use client"; // required for hooks

import { useRouter } from "next/navigation";
import educationData from "../../../data/education.json";

interface Props {
  params: { cert: string };
}

export default function EducationDetail({ params }: Props) {
  const { cert } = params;
  const router = useRouter();

  // Find the education item by cert
  const edu = educationData.find((item) => item.cert === cert);

  if (!edu) {
    return <div className="text-center mt-20 text-gray-700 text-xl">Education not found.</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen py-16">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Back button using router.back() */}
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 underline mb-4 inline-block"
        >
          &larr; Back to Home
        </button>

        {/* Education content */}
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{edu.name}</h1>
        <p className="text-xl text-gray-700 mb-6">{edu.institution}</p>
        <p className="text-gray-600 leading-relaxed">{edu.description}</p>
      </div>
    </div>
  );
}
