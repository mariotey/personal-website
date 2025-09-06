import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string; // Optional extra styles
}

export default function Button({ onClick, children, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`mt-6 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 bg-white hover:text-blue-700 font-medium cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
