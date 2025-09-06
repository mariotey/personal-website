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
      className={`mt-6 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-600 font-medium cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-100 hover:text-blue-700 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
