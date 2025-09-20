import Section from "../ui/Section";
import Card from "../ui/Card";
import Divider from "../ui/Divider";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import certificateData from "../../data/certificate";

export default function Certification() {
    return (
        <>
            <Section title="Certifications">
                <Card className="divide-y divide-gray-200">
                    {certificateData.map((certificate) => (
                        <Link
                            key={certificate.title}
                            href={certificate.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg transition-colors cursor-pointer group-hover:bg-gray-100">

                                <div className="text-left">
                                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                                        {certificate.title}
                                    </h4>
                                    <h5 className="text-gray-600 text-sm sm:text-base">
                                        Issued {certificate.issued_by}
                                    </h5>
                                </div>

                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <span className="text-sm text-gray-500 font-medium">
                                        {certificate.issued_date}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </Card>
            </Section>

            {/* Divider */}
            <Divider />
        </>
    );
}
