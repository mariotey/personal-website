"use client";

import { useRouter } from "next/navigation";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Divider from "../ui/Divider";

import educationData from "../../data/education.json";

interface EducationItem {
  name: string;
  institution: string;
  instituition_image: string,
  cert: string;
  start_date: string;
  end_date: string;
  description: string[];
  co_curricular: string[];
  awards: string[];
  modules_taken: string[];
}

export default function Education() {
  const router = useRouter();

  // Group by institution
  const groupedByInstitution: { [key: string]: EducationItem[] } = educationData.reduce(
    (acc: { [key: string]: EducationItem[] }, edu: EducationItem) => {
        if (!acc[edu.institution]) {
        acc[edu.institution] = [];
        }
        acc[edu.institution].push(edu);
        return acc;
    },
    {}
    );

  return (
    <>
      <section className="mt-20 mb-20 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6" style={{ color: "#0f1f4f" }}>
          Education
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-600">
          {Object.entries(groupedByInstitution).map(([institution, certs]) => (
            <Card
              key={institution}
              className="flex flex-col items-center"
            >
              {/* Institution Image */}
              {certs[0].instituition_image && (
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-sm">
                  <img
                    src={certs[0].instituition_image}
                    alt={`${institution} logo`}
                    className="max-w-full max-h-full"
                  />
                </div>
              )}

              {/* Education Certifications */}
              <div className="grid grid-cols-1 gap-3 justify-items-center w-full max-w-xs">
                {certs.map((cert) => (
                  <Button
                    key={cert.cert}
                    className={"w-full"}
                    onClick={() => router.push(`/education/${cert.cert}`)}
                  >
                    {cert.name}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Divider */}
      <Divider />
    </>
  );
}