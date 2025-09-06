import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import Button from "./Button";

interface CardProps {
  children: ReactNode;
  className?: string; // allow optional className
}

export default function PageCard({ children, className = "" }: CardProps) {
    const router = useRouter();

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <div className="mb-6">
                    <Button
                        onClick={() => {
                            sessionStorage.setItem("homeScroll", window.scrollY.toString());
                            router.push("/");
                        }}
                    >
                        ← Back
                    </Button>
                </div>

                <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 space-y-8 shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
}