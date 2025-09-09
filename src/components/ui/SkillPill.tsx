"use client";

import React from "react";

export interface Skill {
  name: string;
  color: string;
}

interface SkillPillProps {
  skillJson: Skill;       // single skill object
  className?: string;     // optional additional classes
}

function darkenColor(hex: string, amount: number = 20) {
  let col = hex.replace("#", "");
  if (col.length === 3) col = col.split("").map((c) => c + c).join("");
  const num = parseInt(col, 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}

export default function SkillPill({ skillJson, className = "" }: SkillPillProps) {
  const borderColor = darkenColor(skillJson.color, 30);

  return (
    <div
      className={`rounded-md text-white text-sm font-medium shadow-sm text-center m-1 w-full ${className}`}
      style={{ backgroundColor: skillJson.color, border: `2px solid ${borderColor}` }}
    >
      {skillJson.name}
    </div>
  );
}
