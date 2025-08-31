"use client";

import { useState } from "react";
import Divider from "../ui/Divider";
import contactData from "../../data/contact.json";
import { ClipboardIcon } from "@heroicons/react/24/solid";

export default function Contact() {
    const [toastMessage, setToastMessage] = useState("");

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setToastMessage(`Copied to clipboard!`);
        setTimeout(() => setToastMessage(""), 2000); // hide toast after 2s
    };

    return (
        <>
            <section className="mt-20 mb-20 max-w-4xl mx-auto">
            <h3
                className="text-2xl font-semibold mb-6 text-center"
                style={{ color: "#0f1f4f" }}
            >
                Contact Details
            </h3>

            <div className="space-y-6">
                {contactData.map((contactInfo) => {
                const iconSrc = contactInfo.icon || null;

                return (
                    <div
                    key={contactInfo.type}
                    className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded group"
                    onClick={() => handleCopy(contactInfo.contact, contactInfo.type)}
                    >
                    {/* Icon */}
                    {iconSrc ? (
                        <img
                        src={iconSrc}
                        alt={contactInfo.type}
                        className="w-6 h-6 object-contain"
                        />
                    ) : (
                        <div className="w-6 h-6" /> // placeholder
                    )}

                    {/* Contact text */}
                    <span>{contactInfo.contact}</span>

                    {/* Copy icon */}
                    <ClipboardIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                );
                })}
            </div>
            </section>

            <Divider />

            {/* Toast Notification */}
            {toastMessage && (
            <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded shadow-lg animate-fadeInOut">
                {toastMessage}
            </div>
            )}

            {/* Optional Tailwind animation */}
            <style jsx>{`
            .animate-fadeInOut {
                animation: fadeInOut 2s ease forwards;
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(10px); }
                10% { opacity: 1; transform: translateY(0); }
                90% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(10px); }
            }
            `}</style>
        </>
    );
}
