"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import Section from "../ui/Section";
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
      <Section title="Education">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-600 max-w-4xl mx-auto">
          {Object.entries(groupedByInstitution).map(([institution, certs]) => (
            <Card
              key={institution}
              className="flex flex-col items-center"
            >
              {/* Institution Image */}
              {certs[0].instituition_image && (
                <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm relative">
                  <Image
                    src={certs[0].instituition_image}
                    alt={`${institution} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Education Certifications */}
              <div className="grid grid-cols-1 justify-items-center w-full max-w-xs">
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
      </Section>

      {/* Divider */}
      <Divider />
    </>
  );
}