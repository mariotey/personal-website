import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string; // allow optional className
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`p-6 rounded-xl shadow-md bg-gray-50 transition-shadow ${className}`}>
      {children}
    </div>
  );
}