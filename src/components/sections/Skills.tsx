import Divider from "../ui/Divider";
import skillsData from "../../data/skills.json";

export default function Skills() {
  return (
    <>
        <section className="mt-20 mb-20 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0f1f4f' }}>
                Skills & Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-600">
                {skillsData.map((skill) => (
                <div
                    key={skill}
                    className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow text-gray-700"
                >
                    {skill}
                </div>
                ))}
            </div>
        </section>

        {/* Divider */}
        <Divider/>
    </>
  );
}
