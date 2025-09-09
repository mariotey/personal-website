import Section from "../ui/Section";
import Divider from "../ui/Divider";
import SkillPill from "../ui/SkillPill"

import skillsData from "../../data/skills";

export default function Skills() {
  return (
    <>
        <Section title="Skills & Tech Stack">
          <div className="flex flex-wrap gap-2">
            {skillsData.map((skill) => (
              <SkillPill key={skill.name} skillJson={skill} />
            ))}
          </div>
        </Section>

        {/* Divider */}
        <Divider/>
    </>
  );
}
