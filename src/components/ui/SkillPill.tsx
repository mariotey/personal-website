"use client";

import React from "react";

export interface Skill {
  name: string;
  color: string;
}

interface SkillPillProps {
  skillJson: Skill;       // single skill object
  width?: string;         // optional fixed width
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

export default function SkillPill({ skillJson, width = "w-32", className = "" }: SkillPillProps) {
  const borderColor = darkenColor(skillJson.color, 30);

  return (
    <div
      className={`${width} rounded-md text-white text-sm font-medium shadow-sm text-center m-1 ${className}`}
      style={{
        backgroundColor: skillJson.color,
        border: `2px solid ${borderColor}`
      }}
    >
      {skillJson.name}
    </div>
  );
}
