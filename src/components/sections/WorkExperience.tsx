import Card from "../ui/Card";
import Divider from "../ui/Divider";
import workExperienceData from "../../data/workExperience.json";

export default function WorkExperience() {
  return (
    <>
        <section className="mt-12 sm:mt-20 mb-12 sm:mb-20 px-4 sm:px-0 max-w-4xl mx-auto">
            <h3
                className="text-xl sm:text-2xl font-semibold mb-6 text-center"
                style={{ color: "#0f1f4f" }}
            >
                Work Experience
            </h3>
            <div className="space-y-6">
                {workExperienceData.map((exp) => (
                <Card key={exp.role}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                            {/* Role */}
                            <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{exp.role}</h4>
                            {/* Company */}
                            <h5 className="text-gray-700 font-medium">{exp.company}</h5>
                        </div>
                        {/* Employment Years */}
                        <span className="text-sm text-gray-800 font-medium mt-2 sm:mt-0">{exp.year}</span>
                    </div>
                    {/* Description */}
                    <ul className="list-disc list-outside ml-6 text-gray-700 text-sm mt-3 space-y-2 text-justify">
                        {exp.description.map((point: string, idx: number) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                </Card>
                ))}
            </div>
        </section>

        {/* Divider */}
        <Divider/>
    </>
  );
}
