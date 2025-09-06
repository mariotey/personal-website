import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section className={`mt-20 mb-20 max-w-7xl mx-auto text-center ${className}`}>
      <h3 className="text-2xl font-semibold mb-6 text-[#0f1f4f]">
        {title}
      </h3>
      {children}
    </section>
  );
}