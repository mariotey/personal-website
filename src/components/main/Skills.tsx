import Section from "../ui/Section";
import Card from "../ui/Card";
import Divider from "../ui/Divider";

import skillsData from "../../data/skills.json";

export default function Skills() {
  return (
    <>
        <Section title="Skills & Tech Stack">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-600">
                {skillsData.map((skill) => (
                <Card key={skill}>{skill}</Card>
                ))}
            </div>
        </Section>

        {/* Divider */}
        <Divider/>
    </>
  );
}
