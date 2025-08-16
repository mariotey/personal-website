import Divider from "../ui/Divider";
import workExperienceData from "../../data/workExperience.json";

export default function WorkExperience() {
  return (
    <>
        <section className="mt-20 mb-20 max-w-4xl mx-auto">
            <h3
                className="text-2xl font-semibold mb-6 text-center"
                style={{ color: "#0f1f4f" }}
            >
                Work Experience
            </h3>
            <div className="space-y-6">
                {workExperienceData.map((exp) => (
                <div
                    key={exp.role}
                    className="p-6 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
                >
                    {/* First row: role + year */}
                    <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold text-gray-900">
                        {exp.role}
                    </h4>
                    <span className="text-gray-700 font-medium">{exp.year}</span>
                    </div>

                    {/* Company */}
                    <h5 className="text-gray-700 font-semibold mt-2 text-justify">
                    {exp.company}
                    </h5>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mt-3 text-justify">
                    {exp.description}
                    </p>
                </div>
                ))}
            </div>
        </section>

        {/* Divider */}
        <Divider/>
    </>
  );
}
