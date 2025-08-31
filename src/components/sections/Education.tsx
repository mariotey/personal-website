import Divider from "../ui/Divider";
import educationData from "../../data/education.json";
import Link from "next/link";

export default function Education() {
    return (
        <>
            <section className="mt-20 mb-20 max-w-7xl mx-auto text-center">
                <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0f1f4f' }}>
                    Education
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 text-gray-600">
                    {educationData.map((edu) => (
                        <div
                            key={edu.name}
                            className="p-6 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md text-left transition-shadow"
                        >
                            <h4 className="text-xl font-semibold mb-2 text-gray-900">{edu.name}</h4>
                            <p className="text-gray-700 mb-4">{edu.institution}</p>
                            <Link href={`/education/${edu.cert}`}>
                                <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                                    View more...
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <Divider/>
        </>
    );
}
